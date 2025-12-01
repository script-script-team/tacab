import type { IMonthPayment } from '@/pages/types/student.types'

export const MonthGrid = ({
  monthPayments,
  subject,
}: {
  monthPayments: IMonthPayment[] | null
  subject: string
}) => {
  const months = Array.from(
    { length: subject === 'IT' ? 8 : 3 },
    (_, i) => i + 1
  )
  const mp = monthPayments && monthPayments.length > 0 ? monthPayments[0] : null

  return subject === 'IT' ? (
    <div className='grid grid-cols-4 gap-4 mt-6'>
      {months.map((num) => {
        const key = `month_${num}` as keyof IMonthPayment
        const isPaid = mp ? mp[key] : false

        return (
          <div
            key={num}
            className={`
              relative flex items-center justify-center h-20 rounded-lg border transition-all
              ${
                isPaid
                  ? 'bg-green-100 dark:bg-green-800 border-green-500 text-green-700 dark:text-green-200'
                  : 'bg-gray-100 dark:bg-gray-800 border-gray-600 text-gray-700 dark:text-gray-400'
              }
            `}
          >
            <div className='text-center'>
              <span className='block text-sm font-semibold uppercase'>
                Month
              </span>
              <span className='block text-2xl font-bold'>{num}</span>
            </div>
          </div>
        )
      })}
    </div>
  ) : (
    <div className='grid grid-cols-3 gap-4 mt-6'>
      {months.map((num) => {
        const key = `month_${num}` as keyof IMonthPayment
        const isPaid = mp ? mp[key] : false

        return (
          <div
            key={num}
            className={`
              relative flex items-center justify-center h-20 rounded-lg border transition-all
              ${
                isPaid
                  ? 'bg-green-100 dark:bg-green-800 border-green-500 text-green-700 dark:text-green-200'
                  : 'bg-gray-100 dark:bg-gray-800 border-gray-600 text-gray-700 dark:text-gray-400'
              }
            `}
          >
            <div className='text-center'>
              <span className='block text-sm font-semibold uppercase'>
                Book
              </span>
              <span className='block text-2xl font-bold'>{num}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
