export interface allPayment {
    ok:       boolean;
    payments: Payment[];
}

export interface Payment {
    id:         string;
    amount:     number;
    student_id: number;
    month:      string;
    year:       number;
    createdAt:  Date;
    updatedAt:  Date;
    student:    Student;
}

export interface Student {
    id:           number;
    student_code: number;
    name:         string;
    phone_number: string;
    subject:      string;
    createdAt:    Date;
}
