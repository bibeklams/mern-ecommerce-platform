import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { verifiedEmail } from "../../services/authServices";
import { FaShieldAlt } from "react-icons/fa";

function EmailVerified() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await verifiedEmail({
        email,
        otp: values.otp,
      });

      alert(data.message);

      resetForm();
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
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
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <Field
              name="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              className="w-full border rounded-lg px-4 py-3 text-center text-xl tracking-[0.4em] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
            >
              Verify Email
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
