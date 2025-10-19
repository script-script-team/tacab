import { Outlet, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useEffect } from "react"
// import type { RootState } from "./redux/store";
// import { useSelector } from "react-redux";

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
    <div className="w-full h-screen flex flex-col">
     
      <div className="grow">
        <Outlet />
      </div>
    </div>
  )
}

export default Home