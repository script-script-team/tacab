export interface IStudentProp {
  name: string
  phone_number: string
  subject: number
  marks: IMarks
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

export interface IFullStudentProp {
  id: number
  name: string
  phone_number: string
  subject: string
  upload_id: string
  marks_id: string
  createdAt: string
  updatedAt: string
  marks: IMarks
}

export interface IGetSingleStudentRes {
  ok: boolean
  student: IFullStudentProp
}

export interface IGetAllStudentsRes {
  ok: boolean,
  total: number,
  students: IFullStudentProp[]
}
