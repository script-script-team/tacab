import { Outlet, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { useEffect } from "react"

function Home() {

  const navigate = useNavigate();
  // const login = useSelector((state: RootState) => state.loginSlice);

  // useEffect(() => {
  //   if(login.data.success) {
  //     navigate("/");
  //   }else {
  //     navigate("/auth/login");
  //   }
  // }, [])

  const m = localStorage.getItem("login");
  useEffect(() => {
    if(m) {
      navigate("/")
    }else(
      navigate("/auth/login")
    )
  }, [])

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <Header />
      <div className="h-s">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default Home