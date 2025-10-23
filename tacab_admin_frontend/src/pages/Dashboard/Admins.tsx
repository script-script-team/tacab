import { AdminDashboard } from '@/components/AdminDashboard'
import Loading from '@/components/Loading'
import { NewAdminDialog } from '@/components/NewAdminDialog'
import { useGetAllAdmins } from '@/react-query/admin.hooks'

function Admins() {
  const { data, isLoading } = useGetAllAdmins()
  return (
    <div className='w-full p-3 flex flex-col bg-white dark:bg-gray-950 rounded-lg h-full'>
      <div className='flex justify-end'>
        <NewAdminDialog />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
          {data?.admins.map((admin, index) => (
            <AdminDashboard admin={admin} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Admins
