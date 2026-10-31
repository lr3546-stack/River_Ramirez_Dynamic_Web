import {useState} from 'react'
import VideoSelect from './VideoSelect'

const TodoEdit = (props) => {
  const {todo, onSubmit} = props
  // start the inputs at the exercise's CURRENT values, so editing means
  // changing what is there rather than retyping it. Older exercises have no
  // video field, so fall back to '' ("No video").
  const [title, setTitle] = useState(todo.title)
  const [video, setVideo] = useState(todo.video || '')

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(todo.id, title, video)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 py-3">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
      />
      <div className="flex-1">
        <VideoSelect value={video} onChange={setVideo} />
      </div>
      <button className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white">
        Save
      </button>
    </form>
  )
}

export default TodoEdit
