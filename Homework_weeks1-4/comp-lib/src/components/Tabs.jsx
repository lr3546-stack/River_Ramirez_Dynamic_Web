import {useState} from 'react'
import cx from 'classnames'
import Panel from './Panel'

/*
  The five questions, before any code:
  1. User flow: a user clicks a tab label and that tab's content shows,
     replacing whatever was showing before.
  2. Action vs change on screen: the click is an event handler. Which tab is
     highlighted and which content shows is state.
  3. Smallest thing to store: one tab is always open, so a single index.
  4. Name it: activeIndex, and handleClick for the handler.
  5. Where does it live? Nothing outside the tabs needs to know, so it lives
     here in Tabs -- same as the Accordion.
*/
const Tabs = (props) => {
  const {items} = props

  // unlike the Accordion, one tab is always open, so start on the first
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (index) => {
    setActiveIndex(index)
  }

  const renderedTabs = items.map((item, index) => {
    const isActive = index === activeIndex

    return (
      <button
        key={item.id}
        onClick={() => handleClick(index)}
        className={cx('px-4 py-2 border-b-2 cursor-pointer', {
          'border-blue-500 text-blue-500 font-bold': isActive,
          'border-transparent text-gray-500': !isActive,
        })}
      >
        {item.label}
      </button>
    )
  })

  return (
    <div>
      <div className="flex gap-2">{renderedTabs}</div>
      <Panel className="p-5 mt-2">{items[activeIndex].content}</Panel>
    </div>
  )
}

export default Tabs
