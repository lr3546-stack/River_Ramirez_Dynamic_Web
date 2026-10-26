# Homework — Week 6

## `todo-list/`

- **Done toggle** — every todo has a `done` property. The checkbox on each row
  toggles it and crosses out the title. The change is sent to the server with
  **PATCH**, so it is still there after a refresh. PATCH merges the one field;
  PUT would replace the whole record and lose the title.
- **Filter** — All / Active / Done buttons above the list. The filter state
  lives in `App`, and the filtering is a `.filter()` on the todos already in
  state. No new requests.
- The "left to do" count is worked out at render time, not stored.

The HW questions are answered in a comment at the top of `src/App.jsx`.

## Running

Two terminal tabs, both in `todo-list/`:

```bash
npm install
npm run dev        # tab 1 — the app, port 5173
npm run server     # tab 2 — json-server, port 3001
```
