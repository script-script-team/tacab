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
