# CEM Physical Therapy — Midterm Presentation

Slides in Figma: https://www.figma.com/slides/RImCGO5EBrQnhIMzBcaijx

---

## 1. Title

**CEM Physical Therapy**
Physical Therapy recovery application

River Ramirez · Dynamic Web Applications

---

## 2. Portfolio Project

---

## 3. Pitch

A digital recovery plan that physical therapists can build for their patient —
every exercise comes with a video for the patient's take-home reference.

- **Who:** physical therapists and their patients
- **Problem:** patients forget how to do their exercises once they leave the clinic
- **Fix:** each assigned exercise carries its own demo video

---

## 4. The field

**The field it produced:** `video`

A dropdown selection of the clinic's demo videos that can be saved with each
exercise. It can be played from the card and edited or swapped.

---

## 5. Developer checklist

What it actually took (10 steps — **forgot** marked):

1. A video library of the clinic's 4 demo videos
2. One shared dropdown (`VideoSelect`) for both forms
3. Dropdown in the add form, cleared after each add
4. Send the video in the POST request
5. **Dropdown in the edit form too** — forgot
6. **Send the video with every edit — PUT replaces** — forgot
7. **Handle old exercises with no video field** — forgot
8. Show it on the card: thumbnail + player
9. **Stop the page reloading when `db.json` saves** — forgot
10. **Show an error when a save fails** — forgot

---

## 6. Live demo

---

## 7. Code walkthrough

1. **Form** — `TodoCreate.jsx`: `const [video, setVideo] = useState('')`
2. **Server** — `api.js`: `axios.post(`${BASE}/todos`, {title, done: false, video})`
3. **Edit** — `TodoEdit.jsx` · `App.jsx`: `useState(todo.video || '')` … `video: newVideo`
4. **Card** — `TodoItem.jsx`: `const video = findVideo(todo.video)`

---

## 8. Thank you
