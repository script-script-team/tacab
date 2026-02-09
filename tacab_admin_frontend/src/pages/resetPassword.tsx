import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useResetPassword } from '@/react-query/forgotPassword.hooks'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import * as yup from 'yup'

const ResetPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  const {
    mutate: resetPassword,
    isPending,
    isError,
    error,
  } = useResetPassword()

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit(values) {
      if (token) {
        resetPassword(
          { token, password: values.password },
          {
            onSuccess: () => {
              toast.success('Password reset successfully')
              navigate('/auth/login')
            },
          },
        )
      } else {
        toast.error('Invalid reset link')
      }
    },
    validationSchema: yup.object({
      password: yup.string().required('Password is required'),
      confirmPassword: yup.string().required('Confirm Password is required'),
    }),
  })

  useEffect(() => {
    if (isError) {
      toast.error(error.message)
    }
  }, [isError, error?.message])

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold'>
            Reset your password
          </h2>
        </div>

        <form className='mt-8 space-y-6' onSubmit={formik.handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <Input
                name='password'
                type='password'
                required
                placeholder='New Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className='text-red-500 font-bold'>
                {formik.touched.password && formik.errors.password}
              </p>
            </div>
            <div>
              <Input
                name='confirmPassword'
                type='password'
                required
                placeholder='Confirm New Password'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className='text-red-500 font-bold'>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </p>
            </div>
          </div>

          <div>
            <Button type='submit' disabled={isPending} className='w-full'>
              {isPending ? 'Resetting...' : 'Reset Password'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
