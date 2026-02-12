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
