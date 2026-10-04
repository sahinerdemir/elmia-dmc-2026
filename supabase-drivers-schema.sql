-- ==============================================================================
-- ELMIA DMC 2026 - Supabase Database Schema for Driver Applications
-- ==============================================================================
-- Optional: Run this SQL in your Supabase project (SQL Editor -> New Query -> Run)
-- to enable native relational Postgres table storage for driver applications.

CREATE TABLE IF NOT EXISTS drivers (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  origin TEXT NOT NULL,
  years_in_us TEXT NOT NULL,
  driving_experience_years TEXT NOT NULL,
  license_number TEXT NOT NULL,
  license_state TEXT DEFAULT 'FL',
  has_children BOOLEAN DEFAULT false,
  children_details TEXT,
  has_ssn BOOLEAN DEFAULT false,
  ssn TEXT,
  license_front_url TEXT NOT NULL,
  license_back_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'rejected')),
  notes TEXT,
  languages TEXT,
  vehicle_experience TEXT,
  is_archived BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_drivers_created_at ON drivers (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_drivers_status ON drivers (status);
CREATE INDEX IF NOT EXISTS idx_drivers_phone ON drivers (phone);

-- Enable RLS
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;

-- Allow public applications
CREATE POLICY "Allow public driver applications" ON drivers
  FOR INSERT
  TO anon, authenticated, service_role
  WITH CHECK (true);

-- Allow CRM operations
CREATE POLICY "Allow service_role full access to drivers" ON drivers
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
