# CEM Physical Therapy — Recovery Plan

A one-screen app for a physical therapist to build a patient's home exercise
plan. The therapist assigns exercises, attaches a demo video to each one, and
sees which ones the patient has completed. Everything assigned here is what
shows up in the patient's portal.

**Who would use it:** a physical therapist (in the demo, Dr. Stephen Fong, PT)
managing a patient's exercises between clinic visits. It comes from my
[CEM Physical Therapy case study](https://thisisriver.com/recover.html):
patients forget how to do their exercises once they leave the clinic, so the
plan needs to show them, not just tell them.

## User story

> As a physical therapist, I want to attach a demo video to each exercise I
> assign, so that my patient knows the correct form at home.

**The field it produced:** `video` — a select dropdown of the clinic's demo
video library. It is saved with each exercise, plays inside the exercise card,
and can be changed in the edit form.

## How to run it

Two terminals, both in this folder:

```bash
npm install        # first time only
npm run server     # terminal 1 — json-server, the database, port 3001
npm run dev        # terminal 2 — the app, http://localhost:5173
```

If the app says it cannot reach the server, terminal 1 is not running.

## What it does

- **Assign** an exercise with a name and an optional demo video (the `+` button)
- **Edit** an exercise's name or video
- **Remove** an exercise
- **Mark completed** with the round check button — it moves between the
  **Assigned** and **Completed** tabs
- **Patient progress** bar, worked out from how many exercises are completed
- Loading, empty and error states, including a message when a save fails

## Props or Context, and why

**Props.** The exercise list and the four server functions live in `App`, and
they only travel two levels down (`App` → `TodoList` → `TodoItem`). That is
not enough passing to need Context. State that only one component cares about
stays in that component: what you are typing lives in `TodoCreate` and
`TodoEdit`, and whether a card is showing its edit form or playing its video
lives in `TodoItem`. The one exception is `showCreate` (is the assign form
open?), which lives in `App` because the `+` button in the nav and the form are
siblings, so their shared parent has to own it.

## Developer checklist — before

What I expected adding the video field would take:

- add a video dropdown to the add form
- send the video to the server when an exercise is added
- show the video on the exercise card

## Developer checklist — after

What it actually took:

1. Made a video library (`video-library.js`) listing the clinic's four demo
   videos. Each exercise saves the video's short name, not the full link.
2. Built one dropdown component (`VideoSelect`) shared by both forms. "No video"
   is saved as an empty value.
3. Added the dropdown to the add form (`TodoCreate`) and cleared it after each
   add.
4. Sent the video in the POST request when an exercise is created.
5. **Added the dropdown to the edit form too** (`TodoEdit`), starting from the
   exercise's current video.
6. **Sent the video with every edit.** PUT replaces the whole record, so
   leaving the video out of the request would erase it.
7. **Handled exercises that have no video field at all** (older rows in
   `db.json`). They show a placeholder image instead of breaking.
8. Showed the video on the card: a YouTube thumbnail that plays the video when
   tapped, or the placeholder if there is none.
9. **Stopped the page reloading every time json-server saved `db.json`** — a
   one-line setting in `vite.config.js`.
10. **Showed an error message when a save fails** because the server is not
    running, instead of silently doing nothing.

## What I forgot

Everything in bold above. The edit form, the PUT request and the rows without
the field are exactly the three the brief warned about. The page reloading and
the silent failures I only found by actually using the app with the server
running and then stopped.

## With another week

- The **patient portal** side: the same plan, read-only for the patient, where
  they check exercises off themselves
- **Sets and reps** for each exercise (the design already shows them)
- More than one patient, with a patient picker
- Letting the clinic upload its own demo videos instead of using YouTube

## Credits

Design: my own Figma file for CEM Physical Therapy. Demo videos embedded from
YouTube: University Orthopedics, Ask Doctor Jo, MedStar Health and Physical
Therapy First.
