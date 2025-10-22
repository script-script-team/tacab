import { AdminDashboard } from '@/components/AdminDashboard'
import Loading from '@/components/Loading'
import { useGetAllAdmins } from '@/react-query/admin.hooks'

function Admins() {
  const { data, isLoading } = useGetAllAdmins()

  return (
    <div className='w-full p-3 flex flex-col bg-white dark:bg-gray-950 rounded-lg h-full'>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {data?.admins.map((admin, index) => (
            <AdminDashboard name={admin.name} email={admin.email} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Admins
