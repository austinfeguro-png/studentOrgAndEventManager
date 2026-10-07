"use strict";

// Initial data shapes for the project. No event or registration workflows
// are implemented in this setup stage.
const STORAGE_KEYS = {
  events: "studentOrgEventManager.events",
  registrations: "studentOrgEventManager.registrations"
};

const EVENT_STATUSES = [
  "Draft",
  "Open for Registration",
  "Closed",
  "Completed"
];

// Event model: { id, name, date, venue, capacity, status }
// Registration model: {
//   id, eventId, studentName, studentId, yearLevel, dateRegistered, attendance
// }

function loadStoredArray(key) {
  const savedValue = localStorage.getItem(key);

  if (savedValue === null) {
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  }

  try {
    const parsedValue = JSON.parse(savedValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (error) {
    console.error(`Could not read saved data for ${key}.`, error);
    return [];
  }
}

function initializeStorage() {
  const events = loadStoredArray(STORAGE_KEYS.events);
  const registrations = loadStoredArray(STORAGE_KEYS.registrations);
  const status = document.getElementById("storage-status");

  if (status) {
    status.textContent = `Browser storage is ready. ${events.length} events and ${registrations.length} registrations are saved on this device.`;
  }
}

document.addEventListener("DOMContentLoaded", initializeStorage);
