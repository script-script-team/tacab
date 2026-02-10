import type { RootState } from '@/pages/redux/store'
import { ROLE } from '@/pages/types/admin.types'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAdmin = useSelector((state: RootState) => state.loginSlice.admin)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAdmin.name) {
      if (isAdmin.role === ROLE.ADMIN) {
        navigate('/')
      } else {
        navigate('/manage-students')
      }
    } else {
      navigate('/auth/login', { replace: true })
    }
  }, [isAdmin, navigate])

  return isAdmin ? children : null
}
