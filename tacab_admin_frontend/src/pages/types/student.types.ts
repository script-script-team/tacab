export interface IStudentProp {
  name: string
  phone_number: string
  subject: number
  marks: IMarks
  totalPayment: number
}

export interface IMarks {
  id: string
  a_plus: number | null
  multimedia: number | null
  web_desing: number | null
  networking: number | null
  database: number | null
  programming: number | null
  windows: number | null
  word: number | null
  excel: number | null
  power_point: number | null
  access: number | null
  publisher: number | null
  outlook: number | null
  computer_literacy: number | null
  average: number | null
  grade: string
  createdAt: string
  updatedAt: string
}

export interface IPayment {
  id: string
  amount: number
  month: string
  year: number
  createdAt: string
  updatedAt: string
}

export interface IMonthPayment {
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

export interface IFullStudentProp {
  id: number
  password: string
  name: string
  student_code: number
  phone_number: string
  subject: string
  upload_id: string
  marks_id: string
  createdAt: string
  updatedAt: string
  marks: IMarks | null
  payments: IPayment[]
  monthPayments: IMonthPayment[] | null
  totalPayment: number
}

export interface IGetSingleStudentRes {
  ok: boolean
  student: IFullStudentProp
}

export interface IGetAllStudentsRes {
  ok: boolean
  total: number
  students: IFullStudentProp[]
}
