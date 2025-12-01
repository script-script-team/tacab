import type { IMonthPayment, IPayment } from '@/pages/types/student.types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shortText = (text: string) => {
  const short = text.slice(0, 6) + '...'
  return short
}

export const calculateTotalPayment = (payments: IPayment[]): number => {
  if (!payments) return 0
  return payments.reduce((sum, p) => sum + p.amount, 0)
}

export const calculateProgress = (monthPayments: IMonthPayment[] | null) => {
  if (!monthPayments || !monthPayments[0]) return { percent: 0, count: 0 }

  const mp = monthPayments[0]

  const months = [
    mp.month_1,
    mp.month_2,
    mp.month_3,
    mp.month_4,
    mp.month_5,
    mp.month_6,
    mp.month_7,
    mp.month_8,
  ]

  const paidCount = months.filter(Boolean).length
  const percent = (paidCount / 8) * 100

  return { percent, count: paidCount }
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
