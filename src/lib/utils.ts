import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidNRIC = (nric: string) => {
  // Basic NRIC format validation (Singapore)
  const nricRegex = /^[STFG]\d{7}[A-Z]$/i
  return nricRegex.test(nric.trim())
}
