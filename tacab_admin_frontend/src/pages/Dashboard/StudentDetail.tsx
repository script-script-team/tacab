import { useParams } from 'react-router-dom'
import { useGetSingleStudent } from '../../react-query/student.hooks'
import type { IMarks, IPayment } from '../../pages/types/student.types'
import {
  calculateProgress,
  calculateTotalPayment,
  formatCurrency,
  formatDate,
} from '@/lib/utils'
import { InfoItem } from '@/components/InfoItem'
import { ProgressBar } from '@/components/ProgressBar'
import { Badge } from '@/components/Badge'
import { Printer } from 'lucide-react'
import { UpdateStudentDialog } from '@/components/UpdateStudentDialog'
import DeleteStudentDialog from '@/components/DeleteStudentDialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useGetFee, useCompletePayment } from '@/react-query/payment.hooks'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

const MarksTable = ({ marks }: { marks: IMarks | null }) => {
  if (!marks)
    return <div className='text-gray-500 italic'>No marks recorded yet.</div>

  const subjects = [
    { key: 'a_plus', label: 'A+' },
    { key: 'multimedia', label: 'Multimedia' },
    { key: 'web_desing', label: 'Web Design' },
    { key: 'networking', label: 'Networking' },
    { key: 'database', label: 'Database' },
    { key: 'programming', label: 'Programming' },
    { key: 'windows', label: 'Windows' },
    { key: 'word', label: 'Word' },
    { key: 'excel', label: 'Excel' },
    { key: 'power_point', label: 'PowerPoint' },
    { key: 'access', label: 'Access' },
    { key: 'publisher', label: 'Publisher' },
    { key: 'outlook', label: 'Outlook' },
    { key: 'computer_literacy', label: 'Computer Literacy' },
  ]

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead className='text-right'>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((sub) => {
            const score = marks[sub.key as keyof IMarks]
            if (score === undefined || score === null) return null
            return (
              <TableRow key={sub.key}>
                <TableCell className='font-medium'>{sub.label}</TableCell>
                <TableCell className='text-right'>{score}</TableCell>
              </TableRow>
            )
          })}
          <TableRow className='bg-muted/50 font-bold'>
            <TableCell>Final Grade</TableCell>
            <TableCell className='text-right'>{marks.grade}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

const InteractiveStatusBadge = ({ payment, studentSubject, studentId }: { payment: IPayment, studentSubject: string, studentId: number }) => {
  const { mutate, isPending, isError, error } = useCompletePayment()
  const client = useQueryClient()

  useEffect(() => {
    if (isError) toast.error((error as any)?.message || 'Update failed')
  }, [isError, error])

  const formik = useFormik({
    initialValues: {
      id: payment.id || '',
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
          client.invalidateQueries({ queryKey: ['single-student', Number(studentId)] })
        }
      })
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Amount is required').positive('Must be positive'),
    })
  })

  const { data: feeData, isLoading: feeLoading, isError: feeIsError, error: feeError } = useGetFee()

  const feeFee = feeData?.fees.find((fee) => fee.subject === studentSubject)

  useEffect(() => {
    if (feeIsError) toast.error((feeError as any)?.message || 'Failed to fetch fee')
  }, [feeIsError, feeError])

  if (payment.status === 'PAID') {
    return <Badge variant='success'>Paid</Badge>
  }

  if (payment.status === 'PARTIALLY_PAID') {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className='cursor-pointer'>
            <Badge variant='warning'>Partial</Badge>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Payment Details</PopoverTitle>
            <PopoverDescription>
              Total Required: ${feeLoading ? 'Loading...' : feeFee ? feeFee.amount : 'N/A'}
              <br />
              Remaining: ${feeLoading ? 'Loading...' : feeFee ? (feeFee.amount - (payment?.amount || 0)).toFixed(2) : 'N/A'}
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
    )
  }

  if (payment.status === 'UNPAID') {
    return <Badge variant='destructive'>Unpaid</Badge>
  }

  return <Badge variant='secondary'>{payment.status}</Badge>
}

const StudentDetail = () => {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useGetSingleStudent(Number(id))

  if (isLoading)
    return (
      <div className='flex h-screen items-center justify-center text-gray-500 dark:text-gray-200'>
        Loading student details...
      </div>
    )
  if (isError)
    return (
      <div className='text-center text-red-500 mt-10'>
        Error: {error instanceof Error ? error.message : 'Failed to load student'}
      </div>
    )
  if (!data?.ok || !data.student)
    return <div className='text-center text-red-500 mt-10'>Student not found</div>

  const student = data.student
  const totalPaid = calculateTotalPayment(student.payments)
  const { percent, count } = calculateProgress(student.payments)
  const remainingMonths = Math.max(0, 8 - count)

  return (
    <div className='relative w-full min-h-[83.5vh] p-3 flex flex-col gap-4 bg-white dark:bg-gray-950 rounded-lg h-full'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-700 dark:text-gray-200'>
            {student.name}
          </h1>
          <p className='text-gray-500 mt-1'>Student Code: #{student.student_code}</p>
        </div>
        <div className='flex gap-3'>
          <Printer onClick={() => window.print()} size={18} className='cursor-pointer' />
          <UpdateStudentDialog student={student} />
          <DeleteStudentDialog id={student.id} />
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 space-y-8'>
          <div className='bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-6'>
            <h2 className='text-xl font-bold text-gray-700 dark:text-gray-200 mb-6 border-b pb-2'>
              Student Information
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4'>
              <InfoItem label='Full Name' value={student.name} />
              <InfoItem label='Phone Number' value={student.phone_number} />
              <InfoItem label='Subject' value={student.subject} />
              <InfoItem label='Joined Date' value={formatDate(student.createdAt)} />
              <InfoItem label='Total Paid' value={formatCurrency(totalPaid)} isCurrency />
              <InfoItem label='Remaining Months' value={`${remainingMonths} Months`} />
            </div>
          </div>

          <div className='bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-6'>
            <ProgressBar percent={percent} count={count} />
          </div>

          <div className='bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-6'>
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-200 mb-4'>
              Payment History
            </h2>
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Month/Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.payments && student.payments.length > 0 ? (
                    student.payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{formatDate(payment.createdAt)}</TableCell>
                        <TableCell className='font-medium'>
                          {payment.month}/{payment.year}
                        </TableCell>
                        <TableCell>
                          <InteractiveStatusBadge
                            payment={payment}
                            studentSubject={student.subject}
                            studentId={student.id}
                          />
                        </TableCell>
                        <TableCell className='text-right font-bold text-green-600 dark:text-green-400'>
                          {formatCurrency(payment.amount)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className='h-24 text-center text-muted-foreground'>
                        No payment history found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total Paid</TableCell>
                    <TableCell className='text-right text-green-700 dark:text-green-400'>
                      {formatCurrency(totalPaid)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </div>

        <div className='space-y-8'>
          <div className='bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-bold text-gray-800 dark:text-gray-200'>
                Academic Marks
              </h2>
              {student.marks && (
                <span className='px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm font-bold'>
                  Grade: {student.marks.grade}
                </span>
              )}
            </div>
            <MarksTable marks={student.marks} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetail
