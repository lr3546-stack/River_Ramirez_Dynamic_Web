import {useState} from 'react'
import VideoSelect from './VideoSelect'

const TodoCreate = (props) => {
  const {onCreate} = props
  // the form's values live here -- this component owns them, because nobody
  // else needs to know what you are halfway through filling in
  const [title, setTitle] = useState('')
  const [video, setVideo] = useState('')

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate(title, video)
    // clear the form. This is only possible BECAUSE the inputs are controlled.
    setTitle('')
    setVideo('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-2 rounded-[28px] border border-slate-100 bg-white p-4 shadow-sm"
    >
      <h3 className="w-full text-sm font-bold text-brand">
        Assign an exercise to River
      </h3>
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="Exercise name"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
      />
      <div className="flex-1">
        <VideoSelect value={video} onChange={setVideo} />
      </div>
      <button className="rounded-xl bg-brand px-5 py-2 font-semibold text-white">
        Assign
      </button>
    </form>
  )
}

export default TodoCreate
