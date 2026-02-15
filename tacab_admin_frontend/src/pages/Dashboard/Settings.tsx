import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FiEdit } from 'react-icons/fi'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { Eye, EyeOff, DollarSign, Save } from 'lucide-react'
import type { IUpdateUploadRes } from '@/pages/types/upload.types'
import { useGetDefaultPassword } from '@/react-query/defaultPassword.hooks'
import { useChangePassword } from '@/react-query/admin.hooks'
import { useGetFee, useUpdateFee } from '@/react-query/payment.hooks'

export function Settings() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDefaultPassword, setShowDefaultPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const queryClient = useQueryClient()

  const {
    data: defaultPasswordData,
    isLoading: loadingDefault,
    isError: defaultPasswordIsError,
    error: defaultPasswordError,
  } = useGetDefaultPassword()
  const {
    mutate: changePassword,
    isPending: isChangingPassword,
    isError: changePasswordError,
    error: changePasswordErrorMsg,
  } = useChangePassword()

  const {
    data: feeData,
    isLoading: loadingFee,
    isError: feeIsError,
    error: feeError,
  } = useGetFee()
  const {
    mutate: updateFee,
    isPending: updatingFee,
    isError: updateFeeError,
    error: updateFeeErrorMsg,
  } = useUpdateFee()

  useEffect(() => {
    if (defaultPasswordIsError) {
      toast.error(
        defaultPasswordError?.message || 'Failed to fetch default password'
      )
    }
  }, [defaultPasswordIsError, defaultPasswordError])

  useEffect(() => {
    if (changePasswordError) {
      toast.error(changePasswordErrorMsg?.message || 'Failed to change password')
    }
  }, [changePasswordError, changePasswordErrorMsg])

  useEffect(() => {
    if (feeIsError) {
      toast.error(feeError?.message || 'Failed to fetch fee')
    }
  }, [feeIsError, feeError])

  useEffect(() => {
    if (updateFeeError) {
      toast.error(updateFeeErrorMsg?.message || 'Failed to update fee')
    }
  }, [updateFeeError, updateFeeErrorMsg])

  // Password Formik
  const passwordFormik = useFormik({
    initialValues: {
      defaultPassword: '',
      password: '',
    },
    validationSchema: Yup.object({
      defaultPassword: Yup.string().required('Current password is required'),
      password: Yup.string().required('Your password is required'),
    }),
    onSubmit: (values) => {
      changePassword(values, {
        onSuccess: (res: IUpdateUploadRes) => {
          toast.success(res.message || 'Password updated successfully')
          setIsOpen(false)
          queryClient.invalidateQueries({ queryKey: ['default-password'] })
          passwordFormik.resetForm()
        },
        onError: (err) => {
          toast.error(err.message || 'Failed to update password')
        },
      })
    },
  })

  // IT Formik
  const itFormik = useFormik({
    initialValues: {
      subject: 'IT',
      amount: 0,
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required('IT student amount is required')
        .min(0, 'Amount must be positive'),
    }),
    onSubmit: (values) => {
      updateFee(
        { subject: 'IT', amount: values.amount },
        {
          onSuccess: (res) => {
            toast.success(
              res.message || 'IT Payment settings updated successfully'
            )
            queryClient.invalidateQueries({ queryKey: ['fee'] })
          },
          onError: (err) => {
            toast.error(err.message || 'Failed to update IT payment settings')
          },
        }
      )
    },
  })

  // Computer Formik
  const computerFormik = useFormik({
    initialValues: {
      subject: 'COMPUTER',
      amount: 0,
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required('Computer student amount is required')
        .min(0, 'Amount must be positive'),
    }),
    onSubmit: (values) => {
      updateFee(
        { subject: 'Computer', amount: values.amount },
        {
          onSuccess: (res) => {
            toast.success(
              res.message || 'Computer Payment settings updated successfully'
            )
            queryClient.invalidateQueries({ queryKey: ['fee'] })
          },
          onError: (err) => {
            toast.error(
              err.message || 'Failed to update Computer payment settings'
            )
          },
        }
      )
    },
  })

  useEffect(() => {
    if (defaultPasswordData?.defaultPassword != null) {
      passwordFormik.setFieldValue(
        'defaultPassword',
        String(defaultPasswordData.defaultPassword.password)
      )
    }
  }, [defaultPasswordData])

  useEffect(() => {
    if (feeData?.fees) {
      const itFee = feeData.fees.find((fee) => fee.subject === 'IT')
      const computerFee = feeData.fees.find((fee) => fee.subject === 'Computer')
      if (itFee) {
        itFormik.setFieldValue('amount', itFee.amount)
      }
      if (computerFee) {
        computerFormik.setFieldValue('amount', computerFee.amount)
      }
    }
  }, [feeData])

  return (
    <div className='w-full flex flex-col gap-6 min-h-[83.5vh] rounded-lg bg-white dark:bg-gray-950 p-5'>
      {/* Payment Configuration Section */}
      <div className='border border-gray-200 dark:border-gray-800 rounded-lg p-6'>
        <div className='flex items-center gap-2 mb-4'>
          <DollarSign className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
          <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
            Payment Configuration
          </h2>
        </div>
        <p className='text-sm text-gray-600 dark:text-gray-400 mb-6'>
          Configure the default payment amounts for different student types.
          These amounts will be used when creating new payment records.
        </p>

        <div className='grid gap-8 md:grid-cols-2'>
          {/* IT Student Form */}
          <form
            onSubmit={itFormik.handleSubmit}
            className='space-y-4 p-4 border rounded-md border-gray-100 dark:border-gray-800'
          >
            <div className='space-y-2'>
              <Label htmlFor='it_student_amount' className='text-sm font-medium'>
                IT Student Monthly Payment
              </Label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400'>
                  $
                </span>
                <Input
                  id='it_student_amount'
                  name='amount'
                  type='number'
                  step='0.01'
                  min='0'
                  value={itFormik.values.amount}
                  onChange={itFormik.handleChange}
                  onBlur={itFormik.handleBlur}
                  className='pl-7'
                  disabled={loadingFee}
                  placeholder={loadingFee ? 'Loading...' : 'Default IT amount'}
                />
              </div>
              {itFormik.touched.amount && itFormik.errors.amount && (
                <p className='text-sm text-red-500'>{itFormik.errors.amount}</p>
              )}
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Default amount per month for IT students
              </p>
            </div>
            <Button
              type='submit'
              disabled={updatingFee || loadingFee}
              size='sm'
              className='w-full md:w-auto'
            >
              <Save className='w-4 h-4 mr-2' />
              {updatingFee ? 'Saving...' : 'Save IT Payment Setting'}
            </Button>
          </form>

          {/* Computer Student Form */}
          <form
            onSubmit={computerFormik.handleSubmit}
            className='space-y-4 p-4 border rounded-md border-gray-100 dark:border-gray-800'
          >
            <div className='space-y-2'>
              <Label
                htmlFor='computer_student_amount'
                className='text-sm font-medium'
              >
                Computer Student Book Payment
              </Label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400'>
                  $
                </span>
                <Input
                  id='computer_student_amount'
                  name='amount'
                  type='number'
                  step='0.01'
                  min='0'
                  value={computerFormik.values.amount}
                  onChange={computerFormik.handleChange}
                  onBlur={computerFormik.handleBlur}
                  className='pl-7'
                  disabled={loadingFee}
                  placeholder={
                    loadingFee ? 'Loading...' : 'Default Computer amount'
                  }
                />
              </div>
              {computerFormik.touched.amount && computerFormik.errors.amount && (
                <p className='text-sm text-red-500'>
                  {computerFormik.errors.amount}
                </p>
              )}
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Default amount per book for Computer students
              </p>
            </div>
            <Button
              type='submit'
              disabled={updatingFee || loadingFee}
              size='sm'
              className='w-full md:w-auto'
            >
              <Save className='w-4 h-4 mr-2' />
              {updatingFee ? 'Saving...' : 'Save Computer Payment Setting'}
            </Button>
          </form>
        </div>
      </div>

      {/* Default Password Section */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className='border border-gray-200 dark:border-gray-800 rounded-lg p-6 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors'>
            <Button variant='outline' className='w-full md:w-auto'>
              <FiEdit className='mr-2' /> Change Default Password
            </Button>
            <div className='text-sm text-gray-600 dark:text-gray-400 mt-3'>
              Changing the default password will apply only to newly created
              student accounts. Existing students will retain their current
              passwords.
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className='sm:max-w-[425px]'>
          <form onSubmit={passwordFormik.handleSubmit}>
            <DialogHeader>
              <DialogTitle>Change Default Password</DialogTitle>
              <DialogDescription>
                You can change the default password for new users here.
              </DialogDescription>
            </DialogHeader>

            <div className='grid gap-4 py-4'>
              {/* Current Default Password */}
              <div className='grid gap-2'>
                <Label htmlFor='defaultPassword'>Current Default Password</Label>
                <div className='relative'>
                  <Input
                    id='defaultPassword'
                    name='defaultPassword'
                    type={showDefaultPassword ? 'text' : 'password'}
                    value={passwordFormik.values.defaultPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    className='pr-10'
                    disabled={loadingDefault}
                    placeholder={loadingDefault ? 'Loading...' : ''}
                  />
                  <button
                    type='button'
                    onClick={() => setShowDefaultPassword((prev) => !prev)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                  >
                    {showDefaultPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordFormik.touched.defaultPassword &&
                  passwordFormik.errors.defaultPassword && (
                    <p className='text-sm text-red-500'>
                      {passwordFormik.errors.defaultPassword}
                    </p>
                  )}
              </div>

              {/* New Password */}
              <div className='grid gap-2'>
                <Label htmlFor='password'>Your Password</Label>
                <div className='relative'>
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    value={passwordFormik.values.password}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    placeholder='Enter your password'
                    className='pr-10'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordFormik.touched.password && passwordFormik.errors.password && (
                  <p className='text-sm text-red-500'>
                    {passwordFormik.errors.password}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline' type='button'>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type='submit'
                disabled={passwordFormik.isSubmitting || isChangingPassword}
              >
                {passwordFormik.isSubmitting || isChangingPassword
                  ? 'Updating...'
                  : 'Update Password'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Settings