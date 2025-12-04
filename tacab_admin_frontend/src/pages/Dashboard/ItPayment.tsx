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
  useGetAllItPayments,
  useUpdatePayment,
} from "@/react-query/payment.hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
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
import { toast } from "sonner";
import Loading from "@/components/Loading";
import type { MonthPayment } from "../types/payment.type";

const ItPayment = ({ page }: { page: number }) => {
  const client = useQueryClient();

  const { data, isLoading, isError, error } = useGetAllItPayments(page);
  const { mutate: updatePayment, isPending: updatePaymentIsPending } =
    useUpdatePayment();
  const { mutate: deletePayment, isPending: deletePaymentIsPending } =
    useDeletePayment();

  useEffect(() => {
    if (isError) toast.error(error.message);
  }, [isError]);

  const formik = useFormik({
    initialValues: {
      id: "",
      student_id: "",
      amount: "",
      year: "",
      month: "",
    },
    validationSchema: yup.object({
      amount: yup.string().required("Amount is required"),
      year: yup.string().required("Select a year"),
      month: yup.string().required("Select a month"),
    }),
    onSubmit(values) {
      updatePayment(values, {
        onSuccess() {
          toast.success("Payment updated!");
          client.invalidateQueries({ queryKey: ["all-payments"] });
        },
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <Table>
      <TableCaption className="text-sm text-neutral-500 dark:text-neutral-400">
        A list of your recent payment.
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="py-4 font-semibold">ID</TableHead>
          <TableHead className="py-4 font-semibold">Student Name</TableHead>

          {/* === FIXED IT STUDENT 8 MONTHS === */}
          {Array.from({ length: 8 }).map((_, i) => (
            <TableHead key={i} className="py-4 font-semibold text-center">
              Month {i + 1}
            </TableHead>
          ))}

          <TableHead className="py-4 font-semibold text-center">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.payments?.map((pay) => (
          <TableRow
            key={pay.id}
            className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/20"
          >
            <TableCell className="py-4">{pay.student.student_code}</TableCell>
            <TableCell className="py-4 font-medium">
              {pay.student?.name}
            </TableCell>

            {/* === FIXED IT STUDENT: READ month_1 → month_8 === */}
            {(() => {
              const mp = pay.student.monthPayments[0]; // only object

              return Array.from({ length: 8 }).map((_, index) => {
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
                          font-medium text-sm
                          shadow-sm
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
                          font-medium text-sm
                          shadow-sm
                        "
                      >
                        <X className="w-4 h-4" />
                      </div>
                    )}
                  </TableCell>
                );
              });
            })()}

            <TableCell className="py-4">
              <div className="flex gap-3 justify-center">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <FiEdit
                      size={20}
                      className="cursor-pointer text-blue-500 hover:text-blue-600 transition"
                    />
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Update Payment</AlertDialogTitle>
                    </AlertDialogHeader>

                    <form
                      onSubmit={formik.handleSubmit}
                      className="grid gap-4 mt-4"
                    >
                      <Input
                        name="amount"
                        placeholder="Amount"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                      />
                      <p className="text-red-500">{formik.errors.amount}</p>

                      <p className="text-red-500">{formik.errors.year}</p>

                      <Select
                        onValueChange={(v) => formik.setFieldValue("month", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 8 }).map((_, i) => (
                            <SelectItem value={`month_${i + 1}`} key={i}>
                              Month {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <p className="text-red-500">{formik.errors.month}</p>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          type="submit"
                          onClick={() => {
                            formik.setFieldValue("id", pay.id);
                            formik.setFieldValue("student_id", pay.student_id);
                          }}
                        >
                          {updatePaymentIsPending ? "Saving..." : "Save"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger>
                    <MdDelete
                      size={20}
                      className="cursor-pointer text-red-500 hover:text-red-600 transition"
                    />
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Payment</AlertDialogTitle>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600 transition"
                        onClick={() =>
                          deletePayment(pay.id, {
                            onSuccess() {
                              toast.success("Payment deleted");
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
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ItPayment;
