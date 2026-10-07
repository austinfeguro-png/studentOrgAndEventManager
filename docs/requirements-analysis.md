# Requirements Analysis

## Project overview

**Project name:** Student Organization Event and Attendance Manager  
**Course:** IT 415 – Application Development and Emerging Technologies  
**Primary users:** Student organization officers

The project will provide a browser-based way for organization officers to manage student organization events, student registrations, and attendance.

## Technology and constraints

- HTML, CSS, and vanilla JavaScript
- Browser `localStorage` for client-side persistence
- No database, backend, framework, or unnecessary dependency
- Keep the implementation understandable and separated into HTML, CSS, and JavaScript files
- Develop incrementally with Git/GitHub commits so the project has visible development history

## Initial data models

### Event

| Field | Purpose |
| --- | --- |
| `id` | Unique identifier for the event |
| `name` | Event name |
| `date` | Scheduled event date |
| `venue` | Event location |
| `capacity` | Maximum number of registrants |
| `status` | Event lifecycle state |

Supported event statuses: `Draft`, `Open for Registration`, `Closed`, and `Completed`.

### Registration

| Field | Purpose |
| --- | --- |
| `id` | Unique identifier for the registration |
| `eventId` | Identifier of the event being registered for |
| `studentName` | Registrant's name |
| `studentId` | Registrant's student identifier |
| `yearLevel` | Registrant's year level |
| `dateRegistered` | Date the registration was created |
| `attendance` | Attendance state for the registrant |

## Stage 1 scope

Stage 1 establishes the project structure, initial data model definitions, documentation foundation, and browser storage initialization for event and registration arrays. It provides a basic page that can load in a browser.

## Later-stage functionality

The following are requirements for later stages and are not implemented in Stage 1:

- Event create, read, update, and delete workflows
- Student registration
- Capacity enforcement and duplicate registration prevention
- Registration cancellation
- Attendance check-in and attendance-rate calculations
- Search, filtering, and reports
