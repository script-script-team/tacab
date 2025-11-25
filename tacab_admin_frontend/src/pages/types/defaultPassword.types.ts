export interface IDefaultPasswordRes {
  ok: boolean
  defaultPassword: IDefaultPassword
}

export interface IDefaultPassword {
  id: number
  password: string
  updatedAt: string
}
