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
import {
  useGetAllComputerPayments,
} from "@/react-query/payment.hooks";
import { useEffect } from "react";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import type { MonthPayment } from "../pages/types/payment.type";
import DeletePaymentDialog from "./DeletePaymentDialog";
import UpdatePaymentDialog from "./UpdatePaymentDialog";

function ComputerPayment({ page }: { page: number }) {
  const { data, isLoading, isError, error } = useGetAllComputerPayments(page);

  useEffect(() => {
    if (isError) toast.error(error.message);
  }, [isError]);

  return isLoading ? (
    <Loading />
  ) : (
    <Table>
      <TableCaption>A list of your recent computer payments.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Student Name</TableHead>

          {Array.from({ length: 8 }).map((_, i) => (
            <TableHead key={i} className="text-center">
              Book {i + 1}
            </TableHead>
          ))}

          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.payments.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.student_code}</TableCell>
            <TableCell className="font-medium">{p?.name}</TableCell>

            {(() => {
              const mp = p.monthPayments?.[0];
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
              <DeletePaymentDialog id={p.monthPayments?.[0]?.id} />
              <UpdatePaymentDialog id={p.monthPayments?.[0]?.id} student_id={p.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ComputerPayment;
