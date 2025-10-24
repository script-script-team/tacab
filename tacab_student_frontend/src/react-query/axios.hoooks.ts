import { BASE_API_URL } from '@/constant'
import axios from 'axios'

export const api = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
})
