import type { IAdminProp } from './admin.types'

export interface ILoginResponse {
  ok: boolean
  admin: IAdminProp
}

export interface Result {
  sub: string
  marks: string
}

export interface ILoginBody {
  id: string
  pass: string
}

export interface IWhoAmIRes {
  ok: boolean
  admin: IAdminProp
}
