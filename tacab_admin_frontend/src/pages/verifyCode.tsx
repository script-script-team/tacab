import { Button } from '@/components/ui/button';
import { useVerifyResetCode } from '@/react-query/forgotPassword';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const VerifyCode = () => {
  const { mutate: verifyCode, isPending, isError, error } = useVerifyResetCode();
  const email = JSON.parse(localStorage.getItem("forgot-password")!);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit(values) {
      verifyCode({
        code: values.code,
        email: email
      }, {
        onSuccess: () => {
          navigate('/reset-password');
        }
      });
    },
    validationSchema: yup.object({
      code: yup.string().length(6, "Code must be 6 digits").required("Code is required"),
    }),
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold ">Verify your account</h2>
          <p className="mt-2 text-sm text-gray-500">
            We've sent a 6-digit verification code to your email.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <InputOTP
              maxLength={6}
              value={formik.values.code}
              onChange={(value) => formik.setFieldValue('code', value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {formik.touched.code && formik.errors.code && (
              <p className='text-red-500 text-sm font-bold'>{formik.errors.code}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={formik.values.code.length < 6 || isPending}
          >
            {isPending ? "Verifying..." : "Verify Code"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-500">Didn't receive the code? </span>
          <button className="font-medium text-indigo-600 hover:text-indigo-500">
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;