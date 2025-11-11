import SidePar from '@/components/SidePar'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import type { RootState } from '../redux/store'
import DashboardHeader from '@/components/DashboardHeader'

function Dashboard() {
  const isAdmin = useSelector((state: RootState) => state.loginSlice.admin)

  return !isAdmin ? null : (
    <div className='p-4 bg-gray-200 dark:bg-gray-700 flex gap-4 md:flex-row lg:flex-row xl:flex-row sm:flex-col xs:flex-col'>
      <SidePar />
      <div className='w-full min-h-[95vh] h-full flex flex-col gap-2 rounded-lg overflow-hidden'>
        <DashboardHeader />
        <div className='flex w-full h-full gap-2 xs:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row flex-1'>
          <div className='w-full flex flex-col gap-2 flex-1 h-full'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
