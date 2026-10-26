import Tabs from '../components/Tabs'

// the data lives in the page, not in the reusable component
const ITEMS = [
  {
    id: 'sauce',
    label: 'The Sauce',
    content:
      'Brown the lamb, cook the soffritto slowly, then reduce the red wine before the tomato and stock go in.',
  },
  {
    id: 'slow-cook',
    label: 'Slow Cook',
    content:
      'Simmer gently with the lid on for 2 hours, shred the lamb, then reduce uncovered for another 30 minutes.',
  },
  {
    id: 'pasta',
    label: 'The Pasta',
    content:
      'Pappardelle is the classic. Cook it a minute short and toss it through the ragu with a splash of pasta water.',
  },
]

const TabsPage = () => {
  return (
    <div>
      <h1 className="text-3xl mb-4">Tabs Page</h1>
      <Tabs items={ITEMS} />
    </div>
  )
}

export default TabsPage
