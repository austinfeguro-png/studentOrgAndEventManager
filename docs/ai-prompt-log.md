# AI Prompt Log

Record prompts used during development so AI assistance is transparent and the project decisions can be reviewed.

## Entry template

- **Date:** YYYY-MM-DD
- **Stage:**
- **Tool/model:**
- **Prompt:**
- **How the output was used:**
- **Changes reviewed or made by the student:**

## Entries

### 2026-10-07 — Stage 1: Initial Project Setup

- **Tool/model:** OpenAI Codex
- **Prompt:** Complete only Stage 1 of the Student Organization Event and Attendance Manager: inspect the project folder and Git status, establish the requested HTML/CSS/vanilla JavaScript/localStorage structure and initial Event and Registration models, create the README and requirements and AI prompt documentation, verify the page and JavaScript, and do not create a Git commit or implement later-stage features.
- **How the output was used:** Used to establish the initial project files and browser storage foundation.
- **Changes reviewed or made by the student:** To be completed by the student after reviewing the generated files.

### 2026-10-07 — Stage 2: Create Application Interface

- **Tool/model:** OpenAI Codex
- **Prompt:** Inspect the existing project and Git status, then create only the responsive main interface for the Student Organization Event and Attendance Manager using the existing HTML, CSS, and vanilla JavaScript structure. Include event management, student registration, attendance/check-in, search/filter controls, report placeholders, and user message areas. Preserve the Stage 1 models and localStorage foundation, leave later-stage business logic unimplemented, and do not commit.
- **How the output was used:** Codex was used to create the application interface, including the event management interface, student registration interface, attendance/check-in area, search/filter controls, report areas, success/error/validation message areas, and responsive layout.
- **Evaluation:** The generated interface was reviewed and the Stage 2 implementation stayed within scope. Verification performed included JavaScript syntax checking, checking localStorage initialization with a JavaScript initialization check, and `git diff --check`.
- **Changes reviewed or made by the student:** The student reviewed the generated files and verified the interface and the preserved Stage 1 foundation. Git commits are handled manually by the student.

### 2026-10-07 — Stage 3: Implement Core Functionality

- **Tool/model:** OpenAI Codex
- **Prompt:** Inspect the existing Stage 2 project, then implement only core event management and student registration using the existing interface, data models, and localStorage. Add event creation, editing, deletion, sequential status progression, registration, capacity and duplicate-ID checks, cancellation, calculated registration counts and remaining slots, and persistence. Keep attendance check-in, reporting, and search/filter functionality for later stages, verify the changes, and do not commit.
- **How the output was used:** Codex connected the Stage 2 interface to the JavaScript data models and localStorage, implementing event add/edit/delete, status progression, student registration, capacity limits, duplicate student-ID prevention, cancellation, live registration counts and slots, and persistence.
- **Evaluation:** The Stage 3 implementation was reviewed. The reported JavaScript syntax, logic, storage/reload, and `git diff --check` checks passed. Attendance check-in, reports, and search/filter behavior were intentionally left for later stages.
- **Changes reviewed or made by the student:** The student reviewed the generated implementation and test results and verified that the core functionality worked within the Stage 3 scope. Git commits are handled manually by the student.

### 2026-10-07 — Stage 4: Add Input Validation

- **Tool/model:** OpenAI Codex
- **Prompt:** Review the Stage 3 implementation and add input validation for event and registration workflows in the Student Organization Event and Attendance Manager. Validate required fields, dates, positive whole-number capacity, allowed year levels, and whitespace-only input; trim text before saving; prevent rejected operations from changing localStorage; preserve existing Stage 3 behavior; test invalid and valid cases; and do not commit.
- **How the output was used:** Codex reviewed the Stage 3 implementation and added validation for event and registration inputs, including required fields, valid dates, positive whole-number capacity, allowed year levels, whitespace trimming, and prevention of invalid data from being stored.
- **Evaluation:** Testing covered 12 invalid event input cases and 11 invalid registration input cases, including whitespace-only fields, missing values, invalid dates, invalid capacities, and invalid year levels. Valid inputs and existing Stage 3 workflows were also tested; rejected inputs left stored data unchanged, valid data persisted and reloaded, JavaScript syntax and `git diff --check` passed, and the page loaded successfully in headless Chrome.
- **Changes reviewed or made by the student:** The student reviewed the validation implementation and test results and verified that Stage 3 functionality remained intact. Git commits are handled manually by the student.
