import React, { useEffect } from 'react';
import { CreditCard, Calendar, DollarSign, Check, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { usePayment } from '@/react-query/payment.hook';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import type { MonthPayment } from '@/types/payment.type';

const Payment: React.FC = () => {
    const data = useSelector((state: RootState) => state.student.result)
    const { data: payments, isLoading, isError, error } = usePayment(data?.student.id)
    const navigate = useNavigate()

    useEffect(() => {
        if (!data?.student?.name || !data?.student?.student_code || !data?.student?.marks) {
            navigate('/')
        }
    }, [data, navigate])

    useEffect(() => {
        if (isError) {
            toast.error(error.message)
        }
    }, [isError, error])

    if (!data || !data.student || !data?.student?.marks) {
        return null
    }

    if (isLoading || !payments) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Student Payments</h1>
                        <p className="text-gray-500 text-sm">Manage and track your tuition fee history</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                <DollarSign size={24} />
                            </div>
                            <div>
                                <p className="text-sm">Total Paid</p>
                                <p className="text-xl font-bold text-gray-500">${payments?.payments?.reduce((sum: number, p: any) => sum + (p.amount || 0), 0).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <p className="text-sm">Last Payment</p>
                                <p className="text-xl font-bold text-gray-500">
                                    {payments?.payments?.[0] ? `${payments?.payments?.[0]?.month} ${payments?.payments?.[0]?.year}` : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <p className="text-sm">Student ID</p>
                                <p className="text-xl font-bold text-gray-500">#{data.student.id || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl shadow-sm border overflow-hidden">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="font-semibold">Payment History</h2>
                        <div className="relative">
                            <Input type="text" placeholder="Search payments..." />
                        </div>
                    </div>
                    <div className="overflow-x-auto p-5">
                        <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='py-4 font-semibold'>ID</TableHead>
          <TableHead className='py-4 font-semibold'>Student Name</TableHead>

          {Array.from({ length: 8 }).map((_, i) => (
            <TableHead key={i} className='py-4 font-semibold text-center'>
              Month {i + 1}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {payments?.payments?.map((pay) => (
          <TableRow
            key={pay.id}
            className='transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/20'
          >
            <TableCell className='py-4'>{pay.id}</TableCell>
            <TableCell className='py-4 font-medium'>{pay?.student.name}</TableCell>

            {(() => {
              const mp = pay?.student?.monthPayments?.[0]

              return Array.from({ length: 8 }).map((_, index) => {
                const key = `month_${index + 1}` as keyof MonthPayment
                const value = mp?.[key]

                return (
                  <TableCell key={index} className='text-center py-3'>
                    {value ? (
                      <div
                        className='
                          px-2 py-2 rounded-full w-fit mx-auto
                          bg-emerald-100 dark:bg-emerald-900/40 
                          border border-emerald-300 dark:border-emerald-800
                          text-emerald-700 dark:text-emerald-300
                          flex justify-center items-center gap-1
                          font-medium text-sm
                          shadow-sm
                        '
                      >
                        <Check className='w-4 h-4' />
                      </div>
                    ) : (
                      <div
                        className='
                          px-2 py-2 rounded-full w-fit mx-auto
                          bg-red-100 dark:bg-red-900/40 
                          border border-red-300 dark:border-red-800
                          text-red-700 dark:text-red-300
                          flex justify-center items-center gap-1
                          font-medium text-sm
                          shadow-sm
                        '
                      >
                        <X className='w-4 h-4' />
                      </div>
                    )}
                  </TableCell>
                )
              })
            })()}
          </TableRow>
        ))}
      </TableBody>
    </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;