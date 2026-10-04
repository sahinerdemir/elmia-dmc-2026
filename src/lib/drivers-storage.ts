import { DriverApplication, DriverStatus } from "@/types/driver";
import { supabase, isSupabaseConfigured } from "./supabase";

declare global {
  // eslint-disable-next-line no-var
  var __ELMIA_DRIVERS_STORE: DriverApplication[] | undefined;
}

const STORAGE_BUCKET = "driver-documents";
const STORAGE_FILE_PATH = "data/drivers.json";

const INITIAL_DEMO_DRIVERS: DriverApplication[] = [
  {
    id: "drv-2026-001",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    firstName: "Murat",
    lastName: "Yılmaz",
    phone: "+1 (786) 450-8912",
    email: "murat.yilmaz.miami@gmail.com",
    origin: "Türkiye / İstanbul",
    yearsInUS: "6",
    drivingExperienceYears: "10",
    licenseNumber: "Y450-891-23-456-0",
    licenseState: "FL",
    hasChildren: true,
    childrenDetails: "2 çocuk (7 ve 11 yaşlarında)",
    hasSSN: true,
    ssn: "***-**-4912",
    licenseFrontUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    licenseBackUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    status: "pending",
    notes: "Cadillac Escalade ESV ve Mercedes S-Class tecrübesi var. FBO / Tarmac ramp kurallarına hakim.",
    languages: "Türkçe, İngilizce",
    vehicleExperience: "Escalade ESV, Suburban, S-Class, Sprinter"
  },
  {
    id: "drv-2026-002",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // 1 day ago
    firstName: "Carlos",
    lastName: "Mendoza",
    phone: "+1 (305) 555-7821",
    email: "carlos.mendoza.vip@yahoo.com",
    origin: "Colombia / Medellín",
    yearsInUS: "12",
    drivingExperienceYears: "15",
    licenseNumber: "M532-110-82-310-0",
    licenseState: "FL",
    hasChildren: true,
    childrenDetails: "1 çocuk (14 yaşında)",
    hasSSN: true,
    ssn: "***-**-8810",
    licenseFrontUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    licenseBackUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    status: "approved",
    notes: "Bilingüe (English/Spanish). Excellent private client references from Miami Beach Concierge desk.",
    languages: "English, Spanish",
    vehicleExperience: "Lincoln Navigator, Mercedes Maybach, Luxury Sprinter"
  },
  {
    id: "drv-2026-003",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    firstName: "Emre",
    lastName: "Demir",
    phone: "+1 (954) 890-3341",
    email: "emre.demir.chauffeur@outlook.com",
    origin: "Türkiye / Ankara",
    yearsInUS: "4",
    drivingExperienceYears: "7",
    licenseNumber: "D340-992-14-880-0",
    licenseState: "FL",
    hasChildren: false,
    childrenDetails: "Yok",
    hasSSN: true,
    ssn: "***-**-2204",
    licenseFrontUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    licenseBackUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    status: "reviewed",
    notes: "Art Basel ve F1 Miami haftasında aktif çalışabilir. Temiz sicil kaydı teyit edildi.",
    languages: "Türkçe, İngilizce",
    vehicleExperience: "Escalade, Suburban"
  }
];

function getStore(): DriverApplication[] {
  if (!global.__ELMIA_DRIVERS_STORE) {
    global.__ELMIA_DRIVERS_STORE = [...INITIAL_DEMO_DRIVERS];
  }
  return global.__ELMIA_DRIVERS_STORE;
}

/**
 * Loads drivers from Supabase table or Storage fallback
 */
async function loadFromRemote(): Promise<DriverApplication[]> {
  if (isSupabaseConfigured() && supabase) {
    // 1. Try relational table `drivers`
    try {
      const { data, error } = await supabase
        .from("drivers")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map(mapRowToDriver);
      }
    } catch {
      // Table may not exist yet, fallback to Storage
    }

    // 2. Try JSON file in Storage bucket `driver-documents`
    try {
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .download(STORAGE_FILE_PATH);

      if (!error && data) {
        const text = await data.text();
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          global.__ELMIA_DRIVERS_STORE = parsed;
          return parsed;
        }
      }
    } catch (storageErr) {
      console.warn("[DriversStorage] Could not read from storage bucket:", storageErr);
    }
  }

  return getStore();
}

/**
 * Persists drivers to Supabase Storage (and relational table if present)
 */
async function persistDrivers(drivers: DriverApplication[]): Promise<void> {
  global.__ELMIA_DRIVERS_STORE = drivers;

  if (isSupabaseConfigured() && supabase) {
    try {
      const jsonContent = JSON.stringify(drivers, null, 2);
      await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(STORAGE_FILE_PATH, jsonContent, {
          contentType: "application/json",
          upsert: true
        });
    } catch (err) {
      console.error("[DriversStorage] Error persisting to storage bucket:", err);
    }
  }
}

