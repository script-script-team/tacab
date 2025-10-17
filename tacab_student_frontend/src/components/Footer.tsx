import Logo from "./ui/Logo"

function Footer() {
  return (
    <div className="w-full p-6 flex justify-between text-white bg-gray-900">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Logo />
          <h2 className="text-sm">Tacab collage</h2>
        </div>
      <h2 className="hover:text-gray-300 text-sm">Developed by: Script Squad</h2>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-sm">Tacab © {new Date().getFullYear()} All rights reserved.</h2>
        <h2 className="hover:text-gray-300 text-sm">Call center: +252 63 7287178</h2>
      </div>
    </div>
  )
}

export default Footer