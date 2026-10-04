import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const STORAGE_BUCKET = "driver-documents";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const side = (formData.get("side") as string) || "front"; // "front" or "back"

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file was uploaded." },
        { status: 400 }
      );
    }

    // Validate size (max 12MB)
    const MAX_SIZE = 12 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File exceeds 12MB limit." },
        { status: 400 }
      );
    }

    const originalName = file.name || "document.jpg";
    const ext = originalName.split(".").pop()?.toLowerCase() || "jpg";
    const mimeType = file.type || "image/jpeg";

    const ALLOWED_EXTS = ["jpg", "jpeg", "png", "pdf"];
    const ALLOWED_MIMES = ["image/jpeg", "image/png", "application/pdf"];

    if (!ALLOWED_EXTS.includes(ext) && !ALLOWED_MIMES.includes(mimeType)) {
      return NextResponse.json(
        { success: false, error: "Only JPG, PNG, and PDF files are accepted." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 7);
    const fileName = `licenses/${timestamp}-${side}-${random}.${ext}`;

    // 1. Try Supabase Storage Bucket
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error: uploadErr } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(fileName, buffer, {
            contentType: mimeType,
            upsert: true
          });

        if (!uploadErr) {
          const { data: publicData } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(fileName);

          if (publicData?.publicUrl) {
            return NextResponse.json({
              success: true,
              url: publicData.publicUrl,
              fileName
            });
          }
        } else {
          console.warn("[DriverUpload] Supabase upload failed, falling back to data URL:", uploadErr);
        }
      } catch (storageErr) {
        console.warn("[DriverUpload] Storage exception, falling back to data URL:", storageErr);
      }
    }

    // 2. Data URL fallback (guarantees zero failure if cloud storage is temporarily unreachable)
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      fileName
    });
  } catch (error) {
    console.error("[DriverUpload] Error processing file upload:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process document upload." },
      { status: 500 }
    );
  }
}
