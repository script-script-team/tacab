import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetAllPayments } from '@/react-query/payment.hooks'
import { useEffect } from 'react'
import { toast } from 'sonner'
import Loading from '@/components/Loading'
import DeletePaymentDialog from './DeletePaymentDialog'
import UpdatePaymentDialog from './UpdatePaymentDialog'

function AllPayment({ page }: { page: number }) {
  const { data, isLoading, isError, error } = useGetAllPayments(page)

  useEffect(() => {
    if (isError) toast.error(error.message)
  }, [isError])

  return isLoading ? (
    <div className='relative w-full h-full'>
      <Loading />
    </div>
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.payments.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.student.student_code}</TableCell>
            <TableCell className='font-medium'>{p?.student.name}</TableCell>
            <TableCell>{p.student.subject}</TableCell>
            <TableCell>${p.amount}</TableCell>
            <TableCell>
              {p.month}, {p.year}
            </TableCell>
            <TableCell className='flex gap-2'>
              <UpdatePaymentDialog payment={p} />
              <DeletePaymentDialog id={p.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AllPayment
