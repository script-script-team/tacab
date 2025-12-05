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
import { FiEdit } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useUpdatePayment } from "@/react-query/payment.hooks";
import { useEffect } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as yup from "yup";
import { useQueryClient } from "@tanstack/react-query";

function UpdatePaymentDialog({ id, student_id }: { id: string; student_id: number; }) {

    const client = useQueryClient();
    const { mutate, isPending, isError, error} = useUpdatePayment();

    const formik = useFormik({
    initialValues: {
      id: "",
      student_id: "",
      amount: "",
      month: "",
      year: "",
    },
    onSubmit(values) {
      mutate(values, {
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

  return (
    <AlertDialog>
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
        disabled={isPending}
        onClick={() => {
          formik.setFieldValue("id", id);
          formik.setFieldValue("student_id", student_id);
          formik.handleSubmit();
        }}
      >
        {isPending ? "Saving..." : "Save"}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default UpdatePaymentDialog