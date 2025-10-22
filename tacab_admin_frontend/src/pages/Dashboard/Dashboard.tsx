import SidePar from '@/components/SidePar'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import type { RootState } from '../redux/store'

function Dashboard() {
  const isAdmin = useSelector((state: RootState) => state.loginSlice.admin)

  return !isAdmin ? null : (
    <div className='p-4 bg-gray-200 dark:bg-gray-700 flex gap-4 md:flex-row lg:flex-row xl:flex-row sm:flex-col xs:flex-col'>
      <SidePar />
      <Outlet />
    </div>
  )
}

export default Dashboard
