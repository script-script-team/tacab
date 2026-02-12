import React, { useEffect } from 'react';
import { CreditCard, Calendar, DollarSign, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePayment } from '@/react-query/payment.hook';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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

    const totalPaid = Array.isArray(payments) 
        ? payments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0)
        : 0;

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
                                <p className="text-xl font-bold text-gray-500">${totalPaid.toFixed(2)}</p>
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
                                    {payments[0] ? `${payments[0].month} ${payments[0].year}` : 'N/A'}
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
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Period</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date Paid</TableHead>
                                    <TableHead className='text-right'>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-gray-500">No payment records found.</TableCell>
                                    </TableRow>
                                ) : (
                                    payments.map((payment: any) => (
                                        <TableRow key={payment.id}>
                                            <TableCell className="font-mono text-gray-500">{payment.id.substring(0, 8)}...</TableCell>
                                            <TableCell>
                                                <span className="font-medium text-gray-500">{payment.month} {payment.year}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-semibold text-gray-500">${payment.amount.toFixed(2)}</span>
                                            </TableCell>
                                            <TableCell className="text-gray-500">
                                                {new Date(payment.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors">
                                                    <Download size={18} />
                                                </Button>
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
    );
};

export default Payment;