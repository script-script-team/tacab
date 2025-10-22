import { Theme } from './ui/mode-toggle'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Avatar } from './ui/avatar'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/pages/redux/auth/login.slice'
import type { RootState } from '@/pages/redux/store'
import CustomAvatar from './CustomAvatar'

const DashboardHeader = () => {
  const admin = useSelector((state: RootState) => state.loginSlice.admin)
  const dispatch = useDispatch()

  return (
    <header className='flex bg-white dark:bg-gray-950 rounded-lg p-3 justify-between items-center'>
      <Theme />

      <div className='flex gap-2'>
        <Popover>
          <PopoverTrigger>
            <Avatar className='cursor-pointer'>
              <CustomAvatar name={admin.name} />
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
          <small className='font-bold'>{admin.name}</small>
          <small className='text-[10px]'>{admin.email}</small>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
