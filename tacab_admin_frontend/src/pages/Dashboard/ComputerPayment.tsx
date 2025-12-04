import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { MdDelete } from "react-icons/md";
import {
  useDeletePayment,
  useGetAllComputerPayments,
  useUpdatePayment,
} from "@/react-query/payment.hooks";
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
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";
import * as yup from "yup";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import type { MonthPayment } from "../types/payment.type";

function ComputerPayment({ page }: { page: number }) {
  const client = useQueryClient();
  const { data, isLoading, isError, error } = useGetAllComputerPayments(page);

  const {
    mutate: updatePayment,
    isPending: updatePaymentIsPending,
    isError: updatePaymentIsError,
    error: updatePaymentError,
  } = useUpdatePayment();

  const {
    mutate: deletePayment,
    isPending: deletePaymentIsPending,
    isError: deletePaymentIsError,
    error: deletePaymentError,
  } = useDeletePayment();

  const formik = useFormik({
    initialValues: {
      id: "",
      student_id: "",
      amount: "",
      month: "",
      year: "",
    },
    onSubmit(values) {
      updatePayment(values, {
        onSuccess() {
          client.invalidateQueries({ queryKey: ["all-payments"] });
        },
      });
    },
    validationSchema: yup.object({
      amount: yup
        .number()
        .typeError("Amount must be a number")
        .required("Amount is required"),
      month: yup.string().required("Month is required"),
      year: yup
        .number()
        .typeError("Year must be a number")
        .required("Year is required"),
    }),
  });

  useEffect(() => {
    if (isError) toast.error(error.message);
  }, [isError]);

  useEffect(() => {
    if (updatePaymentIsError) toast.error(updatePaymentError.message);
    if (deletePaymentIsError) toast.error(deletePaymentError.message);
  }, [updatePaymentIsError, deletePaymentIsError]);

  return isLoading ? (
    <Loading />
  ) : (
    <Table>
      <TableCaption>A list of your recent computer payments.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Student Name</TableHead>

          {Array.from({ length: 3 }).map((_, i) => (
            <TableHead key={i} className="text-center">
              Book {i + 1}
            </TableHead>
          ))}

          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.payments.map((p) => (
          <TableRow key={p.student_id}>
            <TableCell>{p.student.student_code}</TableCell>
            <TableCell className="font-medium">{p.student?.name}</TableCell>

            {(() => {
              const mp = p.student.monthPayments[0];
              return Array.from({ length: 3 }).map((_, index) => {
                const key = `month_${index + 1}` as keyof MonthPayment;
                const value = mp[key];

                return (
                  <TableCell key={index} className="text-center py-3">
                    {value ? (
                      <div
                        className="
                        px-2 py-2 rounded-full w-fit mx-auto 
                        bg-emerald-100 dark:bg-emerald-900/40 
                        border border-emerald-300 dark:border-emerald-800
                        text-emerald-700 dark:text-emerald-300
                        flex justify-center items-center gap-1
                        font-medium text-sm shadow-sm
                      "
                      >
                        <Check className="w-4 h-4" />
                      </div>
                    ) : (
                      <div
                        className="
                        px-2 py-2 rounded-full w-fit mx-auto
                        bg-red-100 dark:bg-red-900/40 
                        border border-red-300 dark:border-red-800
                        text-red-700 dark:text-red-300
                        flex justify-center items-center gap-1
                        font-medium text-sm shadow-sm
                      "
                      >
                        <X className="w-4 h-4" />
                      </div>
                    )}
                  </TableCell>
                );
              });
            })()}

            <TableCell className="flex gap-2 p-4">
              {/* <AlertDialog>
                <AlertDialogTrigger>
                  <FiEdit size={18} className="cursor-pointer text-blue-500" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Update Payment</AlertDialogTitle>
                    <AlertDialogDescription>
                      <form className="w-full mt-4 grid gap-4">
                        <Label>Amount</Label>
                        <Input
                          name="amount"
                          value={formik.values.amount}
                          onChange={formik.handleChange}
                        />

                        <Label>Month</Label>
                        <Select
                          onValueChange={(v) =>
                            formik.setFieldValue("month", v)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="month_1">Month 1</SelectItem>
                            <SelectItem value="month_2">Month 2</SelectItem>
                            <SelectItem value="month_3">Month 3</SelectItem>
                          </SelectContent>
                        </Select>

                        <Label>Year</Label>
                        <Input
                          name="year"
                          value={formik.values.year}
                          onChange={formik.handleChange}
                        />
                      </form>
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      disabled={updatePaymentIsPending}
                      onClick={() => {
                        formik.setFieldValue("id", p.id);
                        formik.setFieldValue("student_id", p.student_id);
                        formik.handleSubmit();
                      }}
                    >
                      {updatePaymentIsPending ? "Saving..." : "Save"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog> */}

              {/* DELETE */}
              {/* <AlertDialog>
                <AlertDialogTrigger>
                  <MdDelete size={18} className="cursor-pointer text-red-500" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Payment</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action is irreversible.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      disabled={deletePaymentIsPending}
                      onClick={() =>
                        deletePayment(p.id, {
                          onSuccess() {
                            client.invalidateQueries({
                              queryKey: ["all-payments"],
                            });
                          },
                        })
                      }
                    >
                      {deletePaymentIsPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ComputerPayment;
