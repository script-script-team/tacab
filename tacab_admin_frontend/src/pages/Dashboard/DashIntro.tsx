import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Statistics } from '@/components/ui/Statistics'
import Count from 'react-countup'
import { admins, Courses } from '../Example'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useEffect } from 'react'
import { toast } from 'sonner'
import DashboardHeader from '@/components/DashboardHeader'

function DashIntro() {
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit(value) {
      const data = {
        ...value,
      }
      console.log(data)
    },
    validationSchema: yup.object({
      text: yup
        .string()
        .min(1, 'text is too short')
        .max(20, 'text limit reach!'),
    }),
  })

  useEffect(() => {
    if (formik.touched.text && formik.errors.text) {
      toast.error(formik.touched.text && formik.errors.text)
    }
  }, [formik.touched.text, formik.errors.text])

  return (
    <div className='w-full min-h-[95vh] flex flex-col gap-2 rounded-lg overflow-hidden'>
      <DashboardHeader />

      <div className='flex w-full gap-2 xs:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row'>
        <div className='w-full flex flex-col gap-2'>
          <div className='w-full p-3 flex flex-col bg-white dark:bg-gray-950 rounded-lg'>
            <h2 className='font-medium text-gray-400'>Total:</h2>
            <div className='flex justify-between text-center'>
              <div className='flex flex-col'>
                <Count start={0} end={85} className='font-bold text-blue-500' />
                <h2>Students</h2>
              </div>
              <div className='flex flex-col'>
                <Count
                  start={0}
                  end={44}
                  className='font-bold text-green-500'
                />
                <h2>Uploads</h2>
              </div>
              <div className='flex flex-col'>
                <Count start={0} end={12} className='font-bold text-cyan-500' />
                <h2>Courses</h2>
              </div>
              <div className='flex flex-col'>
                <Count
                  start={0}
                  end={4}
                  className='font-bold text-orange-500'
                />
                <h2>Admins</h2>
              </div>
            </div>
          </div>

          <div className='w-full flex bg-white dark:bg-gray-950 rounded-lg'>
            <Statistics />
          </div>
        </div>

        <div className='xs:w-full sm:w-full md:w-[50%] lg:w-[50%] xl:w-[50%] rounded-lg bg-white dark:bg-gray-950 p-4 flex flex-col gap-16'>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
              <h2 className='text-gray-400 font-medium'>Recentely Courses:</h2>
              <h2 className='text-blue-600 hover:text-blue-400 hover:underline cursor-pointer'>
                See all
              </h2>
            </div>
            <div className='flex gap-2'>
              {Courses.slice(0, 3).map((c, i) => {
                return (
                  <div
                    key={i}
                    className='w-full hover:flex-5 flex-1 duration-500 cursor-pointer'
                  >
                    <img
                      className='w-full h-[20vh] rounded-lg object-cover'
                      src={`${c.pic}`}
                    />
                    <small>{c.name}</small>
                  </div>
                )
              })}
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
              <h2 className='text-gray-400 font-medium'>Recentely Admins:</h2>
              <h2 className='text-blue-600 hover:text-blue-400 hover:underline cursor-pointer'>
                See all
              </h2>
            </div>
            <div className='flex flex-col gap-2'>
              {admins.map((a, i) => {
                return (
                  <div
                    key={i}
                    className='flex justify-between p-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800 duration-100 items-center'
                  >
                    <div className='flex gap-2'>
                      <Avatar>
                        <AvatarImage src={`${a.img}`} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <small className='font-bold'>{a.name}</small>
                        <small>{a.email}</small>
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <small className='font-bold text-cyan-700'>
                        {a.role}
                      </small>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashIntro
