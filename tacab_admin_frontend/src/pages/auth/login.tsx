import { Button } from '@/components/ui/button'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLogin } from '@/react-query/login.hook'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { login } from '../redux/auth/login.slice'

function Login() {
  const navigate = useNavigate()
  const { mutate: loginFn, isPending } = useLogin()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit(values) {
      loginFn(values, {
        onSuccess: (res) => {
          toast.success('logged in successfully')
          dispatch(login(res.admin))
          localStorage.setItem('access_token', res.access_token)
          localStorage.setItem('refresh_token', res.refresh_token)
          navigate('/')
        },
        onError: (error) => {
          toast.error(error.message || 'Login failed')
        },
      })
    },
    validationSchema: yup.object({
      email: yup.string().email().required('Email is required'),
      password: yup
        .string()
        .max(100, 'Password limit reach')
        .required('Password is required'),
    }),
  })

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <Header />
      <div className='w-full h-fit my-5 flex-1 justify-center items-center flex'>
        <form onSubmit={formik.handleSubmit}>
          <div className='w-[90%] md:w-[440px] h-fit shadow-lg'>
            <div className='flex justify-center items-center flex-col gap-4'>
              <img
                className='w-20 h-20 rounded-full object-cover'
                src='/logo.jpg'
              />
              <h2 className='text-3xl font-bold text-center'>
                Welcome to tacab collage
              </h2>
            </div>
            <div className='flex flex-col gap-4 my-2'>
              <div className='flex flex-col gap-2'>
                <label className='font-medium text-gray-600'>Email</label>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  name='email'
                  type='text'
                  placeholder='Email'
                />
                <p className='text-red-500 font-bold'>
                  {formik.touched.email && formik.errors.email}
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-medium text-gray-600'>Password</label>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  name='password'
                  type='password'
                  placeholder='Password'
                />
                <p className='text-red-500 font-bold'>
                  {formik.touched.password && formik.errors.password}
                </p>
              </div>
            </div>
            <Button
              type='submit'
              className='cursor-pointer bg-blue-600 hover:bg-blue-700 w-full h-10 text-white'
              disabled={isPending}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Login
