import {useState} from 'react'

import styles from './RecipeCard.module.css'

export default function InstructionsList(props) {
  const {instructions} = props

  // Only this list cares whether its steps are showing, so the state lives here.
  const [showSteps, setShowSteps] = useState(true)

  const handleToggleClick = () => {
    setShowSteps(!showSteps)
  }

  return (
    <div className={styles.instructions_list}>
      <h3 className={styles.list_title}>Instructions</h3>
      <button onClick={handleToggleClick} className={styles.toggle_btn}>
        {showSteps ? 'Hide steps' : 'Show steps'}
      </button>
      {showSteps && (
        <ol>
          {instructions.map((i, index) => (
            <li key={index}>{i}</li>
          ))}
        </ol>
      )}
    </div>
  )
}
