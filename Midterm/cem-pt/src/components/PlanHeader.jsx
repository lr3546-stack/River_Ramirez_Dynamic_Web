const PlanHeader = (props) => {
  const {percent} = props

  return (
    <header className="bg-white px-6 pt-10 pb-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.6px] text-slate-400">
        Therapist view · Dr. Stephen Fong, PT
      </p>
      <h1 className="text-2xl font-extrabold text-brand">
        River's Recovery Plan
      </h1>
      <p className="text-[13px] font-medium text-slate-400">
        Exercises you assign here show up in River's patient portal.
      </p>

      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-xs text-brand">
          <span className="font-bold uppercase tracking-[0.6px]">
            Patient Progress
          </span>
          <span className="font-extrabold">{percent}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
          {/* the width is data, so it is an inline style, not a class */}
          <div
            className="h-full rounded-full bg-lime shadow-[0px_0px_8px_0px_rgba(193,255,51,0.5)]"
            style={{width: `${percent}%`}}
          />
        </div>
      </div>
    </header>
  )
}

export default PlanHeader
