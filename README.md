# Student Organization Event and Attendance Manager

An IT 415 midterm project built for student organization officers. It provides a browser-based way to manage organization events and student registrations, with attendance and reporting features planned for later work.

## Current functionality

- Add, edit, and delete events.
- Start events in **Draft** and advance their status one step at a time: Draft, Open for Registration, Closed, Completed.
- Register students for events that are open for registration.
- Validate required event and registration inputs, including dates, capacity, and year level; trim surrounding whitespace.
- Enforce event capacity and prevent the same student ID from registering twice for the same event.
- Cancel registrations and delete registrations associated with a deleted event.
- Display registered counts and remaining slots based on stored registrations.
- Save event and registration data in browser `localStorage`. If a later storage write fails after an earlier write succeeds, restore the earlier value where possible.

## Technologies

- HTML
- CSS
- Vanilla JavaScript
- Browser `localStorage`

The application has no database, backend/server, framework, or external library dependency.

## Run locally

Open `index.html` in a modern browser. The application initializes and uses these localStorage keys:

- `studentOrgEventManager.events`
- `studentOrgEventManager.registrations`

Data is stored only in the browser profile on that device. Clearing the browser's site data removes it. Opening the project from a different browser or device uses separate storage.

## Project structure

```text
student-organization-event-manager/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── docs/
│   ├── requirements-analysis.md
│   └── ai-prompt-log.md
├── screenshots/
└── README.md
```

## Development stages

Stages completed:

1. Initial Project Setup
2. Create Application Interface
3. Implement Core Functionality
4. Add Input Validation
5. Fix Application Error
6. Refactor Application Code

The student manually creates and maintains the Git/GitHub commits that record this development history.

## Verification performed

Development-time checks included JavaScript syntax checks with Node.js, `git diff --check`, localStorage initialization and persistence/reload checks, and event/registration workflow checks. Validation checks covered 12 invalid event inputs and 11 invalid registration inputs. A simulated localStorage write failure reproduced the Stage 5 partial-save issue and was retested after adding rollback. Regression checks covered event and registration workflows, validation, persistence, and rollback. Headless Chrome checks confirmed that the page loaded and initialized its storage status.

These were development-time checks; the project does not include a permanent automated test suite.

## Limitations and planned work

The current application does not yet implement:

- Student attendance check-in processing
- Attendance-rate calculation
- Functional reports or report calculations
- Registration search or filtering

The page includes interface placeholders for some of these planned features, but those controls and report areas do not perform those functions yet.

See [requirements analysis](docs/requirements-analysis.md) for implemented and planned requirements and [AI prompt log](docs/ai-prompt-log.md) for the development assistance record.
