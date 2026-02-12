import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { IPayment } from '@/pages/types/student.types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shortText = (text: string) => {
  return text.length > 6 ? text.slice(0, 6) + '...' : text
}

export const calculateTotalPayment = (payments: IPayment[]): number => {
  if (!payments) return 0
  return payments.reduce((sum, p) => sum + p.amount, 0)
}

export const calculateProgress = (payments: IPayment[] | undefined) => {
  if (!payments || payments.length === 0) return { percent: 0, count: 0 }

  // Count unique months that are fully PAID
  const paidMonths = new Set(
    payments
      .filter((p) => p.status === 'PAID')
      .map((p) => `${p.month}-${p.year}`)
  )

  const paidCount = paidMonths.size
  // Assuming 8 months course duration as per previous logic
  const percent = Math.min((paidCount / 8) * 100, 100)

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
