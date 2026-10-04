import { NextRequest, NextResponse } from "next/server";
import { getAllDrivers } from "@/lib/drivers-storage";
import { generateDriversExcelXML, generateDriversCSV } from "@/lib/drivers-export";

const VALID_TOKEN = "elmia_authenticated_session_token_2026";
const AUTH_COOKIE_NAME = "elmia_crm_session";

function isAuthorized(req: NextRequest): boolean {
  const cookieVal = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (cookieVal === VALID_TOKEN) return true;

  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.replace("Bearer ", "") === VALID_TOKEN) return true;

  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "xls"; // "xls" or "csv"
    const filterStatus = searchParams.get("status");

    let drivers = await getAllDrivers();
    if (filterStatus === "rejected") {
      drivers = drivers.filter((d) => d.status === "rejected");
    } else if (filterStatus === "active") {
      drivers = drivers.filter((d) => d.status !== "rejected");
    }

    const dateStr = new Date().toISOString().split("T")[0];

    if (format === "csv") {
      const csvData = generateDriversCSV(drivers);
      return new NextResponse(csvData, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="elmia-drivers-${dateStr}.csv"`
        }
      });
    }

    // Default to Excel XML workbook format (.xls)
    const xmlData = generateDriversExcelXML(drivers);
    return new NextResponse(xmlData, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.ms-excel; charset=utf-8",
        "Content-Disposition": `attachment; filename="elmia-drivers-${dateStr}.xls"`
      }
    });
  } catch (error) {
    console.error("[CrmDriversExport] Error generating driver export:", error);
    return NextResponse.json(
      { success: false, error: "Failed to export drivers data." },
      { status: 500 }
    );
  }
}
