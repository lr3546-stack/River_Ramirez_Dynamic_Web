# Homework — Weeks 1 to 4

Each week builds on the one before. My recipe is
[Slow Cooked Rosemary Lamb Ragu](https://www.recipetineats.com/slow-cooked-lamb-ragu-pasta/)
from RecipeTin Eats.

## Week 1 — `Week01/`

A plain HTML recipe card: photo, title, description, ingredients list and
numbered instructions. Open `Week01/index.html` in the browser.

## Week 2 — `recipe-card/`

The HTML recipe converted to React and split into components (`Card`,
`RecipeImg`, `RecipeInfo`, `IngredientsList`, `InstructionsList`), all fed from
`recipe-data.js`.

- Styled with a CSS Module (`RecipeCard.module.css`) and shared variables in
  `global.css` (`--c-ragu`, `--c-rosemary`, `--c-cream`, `--radius`).
- The heart rating from class (`UserRating`).
- My own piece of state: a **Hide steps / Show steps** toggle in
  `InstructionsList`. Only the list cares whether its steps are showing, so the
  state lives there.

## Weeks 3 and 4 — `comp-lib/`

The component library, with every page on its own route.

- **Button `size` prop** — `small` and `large`, using the same `cx` object
  pattern as the colour variants. Demoed under "Sizes" on the Button page.
- **My own component: `Tabs`** (`src/components/Tabs.jsx`) — click a tab label
  to show its content. The five state-design questions are answered at the top
  of the file. The content box uses `Panel`.
- **Tabs page** at `/tabs`, with a `<Route>` in `App.jsx` and a `<Link>` in
  `NavBar.jsx`.
- **Escape closes the Dropdown and the Modal.** Both use a `keydown` listener
  in a `useEffect` with a cleanup. The Dropdown calls `setIsOpen(false)`
  because it owns its open state. The Modal calls `onClose` because the page
  owns it. The answers to the HW questions are at the top of `Dropdown.jsx`
  and `Modal.jsx`.

## Running a project

```bash
cd recipe-card   # or comp-lib
npm install
npm run dev
```
