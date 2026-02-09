import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useForgotPassword } from '@/react-query/forgotPassword.hooks'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const ENABLE_COOLDOWN = false
const COOLDOWN_SECONDS = 60
const STORAGE_KEY = 'forgot_password_cooldown_until'

const ForgetPassword = () => {
  const { mutate: sendEmail, isPending, isError, error } = useForgotPassword()

  const [secondsLeft, setSecondsLeft] = useState(0)

  useEffect(() => {
    if (!ENABLE_COOLDOWN) return

    const storedUntil = localStorage.getItem(STORAGE_KEY)
    if (!storedUntil) return

    const diff = Math.ceil((Number(storedUntil) - Date.now()) / 1000)

    if (diff > 0) setSecondsLeft(diff)
    else localStorage.removeItem(STORAGE_KEY)
  }, [])

  // Countdown tick
  useEffect(() => {
    if (!ENABLE_COOLDOWN || secondsLeft <= 0) return

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(STORAGE_KEY)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [secondsLeft])

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object({
      email: yup.string().email().required('Email is required'),
    }),
    onSubmit(values) {
      if (ENABLE_COOLDOWN && secondsLeft > 0) return

      sendEmail(values.email, {
        onSuccess: (data) => {
          toast.success(data?.message || 'Reset link sent')

          if (ENABLE_COOLDOWN) {
            const until = Date.now() + COOLDOWN_SECONDS * 1000
            localStorage.setItem(STORAGE_KEY, until.toString())
            setSecondsLeft(COOLDOWN_SECONDS)
          }
        },
      })
    },
  })

  useEffect(() => {
    if (isError) {
      toast.error(error?.message)
    }
  }, [isError, error])

  const isDisabled = isPending || (ENABLE_COOLDOWN && secondsLeft > 0)

  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md space-y-8 rounded-2xl border p-8 shadow-xl'>
        <form className='mt-8 space-y-6' onSubmit={formik.handleSubmit}>
          <div className='space-y-2'>
            <label htmlFor='email' className='text-sm font-medium'>
              Email Address
            </label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='name@company.com'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='h-11'
            />
            <p className='text-red-500 font-bold'>
              {formik.touched.email && formik.errors.email}
            </p>
          </div>

          <Button
            type='submit'
            className='w-full h-11 text-base font-semibold'
            disabled={isDisabled}
          >
            {isPending
              ? 'Sending...'
              : ENABLE_COOLDOWN && secondsLeft > 0
                ? `Resend in ${secondsLeft}s`
                : 'Send reset link'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
