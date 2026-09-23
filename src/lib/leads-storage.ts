import { Lead, LeadStatus } from "@/types/crm";
import { supabase, isSupabaseConfigured } from "./supabase";

// Global singleton cache in memory across module reloads in Node/Next.js
declare global {
  // eslint-disable-next-line no-var
  var __ELMIA_LEADS_STORE: Lead[] | undefined;
}

const INITIAL_DEMO_LEADS: Lead[] = [
  {
    id: "lead-2026-001",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    category: "proposal",
    status: "unread",
    name: "Alexander von Berg",
    company: "Apex Global Holdings (Zurich / New York)",
    email: "a.vonberg@apexholding.ch",
    phone: "+1 (212) 555-0194",
    service: "Executive Chauffeur Transportation",
    groupSize: "4-8 C-Suite",
    dates: "Nov 12 - Nov 18, 2026",
    message: "Need 4 Cadillac Escalade ESVs and 2 Mercedes S-Class for private aviation arrival at OPF Signature Flight Support with dedicated tarmac staging for Art Basel executive summit.",
    priority: "vip",
    internalNotes: "High-priority inquiry from private Swiss family office. Assigned to Opa-locka dispatcher."
  },
  {
    id: "lead-2026-002",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    category: "proposal",
    status: "read",
    name: "Elena Rostova",
    company: "Monaco Grand Hospitality",
    email: "e.rostova@monacoevents.mc",
    phone: "+377 98 06 20 00",
    service: "Corporate Group Travel",
    groupSize: "40-60 Guests",
    dates: "Dec 02 - Dec 06, 2026",
    message: "Seeking turnkey ground transport, luxury coach transit from Miami International Airport (MIA) to South Beach luxury hotel room block, and VIP dining buyout reservations for 50 attendees.",
    priority: "high",
    internalNotes: "Reviewed RFP. Sent initial brochure and waiting for finalized flight manifest."
  },
  {
    id: "lead-2026-003",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), // 22 hours ago
    category: "proposal",
    status: "responded",
    name: "Marcus Vance",
    company: "Vance Media & Entertainment",
    email: "m.vance@vancemedia.com",
    phone: "+1 (310) 890-4421",
    service: "VIP Lifestyle & Bespoke Hospitality Programs",
    groupSize: "12 VIPs",
    dates: "Jan 15 - Jan 20, 2027",
    message: "Private 130ft superyacht day charter in Biscayne Bay with private chef, plus VIP nightclub table staging in Miami Beach.",
    priority: "vip",
    internalNotes: "Proposal #ELM-902 transmitted via email. Client requested addition of security detail."
  },
  {
    id: "lead-2026-004",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    category: "contact",
    status: "converted",
    name: "David Sterling",
    company: "Sterling Aviation Partners",
    email: "d.sterling@sterlingair.com",
    phone: "+1 (786) 430-8812",
    topic: "Partnership Inquiry",
    message: "We operate a fleet of Challenger 650 jets at Sheltair FBO Miami and would like to partner with ELMIA as our preferred luxury chauffeur and tarmac transit provider for our incoming charter passengers.",
    priority: "vip",
    internalNotes: "Agreement signed! Added to strategic partner network. Commencing service on upcoming charter arrivals."
  },
  {
    id: "lead-2026-005",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    category: "contact",
    status: "responded",
    name: "Sarah Jenkins",
    company: "Global Medical Congress",
    email: "s.jenkins@gmc-summits.org",
    phone: "+1 (312) 670-3300",
    topic: "Trade Show & Expo Logistics",
    message: "Looking for logistics planning for the 2026 Annual Medical Conference in Miami Beach Convention Center. Need dispatch coordination and shuttle loops between convention center and 5 partner hotels.",
    priority: "normal",
    internalNotes: "Sent preliminary capacity matrix and shuttle frequency proposal. Follow-up meeting scheduled."
  }
];

export function getStore(): Lead[] {
  if (!global.__ELMIA_LEADS_STORE) {
    global.__ELMIA_LEADS_STORE = [...INITIAL_DEMO_LEADS];
  }
  return global.__ELMIA_LEADS_STORE;
}

// Helper to convert Supabase Postgres row to Lead model
interface SupabaseLeadRow {
  id: string;
  created_at: string;
  category: "proposal" | "contact";
  status: LeadStatus;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  group_size?: string | null;
  dates?: string | null;
  topic?: string | null;
  message?: string | null;
  internal_notes?: string | null;
  priority?: "normal" | "high" | "vip" | null;
}

