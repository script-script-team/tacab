import Logo from './ui/Logo'
import { Theme } from './ui/mode-toggle'

function Header() {
  return (
    <div className='w-full z-10 p-2 flex justify-between items-center bg-gray-900'>
      <Logo />
      <Theme />
    </div>
  )
}

export default Header
