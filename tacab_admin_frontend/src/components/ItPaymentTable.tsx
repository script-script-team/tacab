import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Check, X } from 'lucide-react'
import { useGetAllItPayments } from '@/react-query/payment.hooks'
import { useEffect } from 'react'
import { toast } from 'sonner'
import Loading from '@/components/Loading'
import type { MonthPayment } from '../pages/types/payment.type'

const ItPayment = ({ page }: { page: number }) => {
  const { data, isLoading, isError, error } = useGetAllItPayments(page)

  useEffect(() => {
    if (isError) toast.error(error.message)
  }, [isError])

  if (isLoading)
    return (
      <div className='relative'>
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

            {(() => {
              const mp = pay.monthPayments[0]

              return Array.from({ length: 8 }).map((_, index) => {
                const key = `month_${index + 1}` as keyof MonthPayment
                const value = mp[key]

                return (
                  <TableCell key={index} className='text-center py-3'>
                    {value ? (
                      <div
                        className='
                          px-2 py-2 rounded-full w-fit mx-auto
                          bg-emerald-100 dark:bg-emerald-900/40 
                          border border-emerald-300 dark:border-emerald-800
                          text-emerald-700 dark:text-emerald-300
                          flex justify-center items-center gap-1
                          font-medium text-sm
                          shadow-sm
                        '
                      >
                        <Check className='w-4 h-4' />
                      </div>
                    ) : (
                      <div
                        className='
                          px-2 py-2 rounded-full w-fit mx-auto
                          bg-red-100 dark:bg-red-900/40 
                          border border-red-300 dark:border-red-800
                          text-red-700 dark:text-red-300
                          flex justify-center items-center gap-1
                          font-medium text-sm
                          shadow-sm
                        '
                      >
                        <X className='w-4 h-4' />
                      </div>
                    )}
                  </TableCell>
                )
              })
            })()}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ItPayment
