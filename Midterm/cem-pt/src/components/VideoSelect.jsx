import {VIDEO_LIBRARY} from '../video-library'

// Used by both the create form and the edit form. It owns no state: the form
// that uses it passes the value in and hears about changes through onChange.
const VideoSelect = (props) => {
  const {value, onChange} = props

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
    >
      {/* '' means "no video", so it is different from a missing field */}
      <option value="">No video</option>
      {VIDEO_LIBRARY.map((video) => (
        <option key={video.value} value={video.value}>
          {video.label}
        </option>
      ))}
    </select>
  )
}

export default VideoSelect
