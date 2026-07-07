import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../services/authServices";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await resetPassword({
        email,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      alert(data.message);

      resetForm();

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Reset Password</h1>

        <p className="text-center text-gray-500 mb-6">
          Create a new password for
          <br />
          <span className="font-medium text-gray-700">{email}</span>
        </p>

        <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                New Password
              </label>

              <Field
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Confirm Password
              </label>

              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Change Password
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

export default ResetPassword;
