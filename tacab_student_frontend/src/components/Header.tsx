import { Theme } from "@/components/mode-toggle"
import Logo from "@/components/ui/Logo"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button";
import { IoMenu } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function Header() {

  const navigate = useNavigate();
  const login = localStorage.getItem("login");

  return (
    <div className="w-full fixed z-10 p-2 flex justify-between items-center bg-gray-900">
      <Logo />
      <div className="nav flex gap-3 px-4 py-1 rounded-full justify-center items-center">
        <Link className="hover:text-gray-700 text-white" to="/">Home</Link>
        <Link className="hover:text-gray-700 text-white" to="/about">About</Link>
        <Link className="hover:text-gray-700 text-white" to="/services">Services</Link>
        <Link className="hover:text-gray-700 text-white" to="/help">Help</Link>
      </div>

      <div className="flex gap-2 justify-between items-center">
        {login &&
        <Popover>
          <PopoverTrigger><IoMenu className="text-white text-4xl cursor-pointer" /></PopoverTrigger>
          <PopoverContent>
            <Button onClick={() => {
          localStorage.removeItem("login");
          navigate("/auth/login");
          window.location.reload();
        }} className="cursor-pointer text-white bg-red-600 hover:bg-red-500"><IoIosLogOut />Logout</Button>
            </PopoverContent> 
        </Popover>
        }
        <Theme />
      </div>
    </div>
  )
}

export default Header