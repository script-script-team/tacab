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
import { useAddPayment, useDeletePayment, useGetAllPayments, useUpdatePayment } from "@/react-query/payment.hooks"
import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronLeft, ChevronRight, Plus, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FiEdit } from "react-icons/fi";
import { Input } from "@/components/ui/input";

function Payment() {

    const client = useQueryClient();
    const [page, setPage] = useState(1)
    const {data, isLoading, isError, error} = useGetAllPayments(page);
    const { mutate: addPayment, isPending: addPaymentIsPending, isError: addPaymentIsError, error: addPaymentError } = useAddPayment();
    const { mutate: updatePayment, isPending: updatePaymentIsPending, isError: updatePaymentIsError, error: updatePaymentError } = useUpdatePayment();
    const { mutate: deletePayment, isPending: deletePaymentIsPending, isError: deletePaymentIsError, error: deletePaymentError } = useDeletePayment();

    useEffect(() => {
        if(isError) {
            toast.error(error.message);
        }
    }, [isError]);

    useEffect(() => {
      if(addPaymentIsError) {
        toast.error(addPaymentError.message);
      }
      if(updatePaymentIsError) {
        toast.error(updatePaymentError.message);
      }
      if(deletePaymentIsError) {
        toast.error(deletePaymentError.message);
      }
    }, [addPaymentIsError, updatePaymentIsError, deletePaymentIsError]);

  return (
    <div className="w-full">
        {isLoading ? <div className="w-full h-[83.5vh]"><Loading /></div>: <div className="w-full rounded-lg p-8 bg-white dark:bg-gray-950 min-h-[83.5vh]">
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
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.payments.map((p) => (
          <TableRow key={p.student_id}>
            <TableCell className="font-medium">{p.student?.name}</TableCell>
            <TableCell>{p.student_id}</TableCell>
            <TableCell></TableCell>
            {p.student?.monthPayments?.map((p) => {
              return <TableCell key={p.student_id}>
                {p.month_1 ? <div className="p-2 rounded-full flex justify-center items-center bg-green-100 dark:bg-green-900"><Check /></div>: <div className="p-2 rounded-full flex justify-center items-center bg-red-100 dark:bg-red-900"><X /></div>}
              </TableCell>
            })}
            <TableCell className="flex gap-2">
              <AlertDialog>
            <AlertDialogTrigger><Plus /></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Add Payment</AlertDialogTitle>
                  <AlertDialogDescription>
                    Confirm adding a payment for students
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => addPayment(p.id)} disabled={addPaymentIsPending}>{addPaymentIsPending ? "Adding...": "Add"}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
              <AlertDialog>
            <AlertDialogTrigger><FiEdit /></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Update Payment</AlertDialogTitle>
                  <AlertDialogDescription>
                    Confirm updating the payment status for
                    <form className="w-full grid gap-2">
                      <Input placeholder="" />
                      <Input placeholder="" />
                      <Input placeholder="" />
                    </form>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => updatePayment(p.id, {onSuccess() {client.invalidateQueries({queryKey: ["all-payments"]})}})} disabled={updatePaymentIsPending}>{updatePaymentIsPending ? "Saving...": "Save"}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
            <AlertDialogTrigger><Trash /></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Payment</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you absolutely sure to delete this payment
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500 hover:bg-red-600 duration-200" onClick={() => deletePayment(p.id, {onSuccess() {client.invalidateQueries({queryKey: ["all-payments"]})}})} disabled={deletePaymentIsPending}>{deletePaymentIsPending ? "Deleting...": "Delete"}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>}
    </div>
  )
}

export default Payment