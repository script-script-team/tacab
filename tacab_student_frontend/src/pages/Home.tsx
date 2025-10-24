import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import type { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

function Home() {
  const isResult = useSelector((state: RootState) => state.student.result)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isResult.student) {
      navigate('/')
    }
  }, [isResult, navigate])

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Home
