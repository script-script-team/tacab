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

export interface income {
  ok:    boolean;
  total: Total[];
}

export interface Total {
  date:  string;
  total: number;
}

