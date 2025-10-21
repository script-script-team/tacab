import type { IAdminDashboardProp } from '@/pages/types/admin.types'
import { Eye, Pencil, Trash } from 'lucide-react'

export const AdminDashboard = ({ name, email, img }: IAdminDashboardProp) => {
  const iconSize = 20
  const iconsStyle =
    'text-white flex justify-center py-2 rounded-md hover:opacity-80 transition'

  return (
    <div className='bg-gray-200 dark:bg-gray-800 rounded-md p-5'>
      <div className='flex gap-5 items-center'>
        <img src={img} alt={name} className='w-10 h-10 rounded-full' />
        <div>
          <h1 className='font-semibold text-lg'>{name}</h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>{email}</p>
        </div>
      </div>
      <div className='flex justify-between items-center gap-5 mt-8'>
        <button className={`flex-1 ${iconsStyle} bg-blue-500`}>
          <Pencil size={iconSize} />
        </button>
        <button className={`flex-1 ${iconsStyle} bg-red-500`}>
          <Trash size={iconSize} />
        </button>
        <button className={`flex-1 ${iconsStyle} bg-green-500`}>
          <Eye size={iconSize} />
        </button>
      </div>
    </div>
  )
}
