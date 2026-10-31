import imagePlaceholder from '../assets/icons/image-placeholder.svg'
import playCircle from '../assets/icons/play-circle.svg'
import playTriangle from '../assets/icons/play-triangle.svg'
import doneCircle from '../assets/icons/done-circle.svg'
import doneCheck from '../assets/icons/done-check.svg'

const ExerciseThumbnail = (props) => {
  const {video, done, onClick} = props

  // no video picked: the grey placeholder from the design
  if (!video) {
    return (
      <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-slate-100">
        <img src={imagePlaceholder} alt="" />
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      aria-label={`Play ${video.label} demo`}
      className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100"
    >
      <img
        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
        alt=""
        className="size-full object-cover"
      />
      <span
        className={`absolute inset-0 flex items-center justify-center ${
          done ? 'bg-brand/20' : 'bg-black/10'
        }`}
      >
        {/* each icon is two layers in the Figma file, stacked here */}
        <span className="relative flex size-10 items-center justify-center drop-shadow">
          <img src={done ? doneCircle : playCircle} alt="" className="absolute" />
          <img
            src={done ? doneCheck : playTriangle}
            alt=""
            className={done ? 'absolute' : 'absolute ml-0.5'}
          />
        </span>
      </span>
    </button>
  )
}

export default ExerciseThumbnail
