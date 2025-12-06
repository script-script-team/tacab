import type { IAdminProp } from './admin.types'
import type { IUploadProp } from './upload.types'

export interface IGetDashboardSummaryRes {
  ok: boolean
  data: {
    totalAdmins: number
    totalUploads: number
    totalStudents: number
    totalPayments: number
    recentUploads: IUploadProp
    admins: IAdminProp[]
  }
}
