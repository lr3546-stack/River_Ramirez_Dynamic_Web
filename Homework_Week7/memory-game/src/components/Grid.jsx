/*
  Week 7 HW: finishing the game
  - Which piece of state does the win check watch, and why?
    `cards`. A win happens the moment the last pair gets `matched: true`, and
    the only thing that changes when a pair matches is the cards array.
    Watching turns or the choices would check at the wrong moments.
  - What stops it declaring a win on an empty board?
    `cards.length > 0`. Before the first New Game the deck is [], and
    [].every(...) is true for an empty array -- so without the length check
    it would say "you won" before anyone played.
  - Why can't the match comparison live in handleChoice?
    setChoiceTwo(card) doesn't change choiceTwo right away -- the update is
    queued until the next render. Inside handleChoice, choiceTwo is still the
    old value (null). The useEffect on [choiceOne, choiceTwo] runs after that
    render, when both choices really are in state, so it can compare them.
  - New Game clears the win with setWon(false) in shuffleCards.
*/
import {useState, useEffect} from 'react'
import Card from './Card'
// photos from Unsplash -- photographer credits are in the README
import Frenchie from '../assets/puppy-frenchie.jpg'
import Lab from '../assets/puppy-lab.jpg'
import Dalmatian from '../assets/puppy-dalmatian.jpg'
import Pomeranian from '../assets/puppy-pomeranian.jpg'

const cardImages = [
  {src: Frenchie},
  {src: Lab},
  {src: Dalmatian},
  {src: Pomeranian},
]

const Grid = () => {
  // the deck lives in state, because the board has to change when somebody
  // clicks New Game
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [turns, setTurns] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [won, setWon] = useState(false)
  // null until somebody wins a game this session
  const [bestScore, setBestScore] = useState(null)

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      // sort calls this for pairs of items. A negative number leaves them
      // alone, a positive number swaps them -- so a random one shuffles.
      .sort(() => Math.random() - 0.5)
      // every card needs its own id: there are two of each image now, so
      // `src` no longer tells the two copies apart
      .map((card) => ({...card, id: crypto.randomUUID()}))

    setCards(shuffled)
    setTurns(0)
    setWon(false)
  }

  const handleChoice = (card) => {
    // a guard clause: get the impossible clicks out of the way first, so the
    // real logic underneath only ever runs on a legal move
    if (disabled || card === choiceOne || card.matched) {
      return
    }
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    // the updater form again: the next value is built from the previous one
    setTurns((prevTurns) => prevTurns + 1)
  }

  // a second effect, watching a different piece of state. `cards` changes
  // when a pair is matched, so that is when this needs to check.
  // cards.length > 0 keeps it from declaring a win on the empty board.
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setWon(true)
    }
  }, [cards])

  // lower is better, so only replace the best score when this game beat it
  useEffect(() => {
    if (won) {
      setBestScore((prevBest) =>
        prevBest === null || turns < prevBest ? turns : prevBest
      )
    }
  }, [won])

  // [choiceOne, choiceTwo] = run this AFTER a render in which either of them
  // changed. By then the new values really are in state, so we can compare.
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        // the updater form: React hands us the current cards and we return
        // the new ones. Never edit `cards` directly -- build a new array.
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            }
            return card
          })
        })
        resetTurn()
      } else {
        // without the wait, the pair is compared and reset before the 0.6s
        // flip has finished -- nobody ever sees the second card
        setTimeout(() => resetTurn(), 1200)
      }
    }
  }, [choiceOne, choiceTwo])

  return (
    <>
      <button
        onClick={shuffleCards}
        className="bg-blue-900 text-white uppercase px-8 py-4 rounded-lg mb-6"
      >
        New Game
      </button>

      <p className="text-lg">Turns used: {turns}</p>
      <p className="mb-6 text-lg">
        Best score: {bestScore === null ? 'no wins yet' : `${bestScore} turns`}
      </p>

      {won && (
        <p className="mb-6 text-2xl font-bold text-green-700">
          You cleared the board in {turns} turns.
        </p>
      )}

      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </>
  )
}

export default Grid
