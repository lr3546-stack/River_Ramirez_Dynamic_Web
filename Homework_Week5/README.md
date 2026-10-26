# Homework — Week 5

## `memory-game/`

- **My own artwork** — four puppy photos from Unsplash, cropped square, in
  `src/assets/`. Only the imports and the `cardImages` array changed.
  Photos by [Karsten Winegeart](https://unsplash.com/@_karsten),
  [Ben Owen](https://unsplash.com/@circleb),
  [Rafael Forseck](https://unsplash.com/@jpeg_therapy) and
  [Charles Betito Filho](https://unsplash.com/@cbetito) on
  [Unsplash](https://unsplash.com/s/photos/puppy).
- **Best score** — the lowest number of turns for a win this session, shown
  under the turn counter. It updates in a `useEffect` watching `won`, and New
  Game does not reset it.

## `image-search/`

- **Photographer credit** under each photo, linking to their Unsplash profile
  (`user.name`, `user.links.html`), opening in a new tab.
- **A heading** that says what term the results are for.
- **A default search on load** (`pasta`) in a `useEffect` with `[]`.

The answers to the dependency-array questions are at the top of
`memory-game/src/components/Grid.jsx` and `image-search/src/App.jsx`.

## Running

```bash
cd memory-game   # or image-search
npm install
npm run dev
```

The image search needs an Unsplash key. Copy `.env.example` to `.env.local`
and put your key in it. `.env.local` is gitignored and never committed.
