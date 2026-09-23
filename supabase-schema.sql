-- ==============================================================================
-- ELMIA DMC 2026 - Supabase Database Schema for Lead CRM
-- ==============================================================================
-- Run this SQL in your Supabase project (SQL Editor -> New Query -> Run)

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('proposal', 'contact')),
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'responded', 'converted', 'archived')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  company TEXT,
  service TEXT,
  group_size TEXT,
  dates TEXT,
  topic TEXT,
  message TEXT,
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'high', 'vip')),
  internal_notes TEXT
);

-- Index for high-speed chronological sorting in CRM
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_category ON leads (category);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow public form submission (Anon can insert new leads)
CREATE POLICY "Allow public form submissions" ON leads
  FOR INSERT
  TO anon, authenticated, service_role
  WITH CHECK (true);

-- Allow full access for service_role or authenticated users (CRM operations)
CREATE POLICY "Allow service_role full access" ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Optional Demo Seed Data
INSERT INTO leads (id, created_at, category, status, name, company, email, phone, service, group_size, dates, message, priority, internal_notes)
VALUES
  (
    'lead-2026-001',
    NOW() - INTERVAL '45 minutes',
    'proposal',
    'unread',
    'Alexander von Berg',
    'Apex Global Holdings (Zurich / New York)',
    'a.vonberg@apexholding.ch',
    '+1 (212) 555-0194',
    'Executive Chauffeur Transportation',
    '4-8 C-Suite',
    'Nov 12 - Nov 18, 2026',
    'Need 4 Cadillac Escalade ESVs and 2 Mercedes S-Class for private aviation arrival at OPF Signature Flight Support with dedicated tarmac staging for Art Basel executive summit.',
    'vip',
    'High-priority inquiry from private Swiss family office. Assigned to Opa-locka dispatcher.'
  ),
  (
    'lead-2026-002',
    NOW() - INTERVAL '3 hours',
    'proposal',
    'read',
    'Elena Rostova',
    'Monaco Grand Hospitality',
    'e.rostova@monacoevents.mc',
    '+377 98 06 20 00',
    'Corporate Group Travel',
    '40-60 Guests',
    'Dec 02 - Dec 06, 2026',
    'Seeking turnkey ground transport, luxury coach transit from Miami International Airport (MIA) to South Beach luxury hotel room block, and VIP dining buyout reservations for 50 attendees.',
    'high',
    'Reviewed RFP. Sent initial brochure and waiting for finalized flight manifest.'
  )
ON CONFLICT (id) DO NOTHING;
