import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddPayment } from "@/react-query/payment.hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
  amount: number;
  student_id: number;
  month: string;
  year: string;
}

export function NewPaymentDialog() {
  const { mutate: createPayment, isPending } = useAddPayment();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      amount: 0,
      student_id: 0,
      month: "",
      year: String(new Date().getFullYear()),
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      createPayment(data, {
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({ queryKey: ["all-payments"] });
          toast.success(res.message || "Payment added successfully");
        },
        onError: (err: Error) => {
          toast.error(err.message || "Failed to add payment");
        },
      });
    } catch (err) {
      toast.error("Failed to add payment");
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Payment
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>New Payment</DialogTitle>
            <DialogDescription>
              Enter the payment information of the student.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 my-5">
            {/* Student ID */}
            <div className="grid gap-2">
              <Label htmlFor="student_id">Student ID</Label>
              <Input
                id="student_id"
                type="number"
                {...register("student_id", {
                  required: "Student ID is required",
                })}
              />
              {errors.student_id && (
                <p className="text-sm text-red-500">
                  {errors.student_id.message}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                {...register("amount", { required: "Amount is required" })}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>

            {/* Month */}
            <div className="grid gap-2">
              <Label htmlFor="month">Month</Label>
              <Input
                id="month"
                placeholder="e.g. January"
                {...register("month", { required: "Month is required" })}
              />
              {errors.month && (
                <p className="text-sm text-red-500">{errors.month.message}</p>
              )}
            </div>

            {/* Year */}
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                {...register("year", { required: "Year is required" })}
              />
              {errors.year && (
                <p className="text-sm text-red-500">{errors.year.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isSubmitting || isPending}>
              {isSubmitting || isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
