// src/lib/storage.ts

// Key we’ll use in localStorage
const STORAGE_KEY = "mental_health_data";

export type VentEntry = {
  id: string;
  text: string;
  createdAt: string;
};

type StorageSchema = {
  vents: VentEntry[];
  buddyName?: string;
  lastCheckIn?: string;
};

// Fetch data
export function getStorage(): StorageSchema {
  if (typeof window === "undefined") return { vents: [] }; // SSR safe
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : { vents: [] };
}

// Save data
export function saveStorage(data: StorageSchema) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Add a vent entry
export function addVent(text: string) {
  const data = getStorage();
  const newEntry: VentEntry = {
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toISOString(),
  };
  data.vents.unshift(newEntry);
  saveStorage(data);
  return newEntry;
}
