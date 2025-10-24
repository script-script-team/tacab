import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useEffect } from 'react'
import type { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

function Home() {
  const isResult = useSelector((state: RootState) => state.student.result)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isResult.student) {
      navigate('/result')
    }
  }, [isResult, navigate])

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <div className='grow'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Home
