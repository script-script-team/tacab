import { useParams } from 'react-router-dom'
import { useGetSingleStudent } from '../../react-query/student.hooks'
import type { IMarks } from '../../pages/types/student.types'
import {
  calculateProgress,
  calculateTotalPayment,
  formatCurrency,
  formatDate,
} from '@/lib/utils'
import { InfoItem } from '@/components/InfoItem'
import { ProgressBar } from '@/components/ProgressBar'
import { MonthGrid } from '@/components/MonthGrid'
import { Button } from '@/components/ui/button'
import { Pencil, Printer, Trash } from 'lucide-react'

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
    <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800'>
      <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-800'>
        <thead className='bg-gray-50 dark:bg-gray-800'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-200'>
              Subject
            </th>
            <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-200'>
              Score
            </th>
          </tr>
        </thead>
        <tbody className='bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800'>
          {subjects.map((sub) => {
            const score = marks[sub.key as keyof IMarks]
            if (score === undefined || score === null) return null
            return (
              <tr key={sub.key}>
                <td className='px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-200'>
                  {sub.label}
                </td>
                <td className='px-6 py-3 text-sm text-right text-gray-700 dark:text-gray-200'>
                  {score}
                </td>
              </tr>
            )
          })}
          <tr className='bg-blue-50 dark:bg-blue-800'>
            <td className='px-6 py-4 text-base font-bold text-blue-900 dark:text-blue-200'>
              Final Grade
            </td>
            <td className='px-6 py-4 text-base font-bold text-right text-blue-900 dark:text-blue-200'>
              {marks.grade}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
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
        Error:{' '}
        {error instanceof Error ? error.message : 'Failed to load student'}
      </div>
    )
  if (!data?.ok || !data.student)
    return (
      <div className='text-center text-red-500 mt-10'>Student not found</div>
    )

  const student = data.student
  const totalPaid = calculateTotalPayment(student.payments)
  const { percent, count } = calculateProgress(student.monthPayments || null)
  const remainingMonths = 8 - count

  return (
    <div className='relative w-full min-h-[83.5vh] p-3 flex flex-col gap-4 bg-white dark:bg-gray-950 rounded-lg h-full'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-700 dark:text-gray-200'>
            {student.name}
          </h1>
          <p className='text-gray-500 mt-1'>
            Student Code: #{student.student_code}
          </p>
        </div>
        <div className='flex gap-3'>
          <Button onClick={() => window.print()}>
            <Printer />
          </Button>
          <Button>
            <Pencil />
          </Button>
          <Button variant='destructive'>
            <Trash />
          </Button>
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
              <InfoItem label='Subject / Course' value={student.subject} />
              <InfoItem
                label='Joined Date'
                value={formatDate(student.createdAt)}
              />
              <InfoItem
                label='Total Paid'
                value={formatCurrency(totalPaid)}
                isCurrency
              />
              <InfoItem
                label='Remaining Months'
                value={`${remainingMonths} Months`}
              />
            </div>
          </div>

          {/* Payment Progress & Grid */}
          <div className='bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-6'>
            <ProgressBar percent={percent} count={count} />
            <div className='mt-8'>
              <h3 className='text-lg font-bold text-gray-700 dark:text-gray-200 mb-4'>
                Monthly Payment Status
              </h3>
              <MonthGrid monthPayments={student.monthPayments} />
            </div>
          </div>

          {/* Payment History Table */}
          <div className='bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-6'>
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-200 mb-4'>
              Payment History
            </h2>
            <div className='overflow-x-auto'>
              <table className='min-w-full text-left text-sm'>
                <thead className='bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 uppercase font-semibold'>
                  <tr>
                    <th className='px-4 py-3'>Date</th>
                    <th className='px-4 py-3'>Month/Year</th>
                    <th className='px-4 py-3 text-right'>Amount</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                  {student.payments && student.payments.length > 0 ? (
                    student.payments.map((payment) => (
                      <tr
                        key={payment.id}
                        className='hover:bg-gray-50 transition-colors'
                      >
                        <td className='px-4 py-3 text-gray-700 dark:text-gray-200'>
                          {formatDate(payment.createdAt)}
                        </td>
                        <td className='px-4 py-3 font-medium text-gray-900 dark:text-gray-200'>
                          {payment.month} {payment.year}
                        </td>
                        <td className='px-4 py-3 text-right font-bold text-green-600 dark:text-green-400'>
                          {formatCurrency(payment.amount)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className='px-4 py-8 text-center text-gray-400 dark:text-gray-600'
                      >
                        No payment history found.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className='bg-gray-50 dark:bg-gray-800 font-bold text-gray-900 dark:text-gray-200'>
                  <tr>
                    <td colSpan={2} className='px-4 py-3 text-right'>
                      Total Paid
                    </td>
                    <td className='px-4 py-3 text-right text-green-700 dark:text-green-400'>
                      {formatCurrency(totalPaid)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className='space-y-8'>
          {/* Marks Section */}
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
