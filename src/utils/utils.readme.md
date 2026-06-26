# Utils Folder

This folder is for shared utility code used across the application. It should contain small, reusable helpers, wrappers, and common logic that does not belong to a single feature or page.

## What belongs here
- Pure utility functions: string formatting, date handling, number manipulation, validation helpers.
- Shared helpers: API response parsing, storage helpers, feature-agnostic transforms.
- Reusable constants, enums, and type definitions used by multiple modules.
- Thin wrappers around common APIs or libraries.

## Naming rules
- Use descriptive names that explain purpose, e.g. `date-utils`, `string-helpers`, `storage.ts`.
- Keep names specific and avoid generic terms like `misc`, `helpers`, or `stuff`.
- Prefer consistent casing for filenames: either kebab-case (`date-utils.ts`) or camelCase (`dateUtils.ts`) depending on project conventions.
- Export clearly named functions or objects; avoid default exports for shared utilities when named exports are clearer.

## Usage
- Import utilities from `src/utils/` in feature code.
- Keep utility modules independent of UI and feature-specific state.
- Document the exported functions and include simple usage examples in comments if needed.
- Add new shared code here only when it is genuinely reusable by multiple parts of the app.
