import { NextRequest, NextResponse } from "next/server";
import { getAllDrivers, deleteDriverApplication } from "@/lib/drivers-storage";

const VALID_TOKEN = "elmia_authenticated_session_token_2026";
const AUTH_COOKIE_NAME = "elmia_crm_session";

function isAuthorized(req: NextRequest): boolean {
  const cookieVal = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (cookieVal === VALID_TOKEN) return true;

  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.replace("Bearer ", "") === VALID_TOKEN) return true;

  return false;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  try {
    const drivers = await getAllDrivers();
    return NextResponse.json(
      {
        success: true,
        drivers,
        count: drivers.length
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        }
      }
    );
  } catch (error) {
    console.error("[CrmDriversApi] Error fetching drivers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch drivers." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Driver ID is required." },
      { status: 400 }
    );
  }

  const success = await deleteDriverApplication(id);
  if (!success) {
    return NextResponse.json(
      { success: false, error: "Driver not found or deletion failed." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Driver application deleted successfully."
  });
}
