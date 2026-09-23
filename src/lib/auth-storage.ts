import fs from 'fs';
import path from 'path';

const PASSWORD_FILE = path.join(process.cwd(), '.crm_password');
const DEFAULT_PASSWORD = process.env.CRM_PASSWORD || "122ElmiaDMC683";

export function getCrmPassword(): string {
  try {
    if (fs.existsSync(PASSWORD_FILE)) {
      return fs.readFileSync(PASSWORD_FILE, 'utf-8').trim();
    }
  } catch (e) {
    console.error("Error reading password file", e);
  }
  return DEFAULT_PASSWORD;
}

export function setCrmPassword(newPassword: string): boolean {
  try {
    fs.writeFileSync(PASSWORD_FILE, newPassword.trim(), 'utf-8');
    return true;
  } catch (e) {
    console.error("Error writing password file", e);
    return false;
  }
}
