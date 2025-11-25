import { Theme } from '@/components/mode-toggle'
import Logo from '@/components/ui/Logo'
import { Button } from './ui/button'
import { IoIosLogOut } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/redux/store'
import { clearResult } from '@/redux/result.slice'
import { useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from './ui/input'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useChangePassword } from '@/react-query/result.hooks'
import { useEffect } from 'react'
import { toast } from 'sonner'

function Header({ studentName, id }: { studentName: string; id: number }) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { mutate, isPending, isError, error, data } = useChangePassword()

  const formik = useFormik({
    initialValues: {
      id: id,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      const data = {
        ...values,
      }
      mutate(data)
    },
    validationSchema: yup.object({
      oldPassword: yup
        .string()
        .min(7, 'Old password must be at least 7 character')
        .max(100, 'Old password must be at most 1 character')
        .required('Old password is required'),
      newPassword: yup
        .string()
        .min(7, 'New password must be at least 7 character')
        .max(100, 'New password must be at most 1 character')
        .required('New password password is required'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Passowrds must match')
        .min(7, 'Confirm password must be at least 7 character')
        .max(100, 'Confirm password must be at most 100 character')
        .required('Confirm password is required'),
    }),
  })

  useEffect(() => {
    if (data?.ok) {
      formik.resetForm()
    }
    if (isError) {
      toast.error(error.message)
    }
  }, [isError, data?.ok])

  return (
    <div className='w-full fixed z-10 py-4 bg-gray-200 dark:bg-gray-800/70 backdrop-blur-3xl shadow-md'>
      <div className='w-[90%] mx-auto  flex justify-between items-center'>
        <Logo />

        <div className='flex gap-4 justify-between items-center'>
          <Popover>
            <PopoverTrigger>
              <div className='w-10 h-10 rounded-full bg-gray-500 text-white text-xl font-bold justify-center items-center flex cursor-pointer'>
                {studentName}
              </div>
            </PopoverTrigger>
            <PopoverContent className='grid gap-2'>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button className='cursor-pointer hover:underline'>
                    Change Password
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <form
                    onSubmit={formik.handleSubmit}
                    className='w-full grid gap-8'
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Manage your password and fill in the following
                        requirements below.
                      </AlertDialogTitle>
                      <AlertDialogDescription className='grid gap-4'>
                        <div className='grid'>
                          <Input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name='oldPassword'
                            value={formik.values.oldPassword}
                            placeholder='Last password'
                          />
                          <p className='text-red-500 font-bold'>
                            {formik.touched.oldPassword &&
                              formik.errors.oldPassword}
                          </p>
                        </div>
                        <div className='grid'>
                          <Input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name='newPassword'
                            value={formik.values.newPassword}
                            placeholder='New passoword'
                          />
                          <p className='text-red-500 font-bold'>
                            {formik.touched.newPassword &&
                              formik.errors.newPassword}
                          </p>
                        </div>
                        <div className='grid'>
                          <Input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            name='confirmPassword'
                            value={formik.values.confirmPassword}
                            placeholder='Confirm password'
                          />
                          <p className='text-red-500 font-bold'>
                            {formik.touched.confirmPassword &&
                              formik.errors.confirmPassword}
                          </p>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={isPending}
                        className='cursor-pointer'
                        type='submit'
                      >
                        {isPending ? 'Saving...' : 'Save'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                onClick={() => {
                  dispatch(clearResult())
                  navigate('/')
                }}
                className='cursor-pointer text-white bg-red-600 hover:bg-red-500'
              >
                <IoIosLogOut />
                Logout
              </Button>
            </PopoverContent>
          </Popover>

          <Theme />
        </div>
      </div>
    </div>
  )
}

export default Header
