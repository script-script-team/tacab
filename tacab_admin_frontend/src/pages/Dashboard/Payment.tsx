import { Button } from "@/components/ui/button";
import { useAddPayment, useGetAllItPayments } from "@/react-query/payment.hooks"
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

function Payment() {

    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState("");
    const {data, isLoading, isError, error} = useGetAllItPayments(page);
    const { mutate: addPayment, isPending: addPaymentIsPending, isError: addPaymentIsError, error: addPaymentError } = useAddPayment();
    useEffect(() => {
      if(addPaymentIsError) {
        toast.error(addPaymentError.message);
      }
    }, [addPaymentIsError]);

    useEffect(() => {
        if(isError) {
            toast.error(error.message);
        }
    }, [isError]);

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
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => addPayment("65")} disabled={addPaymentIsPending}>{addPaymentIsPending ? "Adding...": "Add"}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

        <div className="w-full flex justify-between items-center mt-4">
          <Tabs defaultValue='it'>
              <TabsList>
                <TabsTrigger onClick={() => setSelected('it')} value='it'>
                  IT Students
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => setSelected('computer')}
                  value='computer'
                >
                  Computer Students
                </TabsTrigger>
              </TabsList>
            
              {/* IT TAB */}
              <TabsContent value='it'>
                  <ItPayment page={page} />
              </TabsContent>

              {/* COMPUTER TAB */}
              <TabsContent value='computer'>
                
              </TabsContent>
          </Tabs>
           <div className="flex gap-2">
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
        </div>
        
    </div>
    </div>
  )
}

export default Payment