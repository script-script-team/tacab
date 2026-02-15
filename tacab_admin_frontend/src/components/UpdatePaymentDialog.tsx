import { FiEdit } from 'react-icons/fi'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useUpdatePayment } from '@/react-query/payment.hooks'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useQueryClient } from '@tanstack/react-query'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import type { Payment } from '@/pages/types/payment.type'

function UpdatePaymentDialog({ payment }: { payment: Payment }) {
  const client = useQueryClient()
  const { mutate, isPending } = useUpdatePayment()

  const safePayment = {
    id: payment?.id || '',
    amount: payment?.amount || 0,
    month: payment?.month || '',
    year: payment?.year
      ? String(payment.year)
      : String(new Date().getFullYear()),
    student: {
      student_code: String(payment?.student?.student_code) || '',
      name: payment?.student?.name || '',
      subject: payment?.student?.subject || '',
    },
  }

  const formik = useFormik({
    initialValues: {
      id: safePayment.id,
      amount: safePayment.amount,
      student_id: safePayment.student.student_code,
      month: safePayment.month,
      year: safePayment.year,
    },

    onSubmit(values) {
      mutate(values, {
        onSuccess() {
          client.invalidateQueries({ queryKey: ['all-payments'] })
          toast.success('Payment updated successfully')
        },
        onError: (err: Error) => {
          toast.error(err.message || 'Failed to update payment')
        },
      })
    },

    validationSchema: yup.object({
      amount: yup
        .number()
        .typeError('Amount must be a number')
        .required('Amount is required')
        .min(0, 'Amount must be positive'),
      month: yup.string().required('Month is required'),
      year: yup
        .string()
        .required('Year is required')
        .test(
          'is-valid-year',
          'Year must be between 2000 and 2100',
          (value) => {
            if (!value) return false
            const yearNum = parseInt(value, 10)
            return yearNum >= 2000 && yearNum <= 2100
          }
        ),
      student_id: yup.string().required('Student ID is required'),
    }),

    enableReinitialize: true,
  })

  useEffect(() => {
    if (safePayment.student.student_code) {
      formik.setFieldValue('student_id', safePayment.student.student_code)
    }
  }, [safePayment.student.student_code])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FiEdit className='cursor-pointer text-blue-500' />
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Payment</DialogTitle>
            <DialogDescription>
              Update the payment information of the student.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 my-5'>
            {/* Student ID */}
            <div className='grid gap-2'>
              <Label htmlFor='student_id'>Student ID</Label>
              <div className='flex items-center gap-2'>
                <Input
                  id='student_id'
                  name='student_id'
                  type='text'
                  autoComplete='off'
                  value={formik.values.student_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isPending}
                />
              </div>
              {formik.touched.student_id && formik.errors.student_id && (
                <p className='text-sm text-red-500'>
                  {formik.errors.student_id}
                </p>
              )}
            </div>

            <div className='grid gap-2'>
              <Label>Student Name</Label>
              <Input
                id='name'
                type='text'
                value={safePayment.student.name}
                disabled
              />
            </div>

            {/* Amount */}
            <div className='grid gap-2'>
              <Label htmlFor='amount'>Amount</Label>
              <Input
                id='amount'
                name='amount'
                type='number'
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isPending}
              />
              {formik.touched.amount && formik.errors.amount && (
                <p className='text-sm text-red-500'>{formik.errors.amount}</p>
              )}
            </div>

            {/* Month */}
            <div className='grid gap-2'>
              <Label htmlFor='month'>Month</Label>
              <Select
                name='month'
                value={formik.values.month}
                onValueChange={(value) => formik.setFieldValue('month', value)}
                disabled={isPending}
              >
                <SelectTrigger id='month' className='w-full'>
                  <SelectValue placeholder='Select a month' />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ].map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.month && formik.errors.month && (
                <p className='text-sm text-red-500'>{formik.errors.month}</p>
              )}
            </div>

            {/* Year */}
            <div className='grid gap-2'>
              <Label htmlFor='year'>Year</Label>
              <Input
                id='year'
                name='year'
                type='number'
                value={formik.values.year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={isPending}
              />
              {formik.touched.year && formik.errors.year && (
                <p className='text-sm text-red-500'>{formik.errors.year}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' type='button' disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>

            <Button type='submit' disabled={isPending || formik.isSubmitting}>
              {isPending || formik.isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdatePaymentDialog
