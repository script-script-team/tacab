import type { IAdminProp } from '@/pages/types/admin.types'
import { BadgeCheck } from 'lucide-react'
import { DeleteAlert } from './DeleteAlert'
import CustomAvatar from './CustomAvatar'
import { AdminInfoDialog } from './AdminInfoDialog'
import { UpdateAdminDialog } from './UpdateAdminDialog'
import { Badge } from './Badge'

export const AdminDashboard = ({ admin }: { admin: IAdminProp }) => {
  const iconSize = 20
  const iconsStyle =
    'text-white flex justify-center py-2 rounded-md hover:opacity-80 transition'

  return (
    <div className='bg-gray-200 dark:bg-gray-800 rounded-md p-5'>
      <div className='flex gap-5 items-center'>
        <div className='w-10 h-10 rounded-full'>
          <CustomAvatar name={admin.name} />
        </div>
        <div>
          <h1 className='font-semibold text-lg flex gap-2 items-center'>
            {admin.name}
            {admin.main_admin ? <BadgeCheck size={18} /> : null}
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            {admin.email}
          </p>
          <div className='mt-2'>
            <Badge variant='success' text={admin.role} />
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center gap-5 mt-8'>
        <button className={`flex-1 ${iconsStyle} bg-blue-500`}>
          <UpdateAdminDialog iconSize={iconSize} admin={admin} />
        </button>
        <button className={`flex-1 ${iconsStyle} bg-red-500`}>
          <DeleteAlert iconSize={iconSize} id={admin.id} />
        </button>
        <button className={`flex-1 ${iconsStyle} bg-green-500`}>
          <AdminInfoDialog iconSize={iconSize} admin={admin} />
        </button>
      </div>
    </div>
  )
}
