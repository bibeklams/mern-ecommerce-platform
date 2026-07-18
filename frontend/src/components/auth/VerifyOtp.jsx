import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { verifyResetOtpUser } from "../../redux/thunks/authThunk";

const otpSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const email = location.state?.email;

  const handleSubmit = async (values, { resetForm }) => {
    if (!email) {
      alert("Email not found");
      navigate("/forgot-password");
      return;
    }

    const resultAction = await dispatch(
      verifyResetOtpUser({
        email,
        otp: values.otp,
      }),
    );

    if (verifyResetOtpUser.fulfilled.match(resultAction)) {
      alert(resultAction.payload.message || "OTP verified successfully");

      resetForm();

      navigate("/reset-password", {
        state: {
          email,
        },
      });
    } else {
      alert(resultAction.payload || "OTP verification failed");
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
          validationSchema={otpSchema}
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
                maxLength="6"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center tracking-[0.5em] text-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

              <ErrorMessage
                name="otp"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
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
