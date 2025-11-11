import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full h-screen flex flex-col'>
      <div className='grow h-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
