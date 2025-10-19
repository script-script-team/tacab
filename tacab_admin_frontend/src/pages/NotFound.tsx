import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function NotFound() {

    const navigate = useNavigate();

  return (
    <div style={{background: "rgba(0, 0, 0, 0.8)"}} className="w-full h-screen text-white flex justify-center items-center">
      <img className="absolute w-full h-screen object-cover -z-10" src="/space.jpg"/>
        <div className="flex flex-col gap-4">
          <h2 className="text-9xl font-bold">404</h2>
          <p className="text-2xl m-auto font-bold text-cyan-700">
            This is not the page
            <br />you are looking for
          </p>
          <Button className="cursor-pointer bg-white text-black hover:bg-gray-300" onClick={() => navigate("/")}>Back to to home</Button>
        </div>
    </div>
  )
}

export default NotFound