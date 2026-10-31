import homeIcon from '../assets/icons/nav-home.svg'
import scheduleIcon from '../assets/icons/nav-schedule.svg'
import progressIcon from '../assets/icons/nav-progress.svg'
import profileIcon from '../assets/icons/nav-profile.svg'
import plusIcon from '../assets/icons/plus.svg'

const NavItem = (props) => {
  const {icon, label} = props

  return (
    <span className="flex flex-col items-center gap-1">
      <img src={icon} alt="" />
      <span className="text-[10px] font-medium text-slate-400">{label}</span>
    </span>
  )
}

const BottomNav = (props) => {
  const {onAddClick} = props

  return (
    <nav className="fixed bottom-0 left-1/2 flex h-16 w-full max-w-[430px] -translate-x-1/2 items-center justify-between border-t border-slate-100 bg-white px-6">
      <NavItem icon={homeIcon} label="Home" />
      <NavItem icon={scheduleIcon} label="Schedule" />

      {/* the raised lime button opens the assign-exercise form */}
      <div className="relative h-6 w-14">
        <button
          onClick={onAddClick}
          aria-label="Assign exercise"
          className="absolute -top-8 left-0 flex size-14 items-center justify-center rounded-full bg-lime shadow-[0px_10px_15px_-3px_rgba(193,255,51,0.4),0px_4px_6px_-4px_rgba(193,255,51,0.4)]"
        >
          <img src={plusIcon} alt="" />
        </button>
      </div>

      <NavItem icon={progressIcon} label="Progress" />
      <NavItem icon={profileIcon} label="Profile" />
    </nav>
  )
}

export default BottomNav
