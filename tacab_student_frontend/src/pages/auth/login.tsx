import { Button } from '@/components/ui/button'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function Login() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      phone_number: '',
      subject: '',
    },
    onSubmit(values) {
      console.log(values)
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
      phone_number: yup
        .string()
        .min(5, 'Phone number must be at least 5 characters')
        .required('Phone number is required'),
      subject: yup.string().required('Subject is required'),
    }),
  })

  return (
    <div className='w-full h-screen py-20 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900'>
      <form
        onSubmit={formik.handleSubmit}
        className='sm:w-[500px] w-[90%] p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl grid gap-6'
      >
        {/* Header */}
        <div className='flex flex-col items-center gap-4'>
          <img
            src='/logo.jpg'
            alt='Logo'
            className='w-20 h-20 rounded-full object-cover shadow-md'
          />
          <h2 className='text-2xl xs:text-xl font-bold text-gray-800 dark:text-gray-100 text-center'>
            Welcome to Tacab College
          </h2>
        </div>

        {/* Form fields */}
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-600 dark:text-gray-300'>
              Name
            </label>
            <Input
              name='name'
              type='text'
              placeholder='e.g Hebel Hebel'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm'
            />
            {formik.touched.name && formik.errors.name && (
              <p className='text-red-500 text-sm'>{formik.errors.name}</p>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-600 dark:text-gray-300'>
              Phone Number
            </label>
            <Input
              name='phone_number'
              type='text'
              placeholder='e.g 4567890'
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm'
            />
            {formik.touched.phone_number && formik.errors.phone_number && (
              <p className='text-red-500 text-sm'>
                {formik.errors.phone_number}
              </p>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-600 dark:text-gray-300'>
              Subject
            </label>
            <Select
              name='subject'
              value={formik.values.subject}
              onValueChange={(value) => {
                formik.setFieldValue('subject', value)
                formik.setFieldTouched('subject', true)
              }}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select your subject' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Subjects</SelectLabel>
                  <SelectItem value='IT'>IT</SelectItem>
                  <SelectItem value='Computer'>Computer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.touched.subject && formik.errors.subject && (
              <p className='text-red-500 text-sm'>{formik.errors.subject}</p>
            )}
          </div>
        </div>

        {/* Submit button */}
        <Button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-semibold shadow-md transition-all duration-300'
        >
          Login
        </Button>
      </form>
      <div className='dark:text-gray-400 text-gray-300 text-center mt-5'>
        <h2 className='text-sm'>
          Developed by:{' '}
          <a href='https://wa.me/+252634541983' target='_blank'>
            <span className='text-blue-500 dark:text-blue-400'>
              Script Squad
            </span>
          </a>
        </h2>
        <h2 className='text-sm'>
          Tacab © {new Date().getFullYear()} All rights reserved.
        </h2>
        <h2 className='hover:text-gray-300 text-sm sm:text-right'>
          Call center:{' '}
          <a href='https://wa.me/+252634541983' target='_blank'>
            <span className='text-blue-500 dark:text-blue-400'>
              +252 63 4541983
            </span>
          </a>{' '}
          /{' '}
          <a href='https://wa.me/+252637287178' target='_blank'>
            {' '}
            <span className='text-blue-500 dark:text-blue-400'>
              +252 63 7287178
            </span>
          </a>
        </h2>
      </div>
    </div>
  )
}

export default Login
