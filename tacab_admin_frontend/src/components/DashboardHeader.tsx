import { Theme } from './ui/mode-toggle'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { logout } from '@/pages/redux/auth/login.slice'

const DashboardHeader = () => {
  const login = JSON.parse(localStorage.getItem('login')!)
  const dispatch = useDispatch()

  return (
    <header className='flex bg-white dark:bg-gray-950 rounded-lg p-3 justify-between items-center'>
      <Theme />

      <div className='flex gap-2'>
        <Popover>
          <PopoverTrigger>
            <Avatar className='cursor-pointer'>
              <AvatarImage src={login?.img} />
              <AvatarFallback>{login?.[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <Button
              onClick={() => {
                window.location.reload()
                dispatch(logout())
              }}
              variant={'destructive'}
              className='cursor-pointer'
            >
              Logout
            </Button>
          </PopoverContent>
        </Popover>
        <div className='flex flex-col'>
          <small className='font-bold'>{login?.name}</small>
          <small className='text-[10px]'>{login?.role}</small>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
