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
