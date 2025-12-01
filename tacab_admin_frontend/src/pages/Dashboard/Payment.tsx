import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetAllPayments } from "@/react-query/payment.hooks"
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Payment() {

    const [page, setPage] = useState(1)
    const {data, isLoading, isError, error} = useGetAllPayments(page);

    useEffect(() => {
        if(isError) {
            toast.error(error.message);
        }
    }, [isError]);

  return (
    <div className="w-full">
        {isLoading ? <div className=""><Loading /></div>: <div className="w-full rounded-lg p-8 bg-white dark:bg-gray-950 min-h-[83.5vh]">
        <div className="w-full flex justify-between items-center">
            <h2>IT Department-Payment Status</h2>
           <div className="flex gap-2">
            <div className='flex gap-2'>
                <Button
                  className='cursor-pointer'
                  disabled={isLoading || page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  className='cursor-pointer'
                  disabled={
                    isLoading ||
                    (data?.totalPage ? page >= data.totalPage : false)
                  }
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight />
                </Button>
              </div>
            <button className="rounded-full bg-blue-900 text-white py-1 px-2 text-[0.6rem] font-bold">7 Students</button></div>
        </div>
        <Table>
      <TableCaption>A list of your recent payment.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Student Name</TableHead>
          <TableHead>Student ID</TableHead>
          <TableHead>Month 1</TableHead>
          <TableHead>Month 2</TableHead>
          <TableHead>Month 3</TableHead>
          <TableHead>Month 4</TableHead>
          <TableHead>Month 5</TableHead>
          <TableHead>Month 6</TableHead>
          <TableHead>Month 7</TableHead>
          <TableHead>Month 8</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.payments.map((p) => (
          <TableRow key={p.student_id}>
            <TableCell className="font-medium">{p.student?.name}</TableCell>
            <TableCell>{p.student_id}</TableCell>
            <TableCell>{p.month === "Paid" ? <div className="p-2 rounded-full flex justify-center items-center bg-green-100 dark:bg-green-900"><Check /></div>: <div className="p-2 rounded-full flex justify-center items-center bg-red-100 dark:bg-red-900"><X /></div>}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>}
    </div>
  )
}

export default Payment