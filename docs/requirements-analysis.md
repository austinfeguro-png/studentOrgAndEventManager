# Requirements Analysis

## Problem

Student organization officers need to organize events, record student registrations, and manage attendance. This project provides a browser-based application for those tasks. Its current implementation covers event and registration workflows; check-in, attendance analysis, reports, and search/filter functions remain planned requirements.

## Target users

The primary users are student organization officers responsible for organizing events and maintaining participant records.

## Functional requirements

### Implemented requirements

- Create, view, edit, and delete events.
- Store each event's name, date, venue, capacity, and status.
- Start events in Draft and advance status in order: Draft → Open for Registration → Closed → Completed.
- Register students for events whose status is Open for Registration.
- Store registration details and initialize attendance as `Not marked`.
- Prevent a registration from exceeding event capacity.
- Prevent the same student ID from registering more than once for the same event. The student may register for another event.
- Cancel a registration. Cancellation removes the registration and frees its event slot.
- Display registered counts and slots left, calculated from registrations.
- Validate required event and registration fields, valid date values, positive whole-number capacity, and allowed year levels. Trim surrounding whitespace from text inputs.
- Persist events and registrations in browser `localStorage`. If one of the paired storage writes fails after the earlier write succeeded, attempt to restore the prior value.

### Requirements not yet implemented

- Check students in at an event.
- Calculate attendance rates.
- Search or filter registrations by student name, student ID, or attendance.
- Produce functional reports, including events by status, registration totals, attendance rates, and the completed event with the highest attendance rate.

The HTML currently shows interface placeholders for attendance, search/filter, and reports. Their presence in the page does not mean these functions are implemented.

## Required inputs

### Event inputs

- Event name (required; surrounding whitespace is removed)
- Event date (required and must be a valid calendar date)
- Venue (required; surrounding whitespace is removed)
- Capacity (required positive whole number)
- Status (one of Draft, Open for Registration, Closed, or Completed; new events start in Draft and edits can keep the current status or advance one step)

### Registration inputs

- Event selection (must identify an existing event open for registration)
- Student name (required; surrounding whitespace is removed)
- Student ID (required; surrounding whitespace is removed)
- Year level (1st Year, 2nd Year, 3rd Year, 4th Year, or Other)
- Date registered (required and must be a valid calendar date; defaults to the current local date in the form)
- Attendance is stored with each registration and begins as `Not marked`; check-in processing is not implemented.

## Expected outputs

### Currently implemented outputs

- Event and registration rows displayed in their respective tables.
- Event status, registered count, and slots-left values.
- Clear success, error, and validation messages for core operations.
- A storage status showing the number of events and registrations saved in the current browser.
- Event and registration arrays saved in the browser's localStorage under `studentOrgEventManager.events` and `studentOrgEventManager.registrations`.

### Planned outputs

- Check-in results and present/registered summaries.
- Calculated attendance rates.
- Search/filter results.
- Functional report summaries and highest-attendance event.

## Proposed features

The project is being developed incrementally. Event management, student registration, capacity and duplicate checks, cancellation, validation, and localStorage persistence are implemented. Attendance check-in, attendance-rate calculations, registration search/filtering, and functional reports are proposed for later development.

## Tools/technologies

- HTML for application structure
- CSS for responsive presentation
- Vanilla JavaScript for application behavior and validation
- Browser `localStorage` for persistence; no database or backend/server
- Git/GitHub for incremental development history. The student manually creates and maintains commits.
- Node.js syntax checks, `git diff --check`, localStorage and workflow checks, simulated storage-failure/rollback checks, validation cases, and headless Chrome startup checks were performed during development. The repository does not include a permanent automated test suite.
