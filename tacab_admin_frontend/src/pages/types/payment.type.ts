export interface allPayment {
    ok: boolean;
    payments: Payments[]
}

export interface Payments {
    id: string;
    amount: number;
    student_id: number;
    month: string;
    year: number;
    createdAt: Date;
    updatedAt: Date;
    student: Student;
}

export interface Student {
    id: string;
    student_code: string;
    name: string;
    phone_number: string;
    subject: string;
    createdAt: Date;
}