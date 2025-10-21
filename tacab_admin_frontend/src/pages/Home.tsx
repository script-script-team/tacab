import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from './redux/store'

function Home() {
  const isAdmin = useSelector((state: RootState) => state.loginSlice.admin)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAdmin) {
      navigate('/')
    } else navigate('/auth/login')
  }, [isAdmin, navigate])

  return (
    <div className='w-full h-screen flex flex-col'>
      <div className='grow'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
