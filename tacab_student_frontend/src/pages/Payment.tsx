import React, { useEffect, useState } from 'react';
import { CreditCard, Calendar, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePayment } from '@/react-query/payment.hook';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Payment: React.FC = () => {
    const data = useSelector((state: RootState) => state.student.result)
    const [page, setPage] = useState(1);
    const { data: paymentsData, isLoading, isError, error } = usePayment(data?.student?.id, page)
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

    if (isLoading || !paymentsData) {
        return <div className="flex h-screen items-center justify-center">Loading payments...</div>
    }

    const paymentList = paymentsData.payments || [];
    const lastPayment = paymentList.length > 0 ? paymentList[paymentList.length - 1] : null;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PAID':
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">Paid</span>;
            case 'PARTIALLY_PAID':
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">Partial</span>;
            case 'UNPAID':
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">Unpaid</span>;
            default:
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">{status}</span>;
        }
    };

    return (
        <div className='flex flex-col'>
        <Header id={data?.student?.id} studentName={data?.student?.name?.[0].toUpperCase()} />
        <div className="min-h-screen mt-16 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Student Payments</h1>
                        <p className="text-gray-500 text-sm">Manage and track your tuition fee history</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                <DollarSign size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Paid</p>
                                <p className="text-2xl font-bold text-gray-500">${paymentsData.totalPayment}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Last Payment</p>
                                <p className="text-2xl font-bold text-gray-500">
                                    {lastPayment ? `${lastPayment.month}/${lastPayment.year}` : 'N/A'}
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
                                <p className="text-sm font-medium text-gray-500">Student ID</p>
                                <p className="text-2xl font-bold text-gray-500">#{data?.student?.student_code || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl shadow-sm border overflow-hidden">
                    <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-lg font-semibold">Payment History</h2>
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
                  disabled={isLoading || page >= (paymentsData.totalPage ?? 0)}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight />
                </Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="py-4 font-semibold">Date</TableHead>
                                    <TableHead className="py-4 font-semibold">Month/Year</TableHead>
                                    <TableHead className="py-4 font-semibold">Status</TableHead>
                                    <TableHead className="py-4 font-semibold text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paymentList.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8">
                                            No payment records found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paymentList.map((pay) => (
                                        <TableRow key={pay.id}>
                                            <TableCell className="py-4">
                                                {new Date(pay.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="py-4 font-medium">
                                                {pay.month} / {pay.year}
                                            </TableCell>
                                            <TableCell className="py-4">
                                                {getStatusBadge(pay.status)}
                                            </TableCell>
                                            <TableCell className="py-4 text-right font-bold">
                                                ${pay.amount.toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    );
};

export default Payment;