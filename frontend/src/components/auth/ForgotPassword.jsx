import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { forgotPasswordUser } from "../../redux/thunks/authThunk";

const forgotPasswordSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (values, { resetForm }) => {
    const resultAction = await dispatch(forgotPasswordUser(values));

    if (forgotPasswordUser.fulfilled.match(resultAction)) {
      alert(resultAction.payload.message || "OTP sent successfully");

      resetForm();

      navigate("/verify-otp", {
        state: {
          email: values.email,
        },
      });
    } else {
      alert(resultAction.payload || "Something went wrong");
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
          validationSchema={forgotPasswordSchema}
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <ErrorMessage
                name="email"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
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