function mapRowToLead(row: SupabaseLeadRow): Lead {
  const isTrashed =
    row.status === "archived" ||
    row.status === "trashed" ||
    Boolean(row.internal_notes && row.internal_notes.includes("[TRASHED]")) ||
    (row as unknown as { is_trashed?: boolean }).is_trashed === true;

  let previousStatus: LeadStatus = "unread";
  if (row.internal_notes) {
    const match = row.internal_notes.match(/\[TRASHED:prev=([a-z]+)\]/);
    if (match && match[1]) {
      previousStatus = match[1] as LeadStatus;
    }
  }

  return {
    id: row.id,
    createdAt: row.created_at,
    category: row.category,
    status: row.status,
    name: row.name,
    email: row.email,
    phone: row.phone || "",
    company: row.company || undefined,
    service: row.service || undefined,
    groupSize: row.group_size || undefined,
    dates: row.dates || undefined,
    topic: row.topic || undefined,
    message: row.message || undefined,
    internalNotes: row.internal_notes || undefined,
    priority: row.priority || "normal",
    isTrashed,
    previousStatus
  };
}

export async function getAllLeads(): Promise<Lead[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase getAllLeads error:", error);
      } else if (data) {
        return (data as SupabaseLeadRow[]).map(mapRowToLead);
      }
    } catch (err) {
      console.error("Supabase connection error in getAllLeads:", err);
    }
  }

  // Fallback to in-memory store
  const store = getStore();
  return [...store].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addLead(
  leadData: Omit<Lead, "id" | "createdAt" | "status">
): Promise<Lead> {
  const newId = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();
  const priority = leadData.priority || "normal";

  if (isSupabaseConfigured() && supabase) {
    try {
      const dbRow = {
        id: newId,
        created_at: now,
        category: leadData.category,
        status: "unread",
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone || "",
        company: leadData.company || null,
        service: leadData.service || null,
        group_size: leadData.groupSize || null,
        dates: leadData.dates || null,
        topic: leadData.topic || null,
        message: leadData.message || null,
        internal_notes: leadData.internalNotes || null,
        priority
      };

      const { data, error } = await supabase
        .from("leads")
        .insert([dbRow])
        .select()
        .single();

      if (error) {
        console.error("Supabase addLead error:", error);
      } else if (data) {
        return mapRowToLead(data as SupabaseLeadRow);
      }
    } catch (err) {
      console.error("Supabase connection error in addLead:", err);
    }
  }

  // Fallback to in-memory store
  const store = getStore();
  const newLead: Lead = {
    ...leadData,
    id: newId,
    createdAt: now,
    status: "unread",
    priority
  };

  store.unshift(newLead);
  return newLead;
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
  internalNotes?: string
): Promise<Lead | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const updateData: Record<string, unknown> = { status };
      if (internalNotes !== undefined) {
        updateData.internal_notes = internalNotes;
      }

      const { data, error } = await supabase
        .from("leads")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Supabase updateLeadStatus error:", error);
      } else if (data) {
        return mapRowToLead(data as SupabaseLeadRow);
      }
    } catch (err) {
      console.error("Supabase connection error in updateLeadStatus:", err);
    }
  }

  // Fallback to in-memory store
  const store = getStore();
  const index = store.findIndex((l) => l.id === id);
  if (index === -1) return null;

  store[index] = {
    ...store[index],
    status,
    ...(internalNotes !== undefined ? { internalNotes } : {})
  };

  return store[index];
}

export async function updateLeadNotes(
  id: string,
  internalNotes: string
): Promise<Lead | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("leads")
        .update({ internal_notes: internalNotes })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Supabase updateLeadNotes error:", error);
      } else if (data) {
        return mapRowToLead(data as SupabaseLeadRow);
      }
    } catch (err) {
      console.error("Supabase connection error in updateLeadNotes:", err);
    }
  }

  // Fallback to in-memory store
  const store = getStore();
  const index = store.findIndex((l) => l.id === id);
  if (index === -1) return null;

  store[index] = {
    ...store[index],
    internalNotes
  };

  return store[index];
}

