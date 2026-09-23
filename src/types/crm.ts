export type LeadCategory = "proposal" | "contact";

export type LeadStatus = "unread" | "read" | "responded" | "converted" | "archived" | "trashed";

export interface Lead {
  id: string;
  createdAt: string; // ISO string
  category: LeadCategory;
  status: LeadStatus;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  groupSize?: string;
  dates?: string;
  topic?: string;
  message?: string;
  internalNotes?: string;
  priority?: "normal" | "high" | "vip";
  // Trash / Recycle Bin soft delete
  isTrashed?: boolean;
  trashedAt?: string;
  previousStatus?: LeadStatus;
}

export interface LeadFilterOptions {
  category?: LeadCategory | "all";
  status?: LeadStatus | "all";
  search?: string;
  sortBy?: "newest" | "oldest" | "name";
}
