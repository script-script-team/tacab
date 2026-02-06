import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as yup from "yup";
import { useForgotPassword } from "@/react-query/forgotPassword";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {

  const {mutate: sendEmail, isPending, isError, error} = useForgotPassword();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit(values) {
      sendEmail(values.email, {
        onSuccess: () => {
          navigate('/verify-code');
        }
      });
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
    }),
  });

  useEffect(() => {
    if(isError){
        toast.error(error.message); 
    }
  }, [isError])

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-2xl p-8 shadow-xl border">
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                required
                placeholder="name@company.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="h-11"
              />
              <p className="text-red-500 font-bold">{formik.touched.email && formik.errors.email}</p>
            </div>
            <Button type="submit" className="w-full h-11 text-base font-semibold">
              {isPending ? "Sending..." : "Send reset code"}
            </Button>
          </form>
      </div>
    </div>
  );
};

export default ForgetPassword;