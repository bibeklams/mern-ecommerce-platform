import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/auth.service";

function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await forgotPassword(values);

      alert(data.message);

      resetForm();

      navigate("/verify-otp", {
        state: {
          email: values.email,
        },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Forgot Password</h1>

        <p className="text-center text-gray-500 mb-6">
          Enter your email address to receive an OTP.
        </p>

        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>

              <Field
                name="email"
                type="email"
                placeholder="example@gmail.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Send OTP
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Back to Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
