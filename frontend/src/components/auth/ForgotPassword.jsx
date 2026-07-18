import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

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
    <div
      className="
      min-h-screen flex items-center justify-center
      bg-[#0B1120]
      px-4
      relative
      overflow-hidden
      "
    >
      {/* Ambient gradient glow — same accent language as the rest of auth */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]" />

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
            <FaEnvelopeOpenText className="text-white text-xl" />
          </motion.div>

          <h1 className="mt-4 text-2xl font-bold text-white tracking-tight">
            Forgot password
          </h1>

          <p className="text-center text-sm text-slate-400 mt-1">
            Enter your email address to receive an OTP
          </p>
        </div>

        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={forgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                Email
              </label>

              <Field
                name="email"
                type="email"
                placeholder="example@gmail.com"
                className="
                w-full px-4 py-3
                rounded-lg
                bg-white/5
                border border-white/10
                text-sm text-white placeholder:text-slate-500
                outline-none
                focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20
                transition-colors duration-200
                "
              />

              <ErrorMessage name="email">
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

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="
              w-full py-3
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
                    Sending...
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Send OTP
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate("/login")}
              className="
              w-full py-3
              rounded-lg
              bg-white/5
              border border-white/10
              text-slate-300 text-sm font-medium
              hover:bg-white/10 hover:text-white
              transition-colors duration-200
              "
            >
              Back to login
            </motion.button>
          </Form>
        </Formik>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
