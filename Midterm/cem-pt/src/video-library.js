// The clinic's demo videos. An exercise saves the `value`, not the url, so if
// a video ever changes, only this file needs updating.
export const VIDEO_LIBRARY = [
  {value: 'glute-bridges', label: 'Glute Bridges', youtubeId: 'PusbZuBgeug'},
  {value: 'prone-leg-lifts', label: 'Prone Leg Lifts', youtubeId: 'kxmIfSC9aUk'},
  {value: 'clamshells', label: 'Clamshells', youtubeId: '39vuP5xozsI'},
  {value: 'wall-squats', label: 'Wall Squats', youtubeId: 'vujBdEdSj5M'},
]

// older exercises have no video field at all, and '' means "no video" --
// either way this returns undefined
export const findVideo = (value) => {
  return VIDEO_LIBRARY.find((video) => video.value === value)
}
