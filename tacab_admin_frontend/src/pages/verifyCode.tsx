import { Button } from '@/components/ui/button';
import { useVerifyResetCode } from '@/react-query/forgotPassword';
import { OTPInput, type SlotProps } from 'input-otp';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const VerifyCode = () => {

  const {mutate: verifyCode, isPending, isError, error} = useVerifyResetCode();
  const email = JSON.parse(localStorage.getItem("forgot-password")!)
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
      code: yup.string().length(6).required("Code is required"),
    }),
  });

  useEffect(() => {
    if(isError) {
        toast.error(error.message); 
    }
  }, [isError])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Verify your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6-digit verification code to your email.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center">
            <OTPInput
              maxLength={6}
              value={formik.values.code}
              onChange={formik.handleChange}
              containerClassName="group flex items-center has-[:disabled]:opacity-50"
              render={({ slots }) => (
                <div className="flex gap-2">
                  {slots.map((slot, idx) => (
                    <Slot key={idx} {...slot} />
                  ))}
                </div>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={formik.values.code.length < 6}>
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

function Slot(props: SlotProps) {
  return (
    <div
      className={`relative flex h-14 w-12 items-center justify-center border-2 text-xl font-semibold transition-all duration-200 rounded-md ${
        props.isActive ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300'
      }`}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-px animate-pulse bg-indigo-500" />
        </div>
      )}
    </div>
  );
}

export default VerifyCode;
