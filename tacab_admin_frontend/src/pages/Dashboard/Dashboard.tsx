import SidePar from "@/components/SidePar"
import { Outlet } from "react-router-dom"

function Dashboard() {
  return (
    <div className="p-4 bg-gray-200 dark:bg-gray-700 flex gap-4 md:flex-row lg:flex-row xl:flex-row sm:flex-col xs:flex-col">
      <SidePar />
      <Outlet />
    </div>
  )
}

export default Dashboard