import { Theme } from '@/components/mode-toggle'
import Logo from '@/components/ui/Logo'
import { Button } from './ui/button'
import { IoIosLogOut } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/redux/store'
import { clearResult } from '@/redux/result.slice'
import { useNavigate } from 'react-router-dom'

function Header() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  return (
    <div className='w-full fixed z-10 py-4 bg-gray-200 dark:bg-gray-800/70 backdrop-blur-3xl shadow-md'>
      <div className='w-[90%] mx-auto  flex justify-between items-center'>
        <Logo />

        <div className='flex gap-2 justify-between items-center'>
          <Button
            onClick={() => {
              dispatch(clearResult())
              navigate('/result')
            }}
            className='cursor-pointer text-white bg-red-600 hover:bg-red-500'
          >
            <IoIosLogOut />
            Logout
          </Button>

          <Theme />
        </div>
      </div>
    </div>
  )
}

export default Header
