"use strict";

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

let events = [];
let registrations = [];
let editingEventId = null;

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

function saveData(nextEvents, nextRegistrations) {
  try {
    localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(nextEvents));
    localStorage.setItem(STORAGE_KEYS.registrations, JSON.stringify(nextRegistrations));
    events = nextEvents;
    registrations = nextRegistrations;
    return true;
  } catch (error) {
    console.error("Could not save application data.", error);
    return false;
  }
}

function makeId(prefix) {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return `${prefix}-${window.crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function registrationCount(eventId, source = registrations) {
  return source.filter((registration) => registration.eventId === eventId).length;
}

function getEventInput(form) {
  const fields = new FormData(form);
  return {
    name: String(fields.get("eventName") || "").trim(),
    date: String(fields.get("eventDate") || "").trim(),
    venue: String(fields.get("eventVenue") || "").trim(),
    capacity: Number(fields.get("eventCapacity")),
    status: String(fields.get("eventStatus") || "Draft")
  };
}

function validateEvent(input) {
  if (!input.name || !input.date || !input.venue) {
    return "Enter an event name, date, and venue.";
  }

  if (!Number.isInteger(input.capacity) || input.capacity < 1) {
    return "Capacity must be a whole number greater than zero.";
  }

  if (!EVENT_STATUSES.includes(input.status)) {
    return "Choose a valid event status.";
  }

  return "";
}

function addEvent(input) {
  const validationMessage = validateEvent(input);
  if (validationMessage) return { ok: false, message: validationMessage };
  if (input.status !== EVENT_STATUSES[0]) {
    return { ok: false, message: "New events must start in Draft status." };
  }

  const event = { id: makeId("event"), ...input };
  const nextEvents = [...events, event];

  return saveData(nextEvents, registrations)
    ? { ok: true, message: `Event "${event.name}" was added.` }
    : { ok: false, message: "The event could not be saved in this browser." };
}

function updateEvent(eventId, input) {
  const existingEvent = events.find((event) => event.id === eventId);
  if (!existingEvent) return { ok: false, message: "Select an event to edit." };

  const validationMessage = validateEvent(input);
  if (validationMessage) return { ok: false, message: validationMessage };

  const registered = registrationCount(eventId);
  if (input.capacity < registered) {
    return { ok: false, message: `Capacity cannot be lower than the ${registered} active registration(s).` };
  }

  const currentStatusIndex = EVENT_STATUSES.indexOf(existingEvent.status);
  const nextStatusIndex = EVENT_STATUSES.indexOf(input.status);
  if (nextStatusIndex < currentStatusIndex || nextStatusIndex > currentStatusIndex + 1) {
    return { ok: false, message: "Event status can stay the same or advance one step at a time." };
  }

  const updatedEvent = { ...existingEvent, ...input };
  const nextEvents = events.map((event) => event.id === eventId ? updatedEvent : event);

  return saveData(nextEvents, registrations)
    ? { ok: true, message: `Event "${updatedEvent.name}" was updated.` }
    : { ok: false, message: "The event could not be saved in this browser." };
}

function deleteEvent(eventId) {
  const event = events.find((item) => item.id === eventId);
  if (!event) return { ok: false, message: "Select an event to delete." };

  const nextEvents = events.filter((item) => item.id !== eventId);
  const nextRegistrations = registrations.filter((item) => item.eventId !== eventId);

  return saveData(nextEvents, nextRegistrations)
    ? { ok: true, message: `Event "${event.name}" and its registrations were deleted.` }
    : { ok: false, message: "The event could not be deleted from this browser." };
}

function getRegistrationInput(form) {
  const fields = new FormData(form);
  return {
    eventId: String(fields.get("registrationEvent") || "").trim(),
    studentName: String(fields.get("studentName") || "").trim(),
    studentId: String(fields.get("studentId") || "").trim(),
    yearLevel: String(fields.get("yearLevel") || "").trim(),
    dateRegistered: String(fields.get("dateRegistered") || "").trim()
  };
}

function addRegistration(input) {
  const event = events.find((item) => item.id === input.eventId);
  if (!event) return { ok: false, message: "Select an event before registering." };
  if (!input.studentName || !input.studentId || !input.yearLevel || !input.dateRegistered) {
    return { ok: false, message: "Enter the student's name, ID, year level, and registration date." };
  }
  if (event.status !== "Open for Registration") {
    return { ok: false, message: "This event is not open for registration." };
  }
  if (registrations.some((registration) => registration.eventId === input.eventId
    && registration.studentId.trim().toLowerCase() === input.studentId.toLowerCase())) {
    return { ok: false, message: "This student ID is already registered for this event." };
  }
  if (registrationCount(event.id) >= Number(event.capacity)) {
    return { ok: false, message: "This event has reached its registration capacity." };
  }

  const registration = {
    id: makeId("registration"),
    ...input,
    attendance: "Not marked"
  };
  const nextRegistrations = [...registrations, registration];

  return saveData(events, nextRegistrations)
    ? { ok: true, message: `${registration.studentName} was registered for "${event.name}".` }
    : { ok: false, message: "The registration could not be saved in this browser." };
}

function cancelRegistration(registrationId) {
  const registration = registrations.find((item) => item.id === registrationId);
  if (!registration) return { ok: false, message: "This registration could not be found." };

  const nextRegistrations = registrations.filter((item) => item.id !== registrationId);
  return saveData(events, nextRegistrations)
    ? { ok: true, message: `Registration for ${registration.studentName} was cancelled.` }
    : { ok: false, message: "The registration could not be cancelled in this browser." };
}

function setMessage(id, message) {
  const element = document.getElementById(id);
  if (element) element.textContent = message;
}

function showResult(result) {
  if (result.ok) {
    setMessage("success-message", result.message);
    setMessage("error-message", "No errors.");
    setMessage("validation-message", "Operation completed.");
  } else {
    setMessage("error-message", result.message);
    setMessage("validation-message", result.message);
  }
}

function addCell(row, text) {
  const cell = document.createElement("td");
  cell.textContent = String(text);
  row.appendChild(cell);
  return cell;
}

function makeActionButton(label, className, action) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `button ${className}`;
  button.textContent = label;
  button.addEventListener("click", action);
  return button;
}

function renderEvents() {
  const body = document.getElementById("events-table-body");
  body.replaceChildren();

  if (events.length === 0) {
    const row = document.createElement("tr");
    const cell = addCell(row, "No events to display yet. Add an event using the form above.");
    cell.colSpan = 8;
    cell.className = "empty-state";
    body.appendChild(row);
    return;
  }

  events.forEach((event) => {
    const row = document.createElement("tr");
    const registered = registrationCount(event.id);
    addCell(row, event.name);
    addCell(row, event.date);
    addCell(row, event.venue);
    addCell(row, event.capacity);
    addCell(row, event.status);
    addCell(row, registered);
    addCell(row, Math.max(0, Number(event.capacity) - registered));

    const actions = document.createElement("td");
    actions.className = "table-actions";
    actions.appendChild(makeActionButton("Edit", "button-secondary", () => beginEventEdit(event.id)));
    actions.appendChild(makeActionButton("Delete", "button-danger-outline", () => removeEvent(event.id)));
    row.appendChild(actions);
    body.appendChild(row);
  });
}

function populateEventSelects() {
  const registrationSelect = document.getElementById("registration-event");
  const attendanceSelect = document.getElementById("attendance-event");
  const previousRegistrationValue = registrationSelect.value;
  const previousAttendanceValue = attendanceSelect.value;

  registrationSelect.replaceChildren(new Option("Select an open event", ""));
  attendanceSelect.replaceChildren(new Option("Select an event", ""));

  events.forEach((event) => {
    const attendanceOption = new Option(`${event.name} (${event.date})`, event.id);
    attendanceSelect.add(attendanceOption);

    if (event.status === "Open for Registration") {
      const count = registrationCount(event.id);
      const full = count >= Number(event.capacity);
      const registrationOption = new Option(
        `${event.name} (${full ? "Full" : `${Math.max(0, Number(event.capacity) - count)} slots left`})`,
        event.id
      );
      registrationOption.disabled = full;
      registrationSelect.add(registrationOption);
    }
  });

  registrationSelect.value = previousRegistrationValue;
  attendanceSelect.value = previousAttendanceValue;
}

function renderRegistrations() {
  const body = document.getElementById("registrations-table-body");
  body.replaceChildren();

  if (registrations.length === 0) {
    const row = document.createElement("tr");
    const cell = addCell(row, "No registrations to display yet. Registrations will appear here.");
    cell.colSpan = 7;
    cell.className = "empty-state";
    body.appendChild(row);
    return;
  }

  registrations.forEach((registration) => {
    const row = document.createElement("tr");
    const event = events.find((item) => item.id === registration.eventId);
    addCell(row, event ? event.name : "Event unavailable");
    addCell(row, registration.studentName);
    addCell(row, registration.studentId);
    addCell(row, registration.yearLevel);
    addCell(row, registration.dateRegistered);
    addCell(row, registration.attendance || "Not marked");
    const actions = document.createElement("td");
    actions.className = "table-actions";
    actions.appendChild(makeActionButton("Cancel", "button-danger-outline", () => {
      const result = cancelRegistration(registration.id);
      showResult(result);
      render();
    }));
    row.appendChild(actions);
    body.appendChild(row);
  });
}

function renderStorageStatus() {
  const status = document.getElementById("storage-status");
  status.textContent = `Browser storage is ready. ${events.length} events and ${registrations.length} registrations are saved on this device.`;
}

function render() {
  renderEvents();
  populateEventSelects();
  renderRegistrations();
  renderStorageStatus();
}

function setEventFormMode(isEditing) {
  document.getElementById("add-event-button").hidden = isEditing;
  document.getElementById("edit-event-button").hidden = !isEditing;
  document.getElementById("cancel-edit-button").hidden = !isEditing;
}

function setStatusOptions(currentStatus) {
  const select = document.querySelector('[name="eventStatus"]');
  select.replaceChildren();
  const currentIndex = EVENT_STATUSES.indexOf(currentStatus);
  const allowedStatuses = currentIndex < 0
    ? [EVENT_STATUSES[0]]
    : EVENT_STATUSES.slice(currentIndex, Math.min(currentIndex + 2, EVENT_STATUSES.length));

  allowedStatuses.forEach((status) => select.add(new Option(status, status)));
  select.value = currentStatus;
}

function restoreNewEventForm() {
  editingEventId = null;
  document.getElementById("event-form").reset();
  setStatusOptions("Draft");
  setEventFormMode(false);
}

function beginEventEdit(eventId) {
  const event = events.find((item) => item.id === eventId);
  if (!event) return;

  const form = document.getElementById("event-form");
  form.elements.eventName.value = event.name;
  form.elements.eventDate.value = event.date;
  form.elements.eventVenue.value = event.venue;
  form.elements.eventCapacity.value = event.capacity;
  setStatusOptions(event.status);
  editingEventId = eventId;
  setEventFormMode(true);
  setMessage("validation-message", "Edit the event fields. Status can stay the same or advance one step.");
  form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function removeEvent(eventId) {
  const event = events.find((item) => item.id === eventId);
  if (!event) {
    showResult({ ok: false, message: "Select an event to delete." });
    return;
  }

  const count = registrationCount(eventId);
  const details = count ? ` Its ${count} registration(s) will also be deleted.` : "";
  if (!window.confirm(`Delete "${event.name}"?${details}`)) return;

  const result = deleteEvent(eventId);
  if (editingEventId === eventId) restoreNewEventForm();
  showResult(result);
  render();
}

function initializeApplication() {
  events = loadStoredArray(STORAGE_KEYS.events);
  registrations = loadStoredArray(STORAGE_KEYS.registrations);

  const eventForm = document.getElementById("event-form");
  const registrationForm = document.querySelector('[aria-label="Student registration form"]');
  const dateInput = registrationForm.elements.dateRegistered;
  const now = new Date();
  dateInput.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  setStatusOptions("Draft");

  document.getElementById("add-event-button").addEventListener("click", () => {
    const result = addEvent(getEventInput(eventForm));
    showResult(result);
    if (result.ok) restoreNewEventForm();
    render();
  });

  document.getElementById("edit-event-button").addEventListener("click", () => {
    if (!editingEventId) {
      showResult({ ok: false, message: "Choose Edit from an event row before saving changes." });
      return;
    }
    const result = updateEvent(editingEventId, getEventInput(eventForm));
    showResult(result);
    if (result.ok) restoreNewEventForm();
    render();
  });

  document.getElementById("delete-event-button").addEventListener("click", () => {
    if (!editingEventId) {
      showResult({ ok: false, message: "Choose Edit from an event row before deleting it here." });
      return;
    }
    removeEvent(editingEventId);
  });

  document.getElementById("cancel-edit-button").addEventListener("click", restoreNewEventForm);

  document.getElementById("register-student-button").addEventListener("click", () => {
    const result = addRegistration(getRegistrationInput(registrationForm));
    showResult(result);
    if (result.ok) {
      registrationForm.elements.studentName.value = "";
      registrationForm.elements.studentId.value = "";
      registrationForm.elements.yearLevel.value = "";
    }
    render();
  });

  render();
}

document.addEventListener("DOMContentLoaded", initializeApplication);
