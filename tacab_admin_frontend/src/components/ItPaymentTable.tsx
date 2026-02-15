import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Check, X } from 'lucide-react'
import { useGetAllItPayments, useGetFee } from '@/react-query/payment.hooks'
import { useEffect } from 'react'
import { toast } from 'sonner'
import Loading from '@/components/Loading'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import type { IPayment } from '@/pages/types/student.types'
import { useQueryClient } from '@tanstack/react-query'
import { useCompletePayment } from '@/react-query/payment.hooks'

const PaymentCell = ({ payment }: { payment?: IPayment }) => {
  const { mutate, isPending, isError, error } = useCompletePayment()
  const client = useQueryClient()

  useEffect(() => {
    if (isError) toast.error((error as any)?.message || 'Update failed')
  }, [isError, error])

  const isPaid = payment?.status === 'PAID'
  const isPartial = payment?.status === 'PARTIALLY_PAID'

  let bgClass = 'bg-red-100 dark:bg-red-900/40 border-red-300 dark:border-red-800 text-red-700 dark:text-red-300'
  let icon = <X className='w-4 h-4' />

  if (isPaid) {
    bgClass = 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
    icon = <Check className='w-4 h-4' />
  } else if (isPartial) {
    bgClass = 'bg-yellow-100 dark:bg-yellow-900/40 border-yellow-300 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300'
    icon = <Check className='w-4 h-4' />
  }

  const formik = useFormik({
    initialValues: {
      id: payment?.id || '',
      amount: '',
    },
    onSubmit: (values) => {
      mutate({
        id: values.id,
        amount: Number(values.amount),
      }, {
        onSuccess: () => {
          toast.success('Payment updated successfully')
          formik.resetForm()
          client.invalidateQueries({ queryKey: ['all-it-payments'] })
        }
      })
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Amount is required').positive('Must be positive'),
    })
  })

  const { data: feeData, isLoading: feeLoading, isError: feeIsError, error: feeError } = useGetFee()

  const feeFee = feeData?.fees.find((fee) => fee.subject === 'IT')

  useEffect(() => {
    if (feeIsError) toast.error((feeError as any)?.message || 'Failed to fetch fee')
  }, [feeIsError, feeError])

  return (
    <TableCell className='text-center py-3'>
      {isPartial ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button className={`px-2 py-2 rounded-full w-fit mx-auto border flex justify-center items-center gap-1 font-medium text-sm shadow-sm ${bgClass}`}>
              {icon}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Payment Details</PopoverTitle>
              <PopoverDescription>
                Total Required: ${feeLoading ? 'Loading...' : feeFee?.amount}
                <br />
                Remaining: ${feeLoading ? 'Loading...' : (feeFee?.amount! - (payment?.amount || 0))}
              </PopoverDescription>
              <form onSubmit={formik.handleSubmit} className='flex flex-col gap-2 mt-4'>
                <Input
                  type='number'
                  step='0.01'
                  placeholder='Amount to pay'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='amount'
                  value={formik.values.amount}
                  className='h-8'
                />
                <Button size='sm' className='w-full h-8' disabled={isPending}>
                  {isPending ? 'Updating...' : 'Complete Payment'}
                </Button>
              </form>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      ) : (
        <Button className={`px-2 py-2 rounded-full w-fit mx-auto border flex justify-center items-center gap-1 font-medium text-sm shadow-sm ${bgClass}`}>
          {icon}
        </Button>
      )}
    </TableCell>
  )
}

const ItPaymentTable = ({ page }: { page: number }) => {
  const { data, isLoading, isError, error } = useGetAllItPayments(page)

  useEffect(() => {
    if (isError) toast.error((error as any)?.message || 'Failed to fetch payments')
  }, [isError, error])

  if (isLoading)
    return (
      <div className='relative w-full h-full'>
        <Loading />
      </div>
    )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='py-4 font-semibold'>ID</TableHead>
          <TableHead className='py-4 font-semibold'>Student Name</TableHead>

          {Array.from({ length: 8 }).map((_, i) => (
            <TableHead key={i} className='py-4 font-semibold text-center'>
              Month {i + 1}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.payments?.map((pay) => (
          <TableRow
            key={pay.id}
            className='transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/20'
          >
            <TableCell className='py-4'>{pay.student_code}</TableCell>
            <TableCell className='py-4 font-medium'>{pay?.name}</TableCell>

            {Array.from({ length: 8 }).map((_, index) => {
              const payment = pay.payments?.find(
                (p: any) => p.month === index + 1
              )

              return (
                <PaymentCell
                  key={index}
                  payment={payment}
                />
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ItPaymentTable
