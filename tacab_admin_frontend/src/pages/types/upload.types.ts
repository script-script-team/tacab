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

export interface IExtractFile {
  ok: boolean
  subject: string
  data: IStudentProp[]
}

export interface ISaveUpload {
  ok: boolean
  message: string
  uploadId: string
  summary: {
    total: number
    success: number
    errors: number
    duplicates: number
    updated: number
    new: number
  }
}

export interface IGetSingleUploadRes {
  ok: boolean
  upload: IUploadProp
  students: IStudentProp[]
}

export interface IUpdateUploadRes {
  ok: boolean
  message: string
}