interface SupabaseDriverRow {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  origin: string;
  years_in_us: string;
  driving_experience_years: string;
  license_number: string;
  license_state?: string | null;
  has_children?: boolean | null;
  children_details?: string | null;
  has_ssn?: boolean | null;
  ssn?: string | null;
  license_front_url: string;
  license_back_url: string;
  status: DriverStatus;
  notes?: string | null;
  languages?: string | null;
  vehicle_experience?: string | null;
  is_archived?: boolean | null;
}

function mapRowToDriver(row: SupabaseDriverRow): DriverApplication {
  return {
    id: row.id,
    createdAt: row.created_at,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    email: row.email,
    origin: row.origin,
    yearsInUS: row.years_in_us,
    drivingExperienceYears: row.driving_experience_years,
    licenseNumber: row.license_number,
    licenseState: row.license_state || "FL",
    hasChildren: Boolean(row.has_children),
    childrenDetails: row.children_details || undefined,
    hasSSN: Boolean(row.has_ssn),
    ssn: row.ssn || undefined,
    licenseFrontUrl: row.license_front_url,
    licenseBackUrl: row.license_back_url,
    status: row.status || "pending",
    notes: row.notes || undefined,
    languages: row.languages || undefined,
    vehicleExperience: row.vehicle_experience || undefined,
    isArchived: Boolean(row.is_archived)
  };
}

export async function getAllDrivers(): Promise<DriverApplication[]> {
  return await loadFromRemote();
}

export async function getDriverById(id: string): Promise<DriverApplication | null> {
  const drivers = await getAllDrivers();
  return drivers.find((d) => d.id === id) || null;
}

export async function addDriverApplication(
  data: Omit<DriverApplication, "id" | "createdAt" | "status">
): Promise<DriverApplication> {
  const newDriver: DriverApplication = {
    id: `drv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: "pending",
    ...data
  };

  // Try insert into Postgres table `drivers`
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from("drivers").insert({
        id: newDriver.id,
        created_at: newDriver.createdAt,
        first_name: newDriver.firstName,
        last_name: newDriver.lastName,
        phone: newDriver.phone,
        email: newDriver.email,
        origin: newDriver.origin || "N/A",
        years_in_us: String(newDriver.yearsInUS || ""),
        driving_experience_years: String(newDriver.professionalDrivingYears || newDriver.drivingExperienceYears || ""),
        license_number: newDriver.licenseNumber,
        license_state: newDriver.licenseState || "FL",
        has_children: Boolean(newDriver.hasChildren),
        children_details: newDriver.childrenDetails || null,
        has_ssn: Boolean(newDriver.hasSSN),
        ssn: newDriver.ssn || null,
        license_front_url: newDriver.licenseFrontUrl,
        license_back_url: newDriver.licenseBackUrl,
        status: "pending",
        notes: newDriver.notes || null,
        languages: Array.isArray(newDriver.languages) ? newDriver.languages.join(", ") : (newDriver.languages || null),
        vehicle_experience: newDriver.vehicleExperience || null,
        is_archived: false
      });

      if (!error) {
        console.log(`[DriversStorage] Saved driver ${newDriver.id} to Supabase table`);
      }
    } catch {
      // Table may not exist yet, Storage fallback will handle it
    }
  }

  // Also persist to Supabase Storage array
  const current = await getAllDrivers();
  const updated = [newDriver, ...current.filter((d) => d.id !== newDriver.id)];
  await persistDrivers(updated);

  return newDriver;
}

export async function updateDriverStatus(
  id: string,
  status: DriverStatus
): Promise<DriverApplication | null> {
  const current = await getAllDrivers();
  const index = current.findIndex((d) => d.id === id);
  if (index === -1) return null;

  current[index].status = status;

  // Try update Postgres table
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase
        .from("drivers")
        .update({ status })
        .eq("id", id);
    } catch {
      // Ignore if table not present
    }
  }

  await persistDrivers(current);
  return current[index];
}

export async function updateDriverNotes(
  id: string,
  notes: string
): Promise<DriverApplication | null> {
  const current = await getAllDrivers();
  const index = current.findIndex((d) => d.id === id);
  if (index === -1) return null;

  current[index].notes = notes;

  // Try update Postgres table
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase
        .from("drivers")
        .update({ notes })
        .eq("id", id);
    } catch {
      // Ignore if table not present
    }
  }

  await persistDrivers(current);
  return current[index];
}

export async function deleteDriverApplication(id: string): Promise<boolean> {
  const current = await getAllDrivers();
  const index = current.findIndex((d) => d.id === id);
  if (index === -1) return false;

  const updated = current.filter((d) => d.id !== id);

  // Try delete from Postgres table
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("drivers").delete().eq("id", id);
    } catch {
      // Ignore if table not present
    }
  }

  await persistDrivers(updated);
  return true;
}
