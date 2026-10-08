const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const CREDENTIALS_PATH = path.join(__dirname, "..", "gsc-credentials.json");

if (!fs.existsSync(CREDENTIALS_PATH)) {
  console.error("❌ gsc-credentials.json dosyası bulunamadı.");
  process.exit(1);
}

const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: creds.client_email,
    scope: "https://www.googleapis.com/auth/webmasters https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };

  const b64 = (s) => Buffer.from(s).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const input = `${b64(JSON.stringify(header))}.${b64(JSON.stringify(payload))}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(input);
  const sig = signer.sign(creds.private_key, "base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const jwt = `${input}.${sig}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Token hatası: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function listSites(token) {
  const res = await fetch("https://www.googleapis.com/webmasters/v3/sites", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

async function inspectUrl(token, siteUrl, inspectionUrl) {
  const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      siteUrl,
      inspectionUrl
    })
  });
  return await res.json();
}

async function getSearchAnalytics(token, siteUrl, startDate, endDate, dimensions = ["query", "page"]) {
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions,
      rowLimit: 25
    })
  });
  return await res.json();
}

async function getSitemaps(token, siteUrl) {
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

async function submitSitemap(token, siteUrl, feedpath) {
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(feedpath)}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` }
  });
  return { status: res.status, ok: res.ok };
}

module.exports = {
  getAccessToken,
  listSites,
  inspectUrl,
  getSearchAnalytics,
  getSitemaps,
  submitSitemap
};

if (require.main === module) {
  (async () => {
    try {
      console.log("🔑 Yetkilendirme yapılıyor...");
      const token = await getAccessToken();
      console.log("✅ Token başarıyla alındı.");

      console.log("\n🌐 Kayıtlı Mülkler sorgulanıyor...");
      const sites = await listSites(token);
      console.log(JSON.stringify(sites, null, 2));
    } catch (err) {
      console.error("❌ Hata:", err.message);
    }
  })();
}
