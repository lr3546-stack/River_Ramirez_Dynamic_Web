# Homework — Week 7

## `memory-game/`

The finished game, carried on from my Week 5 version (same artwork and best
score). Puppy photos by
[Karsten Winegeart](https://unsplash.com/@_karsten),
[Ben Owen](https://unsplash.com/@circleb),
[Rafael Forseck](https://unsplash.com/@jpeg_therapy) and
[Charles Betito Filho](https://unsplash.com/@cbetito) on
[Unsplash](https://unsplash.com/s/photos/puppy).

- **Win state** — when every card is matched, the screen says how many turns
  it took.
- **New Game clears it** — `shuffleCards` resets `won` and the turn counter.

The three questions (what the win check watches, what stops a win on an empty
board, and why the match comparison can't live in `handleChoice`) are answered
at the top of `src/components/Grid.jsx`.

The midterm part of this week's homework is not included here.

## Running

```bash
cd memory-game
npm install
npm run dev
```
