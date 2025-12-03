import { Button } from "@/components/ui/button";
import { useAddPayment, useGetAllComputerPayments, useGetAllItPayments } from "@/react-query/payment.hooks"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ItPayment from "./ItPayment";
import ComputerPayment from "./ComputerPayment";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFormik } from "formik";
import * as yup from "yup"
import { useQueryClient } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";

  export const years = [
      {
        year: new Date().getFullYear() - 6
      },
      {
        year: new Date().getFullYear() - 5
      },
      {
        year: new Date().getFullYear() - 4
      },
      {
        year: new Date().getFullYear() - 3
      },
      {
        year: new Date().getFullYear() - 2
      },
      {
        year: new Date().getFullYear() - 1
      },
      {
        year: new Date().getFullYear()
      },
    ]

  export const months = [
      {
        month: "January"
      },
      {
        month: "February"
      },
      {
        month: "March"
      },
      {
        month: "April"
      },
      {
        month: "May"
      },
      {
        month: "June"
      },
      {
        month: "July"
      },
      {
        month: "August"
      },
      {
        month: "September"
      },
      {
        month: "October"
      },
      {
        month: "November"
      },
      {
        month: "December"
      }
    ]

function Payment() {

    const client = useQueryClient();
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState("it");
    const {data, isLoading, isError, error} = useGetAllItPayments(page);
    const {data: comData, isLoading: comIsLoading, isError: comIsError, error: comError} = useGetAllComputerPayments(page);
    const { mutate: addPayment, isPending: addPaymentIsPending, isError: addPaymentIsError, error: addPaymentError } = useAddPayment();
    useEffect(() => {
      if(addPaymentIsError) {
        toast.error(addPaymentError.message);
      }
    }, [addPaymentIsError]);
    
    const formik = useFormik({
      initialValues: {
        student_id: "",
        amount: "",
        month: "",
        year: ""
      },
      onSubmit(values) {
        const data  = {
          ...values
        }
        addPayment(data, {onSuccess(){
          client.invalidateQueries({queryKey: ["all-payments"]})
        }})
      },
      validationSchema: yup.object({
        student_id: yup.number().typeError("Student ID must be a valid digit").required("Student ID is required"),
        amount: yup.number().typeError("Amount must be a valid digit").required("Amount is required"),
        month: yup.string().required("Month is required"),
        year: yup.number().typeError("Year must be a valid digit").required("Year is required")
      })
    });

    useEffect(() => {
        if(isError) {
            toast.error(error.message);
        }
        if(comIsError) {
            toast.error(comError.message);
        }
    }, [isError, comIsError]);

  return (
    <div className="w-full">
      <div className="w-full rounded-lg p-4 bg-white dark:bg-gray-950 min-h-[83.5vh]">
          <div className="w-full flex justify-end">
            <AlertDialog>
            <AlertDialogTrigger><Button><Plus />Add payment</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Add Payment</AlertDialogTitle>
                  <AlertDialogDescription>
                    Confirm adding a payment for students
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
                  <AlertDialogAction disabled={addPaymentIsPending}>{addPaymentIsPending ? "Adding...": "Add"}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Tabs className="w-full" defaultValue='it'>
        <div className="w-full flex justify-between items-center mt-4">
              <TabsList>
                <TabsTrigger onClick={() => setSelected('it')} value='it'>
                  IT Students
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => setSelected('computer')}
                  value='computer'>
                  Computer Students
                </TabsTrigger>
              </TabsList>
              {
                selected === "it" ? <div className="flex gap-2">
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
                    page >= data?.totalPage!
                  }
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight />
                </Button>
              </div>: selected === "computer" && <div className="flex gap-2">
                <Button
                  className='cursor-pointer'
                  disabled={comIsLoading || page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  className='cursor-pointer'
                  disabled={
                    comIsLoading ||
                    page >= comData?.totalPage!
                  }
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight />
                </Button>
              </div>
              }
              </div>
            
              {/* IT TAB */}
              <TabsContent value='it'>
                  <ItPayment page={page} />
              </TabsContent>

              {/* COMPUTER TAB */}
              <TabsContent value='computer'>
                <ComputerPayment page={page} />
              </TabsContent>
          </Tabs>
        </div>
      </div>
  )
}

export default Payment