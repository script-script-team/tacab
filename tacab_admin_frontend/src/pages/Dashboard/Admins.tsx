import { AdminDashboard } from '@/components/AdminDashboard'
import DashboardHeader from '@/components/DashboardHeader'
import Loading from '@/components/Loading'
import { useGetAllAdmins } from '@/react-query/admin.hooks'

function Admins() {
  const { data, isLoading } = useGetAllAdmins()

  return (
    <div className='w-full min-h-[95vh] h-full flex flex-col gap-2 rounded-lg overflow-hidden'>
      <DashboardHeader />

      <div className='flex w-full h-full gap-2 xs:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row flex-1'>
        <div className='w-full flex flex-col gap-2 flex-1 min-h-[80vh]'>
          <div className='w-full p-3 flex flex-col bg-white dark:bg-gray-950 rounded-lg h-full'>
            {isLoading ? (
              <Loading />
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {data?.admins.map((admin, index) => (
                  <AdminDashboard
                    name={admin.name}
                    email={admin.email}
                    key={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admins
