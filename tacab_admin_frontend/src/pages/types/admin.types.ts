export interface IAdminDashboardProp {
  name: string
  email: string
}

export interface IAdminProp {
  id: number
  email: string
  name: string
  phone_number: string
  main_admin: boolean
  createdAt: string
  updatedAt: string
}

export interface IGetALlAdminsRes {
  ok: boolean
  admins: IAdminProp[]
}

export interface IAdminSummary {
  ok: boolean
  data: {
    adminId: number
    totalUploads: number
    totalStudents: number
    recentUploads: IRecentUploadProp[]
  }
}

export interface IRecentUploadProp {
  id: string
  term: string
  year: number
  uploadDate: string
  studentCount: number
}
