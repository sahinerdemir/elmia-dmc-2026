import { NextRequest, NextResponse } from "next/server";
import { getCrmPassword, setCrmPassword } from "@/lib/auth-storage";

const AUTH_COOKIE_NAME = "elmia_crm_session";
// Simple secure token based on password hash/string
const VALID_TOKEN = "elmia_authenticated_session_token_2026";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;
    const currentPassword = getCrmPassword();

    if (!password || password !== currentPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid password. Access denied." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful."
    });

    // Set secure cookie for 7 days
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: VALID_TOKEN,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/"
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Authentication failed." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Only allow if authenticated
    const sessionCookie = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (sessionCookie !== VALID_TOKEN) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;
    const actualPassword = getCrmPassword();

    if (currentPassword !== actualPassword) {
      return NextResponse.json({ success: false, error: "Current password is incorrect." }, { status: 400 });
    }

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json({ success: false, error: "New password must be at least 8 characters." }, { status: 400 });
    }

    const success = setCrmPassword(newPassword);
    if (success) {
      return NextResponse.json({ success: true, message: "Password updated successfully." });
    } else {
      return NextResponse.json({ success: false, error: "Failed to save password." }, { status: 500 });
    }

  } catch (e) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = sessionCookie === VALID_TOKEN;

  return NextResponse.json({
    authenticated: isAuthenticated
  });
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully."
  });

  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
}
