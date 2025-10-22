import type { IAdminProp } from './admin.types'
import type { IStudentProp } from './student.types'

export interface IUploadInfo {
  term: string
  year: number
  admin: string
  number_of_students: number
}

export interface IUploadProp {
  id: string
  term: string
  year: number
  upload_by: number
  createdAt: string
  updatedAt: string
  admin: IAdminProp
  students: IStudentProp[]
}

export interface IGetAllUploadRes {
  ok: boolean
  total: number
  uploads: IUploadProp[]
}
