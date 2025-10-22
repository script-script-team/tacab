import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"

function Home() {

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="grow">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default Home