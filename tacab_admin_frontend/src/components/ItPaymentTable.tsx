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
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './ui/button'

const ItPaymentTable = ({ page }: { page: number }) => {
  const { data, isLoading, isError, error } = useGetAllItPayments(page)

  useEffect(() => {
    if (isError) toast.error(error.message)
  }, [isError])

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

              return (
                <TableCell key={index} className='text-center py-3'>
                  
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ItPaymentTable