export async function trashLead(id: string): Promise<Lead | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data: existing, error: getErr } = await supabase
        .from("leads")
        .select("*")
        .eq("id", id)
        .single();

      if (getErr) {
        console.error("Supabase trashLead find error:", getErr);
      } else if (existing) {
        const prevStatus = existing.status !== "archived" ? existing.status : "unread";
        const currentNotes = existing.internal_notes || "";
        const updatedNotes = currentNotes.includes("[TRASHED]")
          ? currentNotes
          : `${currentNotes} [TRASHED:prev=${prevStatus}]`.trim();

        const { data, error } = await supabase
          .from("leads")
          .update({
            status: "archived",
            internal_notes: updatedNotes
          })
          .eq("id", id)
          .select()
          .single();

        if (error) {
          console.error("Supabase trashLead update error:", error);
        } else if (data) {
          return mapRowToLead(data as SupabaseLeadRow);
        }
      }
    } catch (err) {
      console.error("Supabase connection error in trashLead:", err);
    }
  }

  // Fallback to in-memory store
  const store = getStore();
  const index = store.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const current = store[index];
  const previousStatus: LeadStatus =
    current.status !== "archived" && current.status !== "trashed"
      ? current.status
      : (current.previousStatus || "unread");

  store[index] = {
    ...current,
    status: "archived",
    isTrashed: true,
    previousStatus,
    trashedAt: new Date().toISOString()
  };

  return store[index];
}

export async function restoreLead(id: string): Promise<Lead | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data: existing, error: getErr } = await supabase
        .from("leads")
        .select("*")
        .eq("id", id)
        .single();

      if (getErr) {
        console.error("Supabase restoreLead find error:", getErr);
      } else if (existing) {
        let restoredStatus: LeadStatus = "unread";
        let cleanedNotes = existing.internal_notes || "";
        const match = cleanedNotes.match(/\[TRASHED:prev=([a-z]+)\]/);
        if (match && match[1]) {
          restoredStatus = match[1] as LeadStatus;
          cleanedNotes = cleanedNotes.replace(/\[TRASHED:prev=[a-z]+\]/, "").trim();
        } else {
          cleanedNotes = cleanedNotes.replace("[TRASHED]", "").trim();
        }

        const { data, error } = await supabase
          .from("leads")
          .update({
            status: restoredStatus,
            internal_notes: cleanedNotes
          })
          .eq("id", id)
          .select()
          .single();

        if (error) {
          console.error("Supabase restoreLead update error:", error);
        } else if (data) {
          return mapRowToLead(data as SupabaseLeadRow);
        }
      }
    } catch (err) {
      console.error("Supabase connection error in restoreLead:", err);
    }
  }

  // Fallback to in-memory store
  const store = getStore();
  const index = store.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const current = store[index];
  const restoredStatus: LeadStatus =
    current.previousStatus && current.previousStatus !== "archived" && current.previousStatus !== "trashed"
      ? current.previousStatus
      : "unread";

  store[index] = {
    ...current,
    status: restoredStatus,
    isTrashed: false,
    trashedAt: undefined
  };

  return store[index];
}

export async function emptyTrash(): Promise<number> {
  let count = 0;
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data: trashedList, error: listErr } = await supabase
        .from("leads")
        .select("id")
        .eq("status", "archived");

      if (listErr) {
        console.error("Supabase emptyTrash list error:", listErr);
      } else if (trashedList && trashedList.length > 0) {
        const ids = trashedList.map((r) => r.id);
        const { error: delErr } = await supabase
          .from("leads")
          .delete()
          .in("id", ids);

        if (delErr) {
          console.error("Supabase emptyTrash delete error:", delErr);
        } else {
          count = ids.length;
        }
      }
    } catch (err) {
      console.error("Supabase error in emptyTrash:", err);
    }
  }

  const store = getStore();
  const trashed = store.filter(
    (l) => l.isTrashed || l.status === "archived" || l.status === "trashed"
  );
  count = Math.max(count, trashed.length);
  global.__ELMIA_LEADS_STORE = store.filter(
    (l) => !l.isTrashed && l.status !== "archived" && l.status !== "trashed"
  );

  return count;
}

export async function deleteLeadPermanently(id: string): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Supabase deleteLeadPermanently error:", error);
      } else {
        return true;
      }
    } catch (err) {
      console.error("Supabase connection error in deleteLeadPermanently:", err);
    }
  }

  // Fallback to in-memory store
  const store = getStore();
  const index = store.findIndex((l) => l.id === id);
  if (index === -1) return false;

  store.splice(index, 1);
  return true;
}

// Keep deleteLead pointing to deleteLeadPermanently for backward compatibility
export const deleteLead = deleteLeadPermanently;


