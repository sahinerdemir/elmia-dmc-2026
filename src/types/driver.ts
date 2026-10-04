export type DriverStatus = "pending" | "reviewed" | "approved" | "rejected";

export interface DriverApplication {
  id: string;
  createdAt: string; // ISO date string
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  phone: string;
  email: string;
  address?: string;

  // Driving Experience
  professionalDrivingYears?: string | number;
  chauffeurExperienceYears?: string | number;
  workedForLimoCompany?: boolean;
  previousCompanyName?: string;

  // Driver's License — Required
  licenseNumber: string;
  licenseState: string;
  licenseExpirationDate?: string;
  licenseFrontUrl: string;
  licenseBackUrl: string;

  // Chauffeur Registration — Optional
  hasChauffeurRegistration?: boolean;
  chauffeurRegistrationNumber?: string;
  chauffeurRegistrationExpirationDate?: string;
  chauffeurRegistrationFrontUrl?: string;
  chauffeurRegistrationBackUrl?: string;

  // Availability & Schedule
  availability?: string[]; // ["Full Time", "Part Time", "Weekdays", "Weekends", "Flexible"]
  preferredHours?: string; // "Day", "Evening", "Night", "Flexible"

  // Languages & Additional Notes
  languages?: string | string[];
  notes?: string;
  certified?: boolean;

  // Legacy/Backwards Compatibility fields (keeps CRM / existing records intact)
  origin?: string;
  yearsInUS?: string | number;
  drivingExperienceYears?: string | number;
  hasChildren?: boolean;
  childrenDetails?: string;
  hasSSN?: boolean;
  ssn?: string;
  vehicleExperience?: string;
  isArchived?: boolean;

  status: DriverStatus;
}

export interface DriverFilterOptions {
  status?: DriverStatus | "all";
  search?: string;
  sortBy?: "newest" | "oldest" | "name" | "experience";
}
