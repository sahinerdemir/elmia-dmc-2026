export type DriverStatus = "pending" | "reviewed" | "approved" | "rejected";

export interface DriverApplication {
  id: string;
  createdAt: string; // ISO date string
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  origin: string; // Nereli olduğu (Ülke / Şehir / Hometown)
  yearsInUS: string | number; // Kaç yıldır Amerika'da yaşadığı
  drivingExperienceYears: string | number; // Kaç yıldır şoförlük işi yaptığı
  licenseNumber: string; // Ehliyet numarası
  licenseState?: string; // Ehliyetin verildiği eyalet (örn: FL, NY, CA)
  hasChildren: boolean; // Çocuğu var mı
  childrenDetails?: string; // Çocuğu varsa sayısı / bilgisi
  hasSSN: boolean; // SSN'i var mı
  ssn?: string; // Varsa SSN numarası
  licenseFrontUrl: string; // Ehliyet ön yüz fotoğraf URL'i
  licenseBackUrl: string; // Ehliyet arka yüz fotoğraf URL'i
  status: DriverStatus;
  notes?: string; // Operasyon / inceleme notları
  languages?: string; // Konuştuğu diller
  vehicleExperience?: string; // Tecrübeli olduğu araç tipleri (SUV, Sprinter, Limousine vs.)
  isArchived?: boolean;
}

export interface DriverFilterOptions {
  status?: DriverStatus | "all";
  search?: string;
  sortBy?: "newest" | "oldest" | "name" | "experience";
}
