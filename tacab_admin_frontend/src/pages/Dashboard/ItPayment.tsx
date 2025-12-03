import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check, X } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { MdDelete } from "react-icons/md";
import { useDeletePayment, useGetAllItPayments, useUpdatePayment } from "@/react-query/payment.hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFormik } from "formik";
import * as yup from "yup"
import { toast } from "sonner";
import Loading from "@/components/Loading";
import { Label } from "@/components/ui/label";
import { months, years } from "./Payment";

function ItPayment({page}:{page: number}) {
    const client = useQueryClient();
    const {data, isLoading, isError, error} = useGetAllItPayments(page);
    const { mutate: updatePayment, isPending: updatePaymentIsPending, isError: updatePaymentIsError, error: updatePaymentError } = useUpdatePayment();
    const { mutate: deletePayment, isPending: deletePaymentIsPending, isError: deletePaymentIsError, error: deletePaymentError } = useDeletePayment();

    onValueChange={(v) => formik.setFieldValue("year", v)}

    useEffect(() => {
        if(isError) {
            toast.error(error.message);
        }
    }, [isError]);

    useEffect(() => {
      if(updatePaymentIsError) {
        toast.error(updatePaymentError.message);
      }
      if(deletePaymentIsError) {
        toast.error(deletePaymentError.message);
      }
    }, [updatePaymentIsError, deletePaymentIsError]);
    
  return isLoading ? <Loading /> : (
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
          <TableRow key={p.id}>
            <TableCell className="font-medium">{p.student?.name}</TableCell>
            <TableCell>{p.student_id}</TableCell>
            <TableCell>
              {p.student?.monthPayments?.map((p) => {
              return <TableCell key={p.student_id}>
                {p.month_1 ? <div className="p-2 rounded-full flex justify-center items-center bg-green-100 dark:bg-green-900"><Check /></div>: <div className="p-2 rounded-full flex justify-center items-center bg-red-100 dark:bg-red-900"><X /></div>}
              </TableCell>
            })}
            </TableCell>
            <TableCell>
              {p.student?.monthPayments?.map((p) => {
              return <TableCell key={p.student_id}>
                {p.month_2 ? <div className="p-2 rounded-full flex justify-center items-center bg-green-100 dark:bg-green-900"><Check /></div>: <div className="p-2 rounded-full flex justify-center items-center bg-red-100 dark:bg-red-900"><X /></div>}
              </TableCell>
            })}
            </TableCell>
            <TableCell>
              {p.student?.monthPayments?.map((p) => {
              return <TableCell key={p.student_id}>
                {p.month_3 ? <div className="p-2 rounded-full flex justify-center items-center bg-green-100 dark:bg-green-900"><Check /></div>: <div className="p-2 rounded-full flex justify-center items-center bg-red-100 dark:bg-red-900"><X /></div>}
              </TableCell>
            })}
            </TableCell>
            <TableCell>
              {p.student?.monthPayments?.map((p) => {
              return <TableCell key={p.student_id}>
                {p.month_4 ? <div className="p-2 rounded-full flex justify-center items-center bg-green-100 dark:bg-green-900"><Check /></div>: <div className="p-2 rounded-full flex justify-center items-center bg-red-100 dark:bg-red-900"><X /></div>}
              </TableCell>
            })}
            </TableCell>
            <TableCell>
              {p.student?.monthPayments?.map((p) => {
              return <TableCell key={p.student_id}>
                {p.month_5 ? <div className="p-2 rounded-full flex justify-center items-center bg-green-100 dark:bg-green-900"><Check /></div>: <div className="p-2 rounded-full flex justify-center items-center bg-red-100 dark:bg-red-900"><X /></div>}
              </TableCell>
            })}
            </TableCell>
            <TableCell>
              {p.student?.monthPayments?.map((p) => {
              return <TableCell key={p.student_id}>
                {p.month_6 ? <div className="p-2 rounded-full flex justify-center items-center bg-green-100 dark:bg-green-900"><Check /></div>: <div className="p-2 rounded-full flex justify-center items-center bg-red-100 dark:bg-red-900"><X /></div>}
              </TableCell>
            })}
            </TableCell>
            <TableCell>
              {p.student?.monthPayments?.map((p) => {
              return <TableCell key={p.student_id}>
                {p.month_7 ? <div className="p-2 rounded-full flex justify-center items-center bg-green-100 dark:bg-green-900"><Check /></div>: <div className="p-2 rounded-full flex justify-center items-center bg-red-100 dark:bg-red-900"><X /></div>}
              </TableCell>
            })}
            </TableCell>
            <TableCell>
              {p.student?.monthPayments?.map((p) => {
              return <TableCell key={p.student_id}>
                {p.month_8 ? <div className="p-2 rounded-full flex justify-center items-center bg-green-100 dark:bg-green-900"><Check /></div>: <div className="p-2 rounded-full flex justify-center items-center bg-red-100 dark:bg-red-900"><X /></div>}
              </TableCell>
            })}
            </TableCell>
            <TableCell className="flex gap-2 p-4">
              <AlertDialog>
            <AlertDialogTrigger><FiEdit size={18} className="cursor-pointer text-blue-500" /></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Update Payment</AlertDialogTitle>
                  <AlertDialogDescription>
                    Confirm updating the payment status for
                    <form onSubmit={() => formik.handleSubmit} className="w-full mt-4 grid gap-4">
                      <div className="grid">
                        <div className="grid gap-2">
                        <Label>Amount</Label>
                        <Input onChange={() => formik.handleChange} onBlur={formik.handleBlur} name="Amount" value={formik.values.amount} placeholder="Amount" />
                        </div>
                        <p className="text-red-500 font-bold">{formik.touched.amount && formik.errors.amount}</p>
                      </div>
                      <div className="grid">
                        <Select onValueChange={(v) => formik.setFieldValue("year", v)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Years" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((y, i) => {
                            return <SelectItem key={i} value={JSON.stringify(y.year)}>{y.year}</SelectItem>
                          })}
                        </SelectContent>
                      </Select>
                       <p className="text-red-500 font-bold">{formik.touched.year && formik.errors.year}</p>
                      </div>
                      <div className="grid">
                        <Select onValueChange={(v) => formik.setFieldValue("month", v)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Months" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            months.map((m, i) => {
                              return <SelectItem key={i} value={m.month}>{m.month}</SelectItem>
                            })
                          }
                        </SelectContent>
                      </Select>
                       <p className="text-red-500 font-bold">{formik.touched.month && formik.errors.month}</p>
                      </div>
                    </form>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() =>  {formik.setFieldValue("id", p.id),
                    formik.setFieldValue("student_id", p.student_id)
                  }} disabled={updatePaymentIsPending}>{updatePaymentIsPending ? "Saving...": "Save"}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
            <AlertDialogTrigger><MdDelete size={18} className='cursor-pointer text-red-500' /></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Payment</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this
                    payment and remove there data relations.
                    <form onSubmit={() => formik.handleSubmit} className="w-full mt-4 grid gap-4">
                      <div className="grid">
                        <div className="grid gap-2">
                        <Label>Student ID</Label>
                        <Input onChange={() => formik.handleChange} onBlur={formik.handleBlur} name="student_id" value={formik.values.student_id} placeholder="Student ID" />
                        </div>
                        <p className="text-red-500 font-bold">{formik.touched.student_id && formik.errors.student_id}</p>
                      </div>
                      <div className="grid">
                        <div className="grid gap-2">
                        <Label>Amount</Label>
                        <Input onChange={() => formik.handleChange} onBlur={formik.handleBlur} name="Amount" value={formik.values.amount} placeholder="Amount" />
                        </div>
                        <p className="text-red-500 font-bold">{formik.touched.amount && formik.errors.amount}</p>
                      </div>
                      <div className="grid">
                        <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Years" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((y, i) => {
                            return <SelectItem key={i} value={JSON.stringify(y.year)}>{y.year}</SelectItem>
                          })}
                        </SelectContent>
                      </Select>
                       <p className="text-red-500 font-bold">{formik.touched.year && formik.errors.year}</p>
                      </div>
                      <div className="grid">
                        <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Months" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            months.map((m, i) => {
                              return <SelectItem key={i} value={m.month}>{m.month}</SelectItem>
                            })
                          }
                        </SelectContent>
                      </Select>
                       <p className="text-red-500 font-bold">{formik.touched.month && formik.errors.month}</p>
                      </div>
                    </form>
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
  )
}

export default ItPayment