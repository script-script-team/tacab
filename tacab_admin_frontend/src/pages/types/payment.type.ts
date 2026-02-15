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
  status: string
  year: number
  createdAt: Date
  updatedAt: Date
  student: IFullStudentProp
}

export interface allFees {
  ok: boolean
  fees: Fee[]
}

export interface Fee {
  id: string
  subject: string
  amount: number
  updatedAt: string
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
