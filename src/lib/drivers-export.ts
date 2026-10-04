import { DriverApplication } from "@/types/driver";

/**
 * Generates an Excel-compatible CSV string with UTF-8 BOM for perfect character rendering in Microsoft Excel.
 */
export function generateDriversCSV(drivers: DriverApplication[]): string {
  const headers = [
    "ID",
    "Başvuru Tarihi",
    "Adı",
    "Soyadı",
    "Telefon",
    "E-posta",
    "Nereli Olduğu",
    "ABD'de Yaşama Süresi (Yıl)",
    "Şoförlük Deneyimi (Yıl)",
    "Ehliyet Numarası",
    "Ehliyet Eyaleti",
    "Çocuk Bilgisi",
    "SSN Bilgisi",
    "Ehliyet Ön Yüz URL",
    "Ehliyet Arka Yüz URL",
    "Durum",
    "Diller",
    "Araç Tecrübesi",
    "Operasyon Notları"
  ];

  const escapeCSV = (value: unknown): string => {
    if (value === null || value === undefined) return '""';
    const str = String(value).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = drivers.map((d) => {
    const formattedDate = new Date(d.createdAt).toLocaleString("tr-TR", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    const childrenInfo = d.hasChildren
      ? `Var (${d.childrenDetails || "Detay belirtilmedi"})`
      : "Yok";

    const ssnInfo = d.hasSSN
      ? `Var (${d.ssn || "Gizli/Mevcut"})`
      : "Yok";

    const statusMap = {
      pending: "Bekliyor (Yeni)",
      reviewed: "İncelendi",
      approved: "Onaylandı",
      rejected: "Reddedildi"
    };

    return [
      escapeCSV(d.id),
      escapeCSV(formattedDate),
      escapeCSV(d.firstName),
      escapeCSV(d.lastName),
      escapeCSV(d.phone),
      escapeCSV(d.email),
      escapeCSV(d.origin),
      escapeCSV(d.yearsInUS),
      escapeCSV(d.drivingExperienceYears),
      escapeCSV(d.licenseNumber),
      escapeCSV(d.licenseState || "FL"),
      escapeCSV(childrenInfo),
      escapeCSV(ssnInfo),
      escapeCSV(d.licenseFrontUrl),
      escapeCSV(d.licenseBackUrl),
      escapeCSV(statusMap[d.status] || d.status),
      escapeCSV(d.languages || ""),
      escapeCSV(d.vehicleExperience || ""),
      escapeCSV(d.notes || "")
    ].join(";"); // Semicolon delimiter works best for Excel in Europe / TR / international
  });

  // UTF-8 BOM (\uFEFF) ensures Excel reads Turkish and special characters without encoding errors
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
    pending: "Bekliyor (Yeni)",
    reviewed: "İncelendi",
    approved: "Onaylandı",
    rejected: "Reddedildi"
  };

  const rowsXml = drivers
    .map((d) => {
      const formattedDate = new Date(d.createdAt).toLocaleString("tr-TR", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });

      const childrenInfo = d.hasChildren
        ? `Var (${d.childrenDetails || "Belirtildi"})`
        : "Yok";

      const ssnInfo = d.hasSSN ? `Var (${d.ssn || "Mevcut"})` : "Yok";

      return `
      <Row>
        <Cell><Data ss:Type="String">${sanitize(d.id)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(formattedDate)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.firstName)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.lastName)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.phone)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.email)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.origin)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.yearsInUS)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.drivingExperienceYears)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.licenseNumber)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.licenseState || "FL")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(childrenInfo)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(ssnInfo)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.licenseFrontUrl)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.licenseBackUrl)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(statusMap[d.status] || d.status)}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.languages || "")}</Data></Cell>
        <Cell><Data ss:Type="String">${sanitize(d.vehicleExperience || "")}</Data></Cell>
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
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Borders/>
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#000000"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="HeaderStyle">
   <Font ss:FontName="Calibri" ss:Size="11" ss:Color="#FFFFFF" ss:Bold="1"/>
   <Interior ss:Color="#285735" ss:Pattern="Solid"/>
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="ELMIA Drivers">
  <Table>
   <Column ss:Width="90"/>
   <Column ss:Width="120"/>
   <Column ss:Width="90"/>
   <Column ss:Width="90"/>
   <Column ss:Width="110"/>
   <Column ss:Width="150"/>
   <Column ss:Width="110"/>
   <Column ss:Width="80"/>
   <Column ss:Width="80"/>
   <Column ss:Width="120"/>
   <Column ss:Width="70"/>
   <Column ss:Width="110"/>
   <Column ss:Width="100"/>
   <Column ss:Width="200"/>
   <Column ss:Width="200"/>
   <Column ss:Width="90"/>
   <Column ss:Width="100"/>
   <Column ss:Width="120"/>
   <Column ss:Width="180"/>
   <Row ss:StyleID="HeaderStyle">
    <Cell><Data ss:Type="String">ID</Data></Cell>
    <Cell><Data ss:Type="String">Başvuru Tarihi</Data></Cell>
    <Cell><Data ss:Type="String">Adı</Data></Cell>
    <Cell><Data ss:Type="String">Soyadı</Data></Cell>
    <Cell><Data ss:Type="String">Telefon</Data></Cell>
    <Cell><Data ss:Type="String">E-posta</Data></Cell>
    <Cell><Data ss:Type="String">Nereli Olduğu</Data></Cell>
    <Cell><Data ss:Type="String">ABD Yılı</Data></Cell>
    <Cell><Data ss:Type="String">Şoförlük Yılı</Data></Cell>
    <Cell><Data ss:Type="String">Ehliyet No</Data></Cell>
    <Cell><Data ss:Type="String">Eyalet</Data></Cell>
    <Cell><Data ss:Type="String">Çocuk Bilgisi</Data></Cell>
    <Cell><Data ss:Type="String">SSN Bilgisi</Data></Cell>
    <Cell><Data ss:Type="String">Ehliyet Ön Yüz URL</Data></Cell>
    <Cell><Data ss:Type="String">Ehliyet Arka Yüz URL</Data></Cell>
    <Cell><Data ss:Type="String">Durum</Data></Cell>
    <Cell><Data ss:Type="String">Diller</Data></Cell>
    <Cell><Data ss:Type="String">Araç Tecrübesi</Data></Cell>
    <Cell><Data ss:Type="String">Operasyon Notları</Data></Cell>
   </Row>
   ${rowsXml}
  </Table>
 </Worksheet>
</Workbook>`;
}
