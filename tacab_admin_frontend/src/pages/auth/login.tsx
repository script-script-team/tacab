import { Button } from "@/components/ui/button"
import * as yup from "yup"
import  { useFormik } from "formik"
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { login, randomLogin, student } from "../Example";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Login() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: "",
      pass: ""
    },
    onSubmit(values) {
      const data = {
        ...values
      }
      if(login.some((u) => u.id === data.id && u.pass === data.pass)) {
        navigate("/");
        localStorage.setItem("login", JSON.stringify(student[randomLogin(0, student?.length - 1)]));
        window.location.reload();
        return;
      }else {
        toast.error("Incorrect id or pass")
      }
    },
    validationSchema: yup.object({
      id: yup.string().length(8, "Id must be at least 8 length").required("Id is required"),
      pass: yup.string().max(100, "Password limit reach").required("Password is required")
    })
  });

  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
    <div className="w-full h-[73vh] justify-center items-center flex">
      <form onSubmit={formik.handleSubmit}>
        <div className="container w-[440px] h-[440px] shadow-lg rounded-2xl m-auto p-4 grid">
        <div className="flex justify-center items-center flex-col gap-4">
          <img className="w-20 h-20 rounded-full object-cover" src="/logo.jpg" />
          <h2 className="text-3xl font-bold">Welcome to tacab collage</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-[500] text-gray-600">Email</label>
            <Input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.id} name="id" type="text" placeholder="Email" />
            <p className="text-red-500 font-bold">{formik.touched.id && formik.errors.id}</p>
          </div>
        <div className="flex flex-col gap-2">
          <label className="font-[500] text-gray-600">Password</label>
          <Input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.pass} name="pass" type="password" placeholder="Password" />
          <p className="text-red-500 font-bold">{formik.touched.pass && formik.errors.pass}</p>
        </div>
        </div>
        <Button type="submit" className="cursor-pointer bg-blue-600 hover:bg-blue-700 h-[40px] text-white">Login</Button>
      </div>
      </form>
    </div>
    <Footer />
    </div>
  )
}

export default Login