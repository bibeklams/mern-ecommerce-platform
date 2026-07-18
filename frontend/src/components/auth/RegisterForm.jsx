import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";

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

// Shared field wrapper — icon + input, styled to match the navbar's
// dark glass surface, with an animated error message underneath.
const FormField = ({ icon, name, type, placeholder }) => (
  <div>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
        {icon}
      </span>

      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className="
        w-full pl-10 pr-4 py-2.5
        rounded-lg
        bg-white/5
        border border-white/10
        text-sm text-white placeholder:text-slate-500
        outline-none
        focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20
        transition-colors duration-200
        "
      />
    </div>

    <ErrorMessage name={name}>
      {(msg) => (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-rose-400 mt-1.5 pl-1"
        >
          {msg}
        </motion.p>
      )}
    </ErrorMessage>
  </div>
);

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
    <div
      className="
      min-h-screen flex items-center justify-center
      bg-[#0B1120]
      px-4
      relative
      overflow-hidden
      "
    >
      {/* Ambient gradient glow — echoes the navbar's accent colors */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
        w-full max-w-md
        bg-white/[0.04]
        backdrop-blur-xl
        shadow-2xl shadow-black/40
        rounded-2xl
        p-8
        border border-white/[0.08]
        relative
        "
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 0.1,
            }}
            className="
            h-14 w-14 flex items-center justify-center
            rounded-full
            bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400
            shadow-lg shadow-indigo-500/30
            "
          >
            <FaShoppingBag className="text-white text-xl" />
          </motion.div>

          <h2 className="text-2xl font-bold mt-4 text-white tracking-tight">
            Create account
          </h2>

          <p className="text-slate-400 text-sm mt-1">
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
            <FormField
              icon={<FaUser size={14} />}
              name="name"
              type="text"
              placeholder="Full name"
            />

            <FormField
              icon={<FaEnvelope size={14} />}
              name="email"
              type="email"
              placeholder="Email address"
            />

            <FormField
              icon={<FaLock size={14} />}
              name="password"
              type="password"
              placeholder="Password"
            />

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="
              w-full py-2.5 mt-2
              rounded-lg
              bg-gradient-to-r from-indigo-500 to-violet-500
              disabled:from-slate-700 disabled:to-slate-700
              disabled:cursor-not-allowed
              text-white text-sm font-semibold
              shadow-lg shadow-indigo-500/25
              flex items-center justify-center gap-2
              transition-shadow duration-200
              "
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        ease: "linear",
                      }}
                      className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white"
                    />
                    Creating...
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <FaUserPlus />
                    Create account
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </Form>
        </Formik>

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default RegisterForm;
