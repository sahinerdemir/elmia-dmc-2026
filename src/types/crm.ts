export type LeadCategory = "proposal" | "contact";

export type LeadStatus = "unread" | "read" | "responded" | "converted" | "archived" | "trashed";

export interface ClientMessage {
  id: string;
  sentAt: string; // ISO string
  sender: string; // e.g. "ELMIA DMC <info@elmiadmc.com>"
  recipient: string; // client email
  subject: string;
  content: string;
  status: "sent" | "delivered" | "failed";
  messageId?: string;
}

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
  // Outbound client communications
  messages?: ClientMessage[];
}

export interface LeadFilterOptions {
  category?: LeadCategory | "all";
  status?: LeadStatus | "all";
  search?: string;
  sortBy?: "newest" | "oldest" | "name";
}
