interface RateLimitEntry {
  count: number;
  firstRequestTime: number;
}

const ipRequestMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 6;

// Periodic cleanup of stale IP entries
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of ipRequestMap.entries()) {
      if (now - entry.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
        ipRequestMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

export interface AntiSpamInput {
  honeypot?: string;
  loadedAt?: number;
  ip?: string;
  name?: string;
  email?: string;
  message?: string;
}

export function checkSpam(input: AntiSpamInput): { isSpam: boolean; reason?: string; isRateLimited?: boolean } {
  // 1. Honeypot check - if filled, 100% automated bot
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return { isSpam: true, reason: "Honeypot trap triggered" };
  }

  // 2. Submission speed check - humans take at least ~1.5s to read & submit a form
  if (input.loadedAt && typeof input.loadedAt === "number") {
    const elapsed = Date.now() - input.loadedAt;
    // Less than 1.5 seconds is automated script
    if (elapsed > 0 && elapsed < 1500) {
      return { isSpam: true, reason: `Submission too fast (${elapsed}ms)` };
    }
  }

  // 3. IP Rate Limiting
  const clientIp = input.ip || "unknown";
  if (clientIp !== "unknown" && clientIp !== "127.0.0.1" && clientIp !== "::1") {
    const now = Date.now();
    const entry = ipRequestMap.get(clientIp);

    if (!entry) {
      ipRequestMap.set(clientIp, { count: 1, firstRequestTime: now });
    } else {
      if (now - entry.firstRequestTime < RATE_LIMIT_WINDOW_MS) {
        entry.count += 1;
        if (entry.count > MAX_REQUESTS_PER_WINDOW) {
          return { isSpam: true, isRateLimited: true, reason: "Rate limit exceeded" };
        }
      } else {
        // Reset window
        ipRequestMap.set(clientIp, { count: 1, firstRequestTime: now });
      }
    }
  }

  // 4. Content heuristics
  const fullText = `${input.name || ""} ${input.message || ""}`.toLowerCase();
  
  // Count URL occurrences
  const urlMatches = fullText.match(/https?:\/\//g) || [];
  if (urlMatches.length >= 3) {
    return { isSpam: true, reason: "Excessive URLs detected" };
  }

  // Common high-frequency spam triggers
  const spamKeywords = [
    "viagra",
    "cialis",
    "casino online",
    "crypto giveaway",
    "telegram @",
    "whatsapp +",
    "seo ranking guarantee",
    "backlink package"
  ];

  for (const keyword of spamKeywords) {
    if (fullText.includes(keyword)) {
      return { isSpam: true, reason: `Spam keyword match: ${keyword}` };
    }
  }

  return { isSpam: false };
}
