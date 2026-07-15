import React from "react";
import { Formik, Field, Form } from "formik";
import { register } from "../../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaShoppingBag,
} from "react-icons/fa";

function RegisterForm() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await register(values);

      alert(data.message);
      resetForm();

      navigate("/verify-email", {
        state: {
          email: values.email,
        },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full shadow">
            <FaShoppingBag className="text-white text-3xl" />
          </div>

          <h2 className="text-3xl font-bold mt-4 text-gray-800">
            Create Account
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Join ShopVerse and start shopping
          </p>
        </div>

        {/* Form */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <Field
                name="name"
                type="text"
                placeholder="Full name"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <Field
                name="email"
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <FaUserPlus />
              Create Account
            </button>
          </Form>
        </Formik>

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
