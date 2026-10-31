const ExerciseVideo = (props) => {
  const {video} = props

  return (
    <div className="mt-4">
      {/* YouTube refuses to play embeds that do not say which site they are
          on (Error 153), so the referrer policy has to allow that */}
      <iframe
        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
        title={`${video.label} demo video`}
        allow="autoplay; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="aspect-video w-full rounded-2xl"
      />
      <a
        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-xs font-bold text-brand"
      >
        Not playing? Watch on YouTube
      </a>
    </div>
  )
}

export default ExerciseVideo
