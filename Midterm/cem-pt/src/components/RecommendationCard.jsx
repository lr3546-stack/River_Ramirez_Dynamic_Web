import sparkle from '../assets/icons/sparkle-large.svg'

const RecommendationCard = () => {
  return (
    <section className="flex items-center gap-4 rounded-[28px] bg-brand p-5 shadow-[0px_10px_15px_-3px_rgba(45,59,158,0.2),0px_4px_6px_-4px_rgba(45,59,158,0.2)]">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-lime shadow-[0px_10px_15px_-3px_rgba(193,255,51,0.3),0px_4px_6px_-4px_rgba(193,255,51,0.3)]">
        <img src={sparkle} alt="" />
      </span>
      <div>
        <h3 className="text-[11px] font-extrabold uppercase tracking-[1.1px] text-lime">
          Your note to River
        </h3>
        <p className="text-xs font-medium leading-[19.5px] text-blue-100">
          Start with <span className="text-white">mobility</span>, then
          progress to{' '}
          <span className="text-white">controlled strengthening</span>.
        </p>
      </div>
    </section>
  )
}

export default RecommendationCard
