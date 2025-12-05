import type { IFullStudentProp } from './student.types'

export interface allPayment {
  ok: boolean
  totalPage: number
  payments: IFullStudentProp[]
}

export interface Payment {
  id: string
  amount: number
  student_id: number
  month: string
  year: number
  createdAt: Date
  updatedAt: Date
  student: IFullStudentProp
}

export interface MonthPayment {
  id: string
  student_id: number
  month_1: boolean
  month_2: boolean
  month_3: boolean
  month_4: boolean
  month_5: boolean
  month_6: boolean
  month_7: boolean
  month_8: boolean
}

export interface addPaymentBody {
  amount: number
  student_id: string
  month: string
  year: string
}

export interface updatePaymentBody {
  id: string
  amount: number
  student_id: string
  month: string
  year: string
}

export interface IGetAllPayments {
  ok: boolean
  totalPage: number
  payments: Payment[]
}
