import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShieldAlt } from "react-icons/fa";

import { verifyEmailUser } from "../../redux/thunks/authThunk";

const emailVerifySchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

function EmailVerified() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const email = location.state?.email;

  const handleSubmit = async (values, { resetForm }) => {
    if (!email) {
      alert("Email not found");
      navigate("/register");
      return;
    }

    const resultAction = await dispatch(
      verifyEmailUser({
        email,
        otp: values.otp,
      }),
    );

    if (verifyEmailUser.fulfilled.match(resultAction)) {
      alert(resultAction.payload.message || "Email verified successfully");

      resetForm();

      navigate("/login");
    } else {
      alert(resultAction.payload || "Email verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border p-8">
        {/* Icon */}

        <div className="flex justify-center">
          <div className="bg-blue-600 p-4 rounded-full shadow-lg">
            <FaShieldAlt className="text-white text-3xl" />
          </div>
        </div>

        {/* Heading */}

        <h2 className="text-3xl font-bold text-center text-gray-800 mt-5">
          Verify Your Email
        </h2>

        <p className="text-center text-gray-500 mt-2 text-sm">
          We've sent a verification code to
        </p>

        <p className="text-center text-blue-600 font-semibold mb-6 break-all">
          {email}
        </p>

        <Formik
          initialValues={{
            otp: "",
          }}
          validationSchema={emailVerifySchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <Field
              name="otp"
              type="text"
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              className="w-full border rounded-lg px-4 py-3 text-center text-xl tracking-[0.4em] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <ErrorMessage
              name="otp"
              component="p"
              className="text-sm text-red-500 text-center"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </Form>
        </Formik>

        <button
          onClick={() => navigate("/register")}
          className="w-full mt-4 text-sm text-gray-500 hover:text-blue-600 transition"
        >
          Back to Register
        </button>
      </div>
    </div>
  );
}

export default EmailVerified;
