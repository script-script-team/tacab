export interface ILoginResponse {
  success: boolean
  message: string
  result: Result[]
}

export interface Result {
  sub: string
  marks: string
}

export interface ILoginBody {
  id: string
  pass: string
}

export interface IGetResultRes {
  ok: boolean
  student: {
    id: number
    name: string
    phone_number: string
    subject: string
    upload_id: string
    marks_id: string
    createdAt: string
    updatedAt: string
    marks: {
      id: string
      a_plus: number | null
      multimedia: number | null
      web_desing: number | null
      networking: number
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
    uploads: {
      id: string
      term: string
      year: number
      upload_by: number
      createdAt: string
      updatedAt: string
    }
  }
}
