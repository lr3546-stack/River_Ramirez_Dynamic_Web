import {GoBell, GoTrash} from 'react-icons/go'
import Button from '../components/Button'

const ButtonPage = () => {
  return (
    <>
      <h1 className="text-3xl mb-4">Button Page!</h1>
      <div className="mb-2">
        <Button primary onClick={() => console.log('CLICK!')}>
          <GoBell />
          Buy Now
        </Button>
      </div>
      <div className="mb-2">
        <Button secondary rounded>Secondary Button</Button>
      </div>
      <div className="mb-2">
        <Button danger>
          <GoTrash />
          Delete
        </Button>
      </div>
      <div className="mb-2">
        <Button warning outline rounded>Are you sure?</Button>
      </div>
      <div className="mb-2">
        <Button success outline>Success</Button>
      </div>

      <h2 className="text-2xl mt-8 mb-4">Sizes</h2>
      <div className="mb-2">
        <Button primary small>Small Primary</Button>
      </div>
      <div className="mb-2">
        <Button secondary>Default Secondary</Button>
      </div>
      <div className="mb-2">
        <Button danger large rounded>
          <GoTrash />
          Large Danger
        </Button>
      </div>
      <div className="mb-2">
        <Button success outline small rounded>Small Success Outline</Button>
      </div>
    </>
  )
}

export default ButtonPage
