import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyResetOtp } from "../../services/authServices";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await verifyResetOtp({
        email,
        otp: values.otp,
      });

      alert(data.message);

      resetForm();

      navigate("/reset-password", {
        state: {
          email,
        },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Verify OTP</h1>

        <p className="text-center text-gray-500 mb-6">
          Enter the OTP sent to
          <br />
          <span className="font-medium text-gray-700">{email}</span>
        </p>

        <Formik
          initialValues={{
            otp: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                OTP
              </label>

              <Field
                name="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center tracking-[0.5em] text-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Verify OTP
            </button>

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Back
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default VerifyOtp;
