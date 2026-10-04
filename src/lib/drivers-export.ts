import { DriverApplication } from "@/types/driver";

/**
 * Generates an Excel-compatible CSV string with UTF-8 BOM for perfect character rendering in Microsoft Excel.
 */
export function generateDriversCSV(drivers: DriverApplication[]): string {
  const headers = [
    "ID",
    "Application Date",
    "First Name",
    "Last Name",
    "Date of Birth",
    "Phone",
    "Email",
    "Address",
    "Professional Driving (Years)",
    "Chauffeur Driving (Years)",
    "Worked for Limo Co",
    "Previous Company",
    "License Number",
    "License State",
    "License Expiration",
    "License Front URL",
    "License Back URL",
    "Has Chauffeur Reg",
    "Chauffeur Reg Number",
    "Chauffeur Reg Expiration",
    "Chauffeur Front URL",
    "Chauffeur Back URL",
    "Availability",
    "Preferred Hours",
    "Languages",
    "Status",
    "Notes"
  ];

  const escapeCSV = (value: unknown): string => {
    if (value === null || value === undefined) return '""';
    const str = String(value).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = drivers.map((d) => {
    const formattedDate = new Date(d.createdAt).toLocaleString("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    const statusMap = {
      pending: "Pending",
      reviewed: "Reviewed",
      approved: "Approved",
      rejected: "Rejected"
    };

    const langs = Array.isArray(d.languages) ? d.languages.join(", ") : (d.languages || "");
    const avail = Array.isArray(d.availability) ? d.availability.join(", ") : (d.availability || "");

    return [
      escapeCSV(d.id),
      escapeCSV(formattedDate),
      escapeCSV(d.firstName),
      escapeCSV(d.lastName),
      escapeCSV(d.dateOfBirth || "-"),
      escapeCSV(d.phone),
      escapeCSV(d.email),
      escapeCSV(d.address || "-"),
      escapeCSV(d.professionalDrivingYears || d.drivingExperienceYears || "-"),
      escapeCSV(d.chauffeurExperienceYears || "-"),
      escapeCSV(d.workedForLimoCompany ? "Yes" : "No"),
      escapeCSV(d.previousCompanyName || "-"),
      escapeCSV(d.licenseNumber),
      escapeCSV(d.licenseState || "FL"),
      escapeCSV(d.licenseExpirationDate || "-"),
      escapeCSV(d.licenseFrontUrl),
      escapeCSV(d.licenseBackUrl),
      escapeCSV(d.hasChauffeurRegistration ? "Yes" : "No"),
      escapeCSV(d.chauffeurRegistrationNumber || "-"),
      escapeCSV(d.chauffeurRegistrationExpirationDate || "-"),
      escapeCSV(d.chauffeurRegistrationFrontUrl || "-"),
      escapeCSV(d.chauffeurRegistrationBackUrl || "-"),
      escapeCSV(avail || "-"),
      escapeCSV(d.preferredHours || "-"),
      escapeCSV(langs),
      escapeCSV(statusMap[d.status] || d.status),
      escapeCSV(d.notes || "")
    ].join(";");
  });

  // UTF-8 BOM (\uFEFF) ensures Excel reads international and Turkish characters without encoding errors
  return "\uFEFF" + [headers.join(";"), ...rows].join("\r\n");
}

/**
 * Generates a styled XML Spreadsheet (.xls) file format that Microsoft Excel opens as a native workbook.
 */
export function generateDriversExcelXML(drivers: DriverApplication[]): string {
  const sanitize = (val: unknown) => {
    if (val === null || val === undefined) return "";
    return String(val)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  };

  const statusMap = {
    pending: "Pending",
    reviewed: "Reviewed",
    approved: "Approved",
    rejected: "Rejected"
  };

  const rowsXml = drivers
    .map((d) => {
      const formattedDate = new Date(d.createdAt).toLocaleString("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });

      const langs = Array.isArray(d.languages) ? d.languages.join(", ") : (d.languages || "");
      const avail = Array.isArray(d.availability) ? d.availability.join(", ") : (d.availability || "");

      return `
      <Row>
        <Cell><Data ss:Type="String">${sanitize(d.id)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(formattedDate)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.firstName)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.lastName)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.dateOfBirth || "-")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.phone)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.email)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.address || "-")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.professionalDrivingYears || d.drivingExperienceYears || "-")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.chauffeurExperienceYears || "-")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.workedForLimoCompany ? "Yes" : "No")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.previousCompanyName || "-")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.licenseNumber)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.licenseState || "FL")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.licenseExpirationDate || "-")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.licenseFrontUrl)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.licenseBackUrl)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.hasChauffeurRegistration ? "Yes" : "No")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.chauffeurRegistrationNumber || "-")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.chauffeurRegistrationExpirationDate || "-")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.chauffeurRegistrationFrontUrl || "-")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.chauffeurRegistrationBackUrl || "-")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(avail || "-")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.preferredHours || "-")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(langs)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(statusMap[d.status] || d.status)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.notes || "")}</Data></Cell>
      </Row>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:html="http://www.w3.org/TR/REC-html40">
  <Styles>
    <Style ss:ID="Header">
      <Font ss:Bold="1" ss:Color="#FFFFFF" ss:Size="11" ss:FontName="Segoe UI"/>
      <Interior ss:Color="#1a3822" ss:Pattern="Solid"/>
      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#000000"/>
      </Borders>
    </Style>
  </Styles>
  <Worksheet ss:Name="Driver Applications">
    <Table>
      <Column ss:Width="100"/>
      <Column ss:Width="130"/>
      <Column ss:Width="110"/>
      <Column ss:Width="110"/>
      <Column ss:Width="100"/>
      <Column ss:Width="120"/>
      <Column ss:Width="170"/>
      <Column ss:Width="180"/>
      <Column ss:Width="100"/>
      <Column ss:Width="100"/>
      <Column ss:Width="90"/>
      <Column ss:Width="140"/>
      <Column ss:Width="130"/>
      <Column ss:Width="80"/>
      <Column ss:Width="100"/>
      <Column ss:Width="200"/>
      <Column ss:Width="200"/>
      <Column ss:Width="90"/>
      <Column ss:Width="130"/>
      <Column ss:Width="100"/>
      <Column ss:Width="200"/>
      <Column ss:Width="200"/>
      <Column ss:Width="130"/>
      <Column ss:Width="100"/>
      <Column ss:Width="120"/>
      <Column ss:Width="100"/>
      <Column ss:Width="200"/>
      <Row ss:StyleID="Header">
        <Cell><Data ss:Type="String">ID</Data></Cell>
        <Cell><Data ss:Type="String">Application Date</Data></Cell>
        <Cell><Data ss:Type="String">First Name</Data></Cell>
        <Cell><Data ss:Type="String">Last Name</Data></Cell>
        <Cell><Data ss:Type="String">Date of Birth</Data></Cell>
        <Cell><Data ss:Type="String">Phone</Data></Cell>
        <Cell><Data ss:Type="String">Email</Data></Cell>
        <Cell><Data ss:Type="String">Address</Data></Cell>
        <Cell><Data ss:Type="String">Professional Exp (Yrs)</Data></Cell>
        <Cell><Data ss:Type="String">Chauffeur Exp (Yrs)</Data></Cell>
        <Cell><Data ss:Type="String">Limo Co Exp</Data></Cell>
        <Cell><Data ss:Type="String">Previous Employer</Data></Cell>
        <Cell><Data ss:Type="String">License Number</Data></Cell>
        <Cell><Data ss:Type="String">State</Data></Cell>
        <Cell><Data ss:Type="String">License Expiry</Data></Cell>
        <Cell><Data ss:Type="String">License Front URL</Data></Cell>
        <Cell><Data ss:Type="String">License Back URL</Data></Cell>
        <Cell><Data ss:Type="String">Chauffeur Reg</Data></Cell>
        <Cell><Data ss:Type="String">Chauffeur Reg No</Data></Cell>
        <Cell><Data ss:Type="String">Chauffeur Expiry</Data></Cell>
        <Cell><Data ss:Type="String">Chauffeur Front URL</Data></Cell>
        <Cell><Data ss:Type="String">Chauffeur Back URL</Data></Cell>
        <Cell><Data ss:Type="String">Availability</Data></Cell>
        <Cell><Data ss:Type="String">Preferred Hours</Data></Cell>
        <Cell><Data ss:Type="String">Languages</Data></Cell>
        <Cell><Data ss:Type="String">Status</Data></Cell>
        <Cell><Data ss:Type="String">Notes</Data></Cell>
      </Row>
      ${rowsXml}
    </Table>
  </Worksheet>
</Workbook>`;
}
