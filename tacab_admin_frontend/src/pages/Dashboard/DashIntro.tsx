import { Avatar } from '@/components/ui/avatar'
import { Statistics } from '@/components/ui/Statistics'
import Count from 'react-countup'
import { DollarSign, FileText, UserLock, Users } from 'lucide-react'
import { useGetDashboardSummary } from '@/react-query/dashboard.hooks'
import CustomAvatar from '@/components/CustomAvatar'
import Loading from '@/components/Loading'
import { Link } from 'react-router-dom'
import QuickTasks from '@/components/QuickTasks'
import AllPayment from '@/components/AllPayment'
import { Button } from '@/components/ui/button'
import { ToatalIncome } from '@/components/income'

function DashIntro() {
  const { data, isLoading } = useGetDashboardSummary()
  const iconSize = 20

  const totalStudents = data?.data.totalStudents
  const totalUploads = data?.data.totalUploads
  const totalAdmins = data?.data.totalAdmins
  const totalPayments = data?.data.totalPayments
  // const recentUploads = data?.data.recentUploads
  const admins = data?.data.admins

  const dashboardItems = [
    {
      icons: Users,
      color: 'text-blue-500',
      text: 'Students',
      value: totalStudents,
    },
    {
      icons: FileText,
      color: 'text-yellow-500',
      text: 'Uploads',
      value: totalUploads,
    },
    {
      icons: UserLock,
      color: 'text-orange-500',
      text: 'Admins',
      value: totalAdmins,
    },
    {
      icons: DollarSign,
      color: 'text-green-500',
      text: 'Payments',
      value: totalPayments,
    },
  ]

  return (
    <div className='w-full min-h-[95vh] flex flex-col gap-2 rounded-lg overflow-hidden'>
      <div className='flex w-full gap-2 xs:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row'>
        <div className='w-full flex flex-col gap-2'>
          <div className='w-full p-3 flex flex-col bg-white dark:bg-gray-950 rounded-lg'>
            {isLoading ? (
              <Loading />
            ) : (
              <div className='flex justify-between text-center'>
                {dashboardItems.map((item, index) => (
                  <div className='flex flex-col items-center' key={index}>
                    <item.icons size={iconSize} />
                    <Count
                      start={0}
                      end={item.value || 0}
                      className={`font-bold ${item.color} text-2xl`}
                    />
                    <h2>{item.text}</h2>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='w-full flex gap-2 bg-white dark:bg-gray-950 rounded-lg'>
            <Statistics />
          </div>
        </div>

        <div className='xs:w-full sm:w-full md:w-[50%] lg:w-[50%] xl:w-[50%] flex flex-col gap-2'>
          <ToatalIncome />
          <QuickTasks />
          <div className='rounded-lg bg-white dark:bg-gray-950 p-4 flex flex-col gap-16 flex-1'>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between'>
                <h2 className='text-gray-400 font-medium'>Admins:</h2>
                <Link to={'/admins'}>
                  <h2 className='text-blue-600 hover:text-blue-400 hover:underline cursor-pointer'>
                    See all
                  </h2>
                </Link>
              </div>
              <div className='flex flex-col gap-2'>
                {admins?.map((a, i) => {
                  return (
                    <div
                      key={i}
                      className='flex justify-between p-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800 duration-100 items-center'
                    >
                      <div className='flex gap-2'>
                        <Avatar>
                          <CustomAvatar name={a.name} />
                        </Avatar>
                        <div className='flex flex-col'>
                          <small className='font-bold'>{a.name}</small>
                          <small>{a.email}</small>
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <small className='font-bold text-cyan-700'>Admin</small>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-lg bg-white dark:bg-gray-950 p-4 space-y-2'>
        <h3 className='text-gray-400 font-medium'>Recent Payments:</h3>
        <AllPayment page={1} />
        <Link to={'/payment'}>
          <Button className='float-right' variant={'link'}>
            Show more
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default DashIntro
