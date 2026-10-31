import {useState} from 'react'
import TodoEdit from './TodoEdit'
import ExerciseThumbnail from './ExerciseThumbnail'
import ExerciseVideo from './ExerciseVideo'
import {findVideo} from '../video-library'
import checkGray from '../assets/icons/check-gray.svg'
import checkDark from '../assets/icons/check-dark.svg'

const TodoItem = (props) => {
  const {todo, onDelete, onEdit, onToggle} = props
  // these belong here. Whether this card is showing its edit form or playing
  // its video is nobody else's business -- App does not care, the other
  // cards do not care.
  const [showEdit, setShowEdit] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const video = findVideo(todo.video)

  const handleDelete = () => {
    onDelete(todo.id)
  }

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = (id, newTitle, newVideo) => {
    onEdit(id, newTitle, newVideo)
    // close the form once the edit has gone up
    setShowEdit(false)
  }

  const handleToggle = () => {
    // send the OPPOSITE of what it is now
    onToggle(todo.id, !todo.done)
  }

  const handleThumbnailClick = () => {
    setShowVideo(!showVideo)
  }

  if (showEdit) {
    return (
      <div className="rounded-[28px] border border-slate-100 bg-white p-4 shadow-sm">
        <TodoEdit todo={todo} onSubmit={handleSubmit} />
      </div>
    )
  }

  return (
    <div
      className={`rounded-[28px] border bg-white p-4 shadow-sm ${
        todo.done ? 'border-lime/30' : 'border-slate-100'
      }`}
    >
      <div className="flex items-start gap-4">
        <ExerciseThumbnail
          video={video}
          done={todo.done}
          onClick={handleThumbnailClick}
        />

        <div className="flex flex-1 flex-col justify-between self-stretch py-0.5">
          <div>
            <h4 className="text-sm font-bold text-slate-800">{todo.title}</h4>
            <p className="text-[11px] font-semibold text-slate-400">
              {video ? `Demo video: ${video.label}` : 'No demo video attached'}
            </p>
          </div>
          <div className="flex gap-2 text-[11px] font-bold">
            <button
              onClick={handleEditClick}
              className="rounded-full bg-slate-100 px-3 py-1 text-brand"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="rounded-full bg-red-50 px-3 py-1 text-red-600"
            >
              Remove
            </button>
          </div>
        </div>

        <button
          onClick={handleToggle}
          aria-label={todo.done ? 'Mark not completed' : 'Mark completed'}
          className={`flex size-9 shrink-0 cursor-pointer items-center justify-center self-center rounded-full ${
            todo.done ? 'bg-lime' : 'border-2 border-slate-100'
          }`}
        >
          <img src={todo.done ? checkDark : checkGray} alt="" />
        </button>
      </div>

      {showVideo && video && <ExerciseVideo video={video} />}
    </div>
  )
}

export default TodoItem
