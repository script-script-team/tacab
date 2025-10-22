export interface IStudentProp {
  name: string
  phone_number: number
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
  book_1: number | null
  book_2: number | null
  book_3: number | null
  average: number | null
  grade: string
  createdAt: string
  updatedAt: string
}
