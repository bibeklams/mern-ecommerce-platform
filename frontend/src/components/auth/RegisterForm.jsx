import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaShoppingBag,
} from "react-icons/fa";

import { registerUser } from "../../redux/thunks/authThunk";

const registerSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = async (values, { resetForm }) => {
    const resultAction = await dispatch(registerUser(values));

    if (registerUser.fulfilled.match(resultAction)) {
      const data = resultAction.payload;

      alert(data.message);

      resetForm();

      navigate("/verify-email", {
        state: {
          email: values.email,
        },
      });
    } else {
      alert(resultAction.payload || "Registration failed");
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

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            {/* Name */}

            <div>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />

                <Field
                  name="name"
                  type="text"
                  placeholder="Full name"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <ErrorMessage
                name="name"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Email */}

            <div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />

                <Field
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <ErrorMessage
                name="email"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Password */}

            <div>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />

                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <ErrorMessage
                name="password"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <FaUserPlus />

              {loading ? "Creating..." : "Create Account"}
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
