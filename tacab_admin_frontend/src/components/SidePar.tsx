import Logo from "./ui/Logo"
import { PiStudentFill } from "react-icons/pi";
import { RiUserSettingsLine, RiUploadCloud2Fill } from "react-icons/ri";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function SidePar() {

  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();
  const opt = [
    {
      name: "Dashboard",
      path: "/",
      icon: <TbLayoutDashboardFilled />
    },
    {
      name: "Upload Results",
      path: "/uploads",
      icon: <RiUploadCloud2Fill />
    },
    {
      name: "Manage Uploads",
      path: "/results",
      icon: <FaClipboardList />
    },
    {
      name: "Manage Students",
      path: "/students",
      icon: <PiStudentFill />
    },
    {
      name: "Manage admins",
      path: "/admins",
      icon: <RiUserSettingsLine />
    }
  ]

  return (
    <div className="flex flex-col md:h-[95vh] lg:h-[95vh] xl:h-[95vh] xs:gap-4 p-4 rounded-lg md:w-[250px] lg:w-[250px] xl:w-[250px] sm:w-full xs:w-full bg-white dark:bg-gray-950">

      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
        <Logo />
        <h2>Tacab</h2>
      </div>

      <h2 className="text-lg text-gray-400 font-[500]">Menu</h2>

      <div className="flex md:flex-col lg:flex-col xl:flex-col xs:justify-between sm:justify-between md:gap-4 lg:gap-4 xl:gap-4 sm:flex-row xs:flex-row">
        {opt.map((opt, index) => {
          return <div onClick={() => navigate(`${opt.path}`)} key={index} className={`cursor-pointer flex items-center gap-3 rounded-tr-md rounded-br-md ${opt.path === path ? "bg-gray-100 dark:bg-gray-800": ""} relative before:-translate-y-8 overflow-hidden before:content-[''] before:w-[5px] before:h-full ${opt.path === path ? "before:bg-green-500 before:translate-y-0": ""} before:left-0 before:absolute before:rounded-full before:duration-700`}>
            <div className={`w-8 h-8 xs:rounded-full sm:rounded-full md:rounded-sm lg:rounded-sm xl:rounded-sm ${opt.path === path ? "text-black dark:text-white": "bg-blue-500 text-white dark:text-black"} flex justify-center items-center`}>
              {opt.icon}
            </div>
            <h2 className="text-sm sm:hidden xs:hidden md:block lg:block xl:block">{opt.name}</h2>
          </div>
        })}
      </div>
      </div>
      
    </div>
  )
}

export default SidePar