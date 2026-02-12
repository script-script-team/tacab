export interface PaymentsResponse {
    ok: boolean;
    totalPage: number;
    totalPayment: number;
    payments: Payment[];
}

export type PaymentStatus = 'PAID' | 'UNPAID' | 'PARTIALLY_PAID';

export interface Payment {
    id: string;
    amount: number;
    student_id: number;
    month: number;
    year: number;
    status: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
    student: Student;
}

export interface Student {
    id: number;
    student_code: number;
    password: string;
    name: string;
    phone_number: string;
    subject: string;
    upload_id: string;
    marks_id: string;
    createdAt: Date;
    updatedAt: Date;
}
