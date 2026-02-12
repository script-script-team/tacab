export interface Payment {
    id: string;
    amount: number;
    student_id: number;
    month: string;
    year: number;
    createdAt: string;
    updatedAt: string;
}

export interface MonthPayment {
  id: string;
  student_id: number;
  month_1: any;
  month_2: any;
  month_3: any;
  month_4: any;
  month_5: any;
  month_6: any;
  month_7: any;
  month_8: any;
}

export interface PaymentWithStudent extends Payment {
  student: {
    id: number;
    monthPayments: MonthPayment | null;
    [key: string]: any;
  };
}