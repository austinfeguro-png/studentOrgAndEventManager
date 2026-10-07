# Student Organization Event and Attendance Manager

An IT 415 midterm project for student organization officers. The application is being developed in stages with HTML, CSS, vanilla JavaScript, and browser `localStorage`.

## Stage 1: Initial Project Setup

Stage 1 establishes the page, stylesheet, JavaScript entry point, initial Event and Registration data shapes, documentation, and localStorage keys. It does not yet provide event or registration management workflows.

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

## Run locally

Open `index.html` in a modern browser. The initial events and registrations arrays are stored in that browser's `localStorage` under the keys `studentOrgEventManager.events` and `studentOrgEventManager.registrations`.

Data is local to the browser and device. Clearing browser storage removes it. No backend or database is used.

## Documentation

- [Requirements analysis](docs/requirements-analysis.md)
- [AI prompt log](docs/ai-prompt-log.md)

## Development history

The project is intended to be developed incrementally with Git/GitHub commits as each stage is completed.
