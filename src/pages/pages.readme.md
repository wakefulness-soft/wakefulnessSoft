# Pages Folder

This folder contains page-level components and content used by the application. It is intended for high-level route targets or view screens rather than low-level shared UI elements.

## Structure

- `pages/`
  - Each page file or folder represents one route or view.
  - Page files can export components, page metadata, and route-specific logic.
  - Subfolders can group related pages or nested route segments.

## Rules

- Keep folder structure aligned with the routing structure used by the app.
- Name files and folders clearly to reflect the page or route purpose.
- Avoid placing reusable components here; use a shared `components` or `ui` folder instead.
- Keep page files focused on layout and data loading for the view.
- Document the purpose of any special page or nested segment in this README.

## Usage

- Import page components from this folder in the route configuration.
- Place page-specific styles or data loading utilities close to the page file.
- Use pages as the entry point for rendering a route, then delegate smaller UI pieces to child components.
- Keep page files simple by passing props to nested components rather than handling detailed rendering logic inline.
