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
import { useDeletePayment } from "@/react-query/payment.hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

function DeletePaymentDialog({ id }: { id: string }) {

    const client = useQueryClient();
    const { mutate, isPending, isError, error } = useDeletePayment();

      useEffect(() => {
        if(isError) {
            toast.error(error?.message);
        }
      }, [isError]);

  return (
    <AlertDialog>
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
            disabled={isPending}
            onClick={() =>
              mutate(id, {
                onSuccess() {
                  client.invalidateQueries({
                    queryKey: ["all-payments"],
                  });
                },
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePaymentDialog;