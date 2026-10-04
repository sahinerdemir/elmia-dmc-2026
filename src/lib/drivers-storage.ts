import { DriverApplication, DriverStatus } from "@/types/driver";
import { supabase, isSupabaseConfigured } from "./supabase";

declare global {
  // eslint-disable-next-line no-var
  var __ELMIA_DRIVERS_STORE: DriverApplication[] | undefined;
}

const STORAGE_BUCKET = "driver-documents";
const STORAGE_FILE_PATH = "data/drivers.json";

// No hardcoded mock/demo data — applications will only come from real driver submissions
const INITIAL_DEMO_DRIVERS: DriverApplication[] = [];

function getStore(): DriverApplication[] {
  if (!global.__ELMIA_DRIVERS_STORE) {
    global.__ELMIA_DRIVERS_STORE = [];
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

      if (!error && Array.isArray(data)) {
        const drivers = data.map(mapRowToDriver);
        global.__ELMIA_DRIVERS_STORE = drivers;
        return drivers;
      }
    } catch {
      // Table may not exist yet, fallback to Storage
    }

    // 2. Try JSON file in Storage bucket `driver-documents` (bypass Cloudflare/CDN cache)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        const fileUrl = `${supabaseUrl}/storage/v1/object/authenticated/${STORAGE_BUCKET}/${STORAGE_FILE_PATH}?t=${Date.now()}`;
        const res = await fetch(fileUrl, {
          headers: {
            Authorization: `Bearer ${supabaseKey}`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache"
          },
          cache: "no-store"
        });

        if (res.ok) {
          const parsed = await res.json();
          if (Array.isArray(parsed)) {
            global.__ELMIA_DRIVERS_STORE = parsed;
            return parsed;
          }
        }
      }

      // Secondary fallback to standard SDK download
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .download(STORAGE_FILE_PATH);

      if (!error && data) {
        const text = await data.text();
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
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
          upsert: true,
          cacheControl: "0" // Prevent CDN/Cloudflare from caching this file
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
  origin?: string;
  address?: string;
  date_of_birth?: string;
  years_in_us?: string | number;
  driving_experience_years?: string | number;
  professional_driving_years?: string | number;
  chauffeur_experience_years?: string | number;
  worked_for_limo_company?: boolean;
  previous_company_name?: string;
  license_number: string;
  license_state?: string;
  license_expiration_date?: string;
  has_children?: boolean;
  children_details?: string;
  has_ssn?: boolean;
  ssn?: string;
  license_front_url: string;
  license_back_url: string;
  has_chauffeur_registration?: boolean;
  chauffeur_registration_number?: string;
  chauffeur_registration_expiration_date?: string;
  chauffeur_registration_front_url?: string;
  chauffeur_registration_back_url?: string;
  availability?: string[];
  preferred_hours?: string;
  status?: DriverStatus;
  notes?: string;
  languages?: string;
  vehicle_experience?: string;
  is_archived?: boolean;
}

function mapRowToDriver(row: SupabaseDriverRow): DriverApplication {
  return {
    id: row.id,
    createdAt: row.created_at,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    email: row.email,
    dateOfBirth: row.date_of_birth,
    address: row.address,
    origin: row.origin,
    yearsInUS: row.years_in_us,
    drivingExperienceYears: row.driving_experience_years,
    professionalDrivingYears: row.professional_driving_years || row.driving_experience_years,
    chauffeurExperienceYears: row.chauffeur_experience_years,
    workedForLimoCompany: row.worked_for_limo_company,
    previousCompanyName: row.previous_company_name,
    licenseNumber: row.license_number,
    licenseState: row.license_state || "FL",
    licenseExpirationDate: row.license_expiration_date,
    hasChildren: Boolean(row.has_children),
    childrenDetails: row.children_details || undefined,
    hasSSN: Boolean(row.has_ssn),
    ssn: row.ssn || undefined,
    licenseFrontUrl: row.license_front_url,
    licenseBackUrl: row.license_back_url,
    hasChauffeurRegistration: Boolean(row.has_chauffeur_registration),
    chauffeurRegistrationNumber: row.chauffeur_registration_number,
    chauffeurRegistrationExpirationDate: row.chauffeur_registration_expiration_date,
    chauffeurRegistrationFrontUrl: row.chauffeur_registration_front_url,
    chauffeurRegistrationBackUrl: row.chauffeur_registration_back_url,
    availability: row.availability,
    preferredHours: row.preferred_hours,
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

  // Try insert into Postgres table `drivers` if table exists
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("drivers").insert({
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
