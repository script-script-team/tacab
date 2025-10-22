import { Theme } from "@/components/mode-toggle"
import Logo from "@/components/ui/Logo"
import { Link } from "react-router-dom"
import { Button } from "./ui/button";
import { IoMenu } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/auth/login.slice";

function Header() {

  const dispatch = useDispatch<AppDispatch>();

  const nav = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "About",
      path: "/about"
    },
    {
      name: "Services",
      path: "/services"
    },
    {
      name: "Help",
      path: "/help"
    },
  ]

  const [loc, setLoc] = useState("/");

  return (
    <div className="w-full fixed z-10 p-2 flex justify-between items-center bg-gray-900">
      <Logo />
      <div className="nav flex gap-3 px-4 py-1 rounded-full justify-center items-center">
        {nav.map((link, index) => (
          <Link key={index} onClick={() => setLoc(link.path)} className={`${link.path === loc ? "bg-white text-black px-4": "text-white"} rounded-full flex`} to={link.path}>{link.name}</Link>
        ))}
      </div>

      <div className="flex gap-2 justify-between items-center">
        <Popover>
          <PopoverTrigger><IoMenu className="text-white text-4xl cursor-pointer" /></PopoverTrigger>
          <PopoverContent>
            <Button onClick={() => {
              dispatch(logout())
        }} className="cursor-pointer text-white bg-red-600 hover:bg-red-500"><IoIosLogOut />Logout</Button>
            </PopoverContent> 
        </Popover>
        <Theme />
      </div>
    </div>
  )
}

export default Header