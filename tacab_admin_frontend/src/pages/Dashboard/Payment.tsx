import { Button } from "@/components/ui/button";
import {
  useGetAllComputerPayments,
  useGetAllItPayments,
} from "@/react-query/payment.hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ItPayment from "../../components/ItPaymentTable";
import ComputerPayment from "../../components/ComputerPaymentTable";
import { NewPaymentDialog } from "@/components/NewPaymentDialog";

export const months = [
  {
    month: "January",
  },
  {
    month: "February",
  },
  {
    month: "March",
  },
  {
    month: "April",
  },
  {
    month: "May",
  },
  {
    month: "June",
  },
  {
    month: "July",
  },
  {
    month: "August",
  },
  {
    month: "September",
  },
  {
    month: "October",
  },
  {
    month: "November",
  },
  {
    month: "December",
  },
];

function Payment() {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("it");
  const { data, isLoading, isError, error } = useGetAllItPayments(page);
  const {
    data: comData,
    isLoading: comIsLoading,
    isError: comIsError,
    error: comError,
  } = useGetAllComputerPayments(page);

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
    if (comIsError) {
      toast.error(comError.message);
    }
  }, [isError, comIsError]);

  return (
    <div className="w-full">
      <div className="w-full rounded-lg p-4 bg-white dark:bg-gray-950 min-h-[83.5vh]">
        <div className="w-full flex justify-end">
          <NewPaymentDialog />
        </div>

        <Tabs className="w-full" defaultValue="it">
          <div className="w-full flex justify-between items-center mt-4">
            <TabsList>
              <TabsTrigger onClick={() => {
                setSelected("it")
                setPage(1);
              }} value="it">
                IT Students
              </TabsTrigger>
              <TabsTrigger
                onClick={() => {
                  setSelected("computer");
                  setPage(1);
                }}
                value="computer"
              >
                Computer Students
              </TabsTrigger>
            </TabsList>
            {selected === "it" ? (
              <div className="flex gap-2">
                <Button
                  className="cursor-pointer"
                  disabled={isLoading || page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  className="cursor-pointer"
                  disabled={isLoading || page >= data?.totalPage!}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight />
                </Button>
              </div>
            ) : (
              selected === "computer" && (
                <div className="flex gap-2">
                  <Button
                    className="cursor-pointer"
                    disabled={comIsLoading || page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    className="cursor-pointer"
                    disabled={comIsLoading || page >= comData?.totalPage!}
                    onClick={() => setPage(page + 1)}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              )
            )}
          </div>

          {/* IT TAB */}
          <TabsContent value="it">
            <ItPayment page={page} />
          </TabsContent>

          {/* COMPUTER TAB */}
          <TabsContent value="computer">
            <ComputerPayment page={page} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Payment;
