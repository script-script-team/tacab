export interface allPayment {
  ok:        boolean;
  totalPage: number;
  payments:  Student[];
}


export interface Payment {
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
  id: number;
  student_code: number;
  name: string;
  phone_number: string;
  subject: string;
  createdAt: Date;
  monthPayments: MonthPayment[];
}

export interface MonthPayment {
  id: string;
  student_id: number;
  month_1: boolean;
  month_2: boolean;
  month_3: boolean;
  month_4: boolean;
  month_5: boolean;
  month_6: boolean;
  month_7: boolean;
  month_8: boolean;
}

export interface addPaymentBody {
  amount: number;
  student_id: number;
  month: string;
  year: string;
}

export interface updatePaymentBody {
  id: string;
  amount: string;
  student_id: string;
  month: string;
  year: string;
}
