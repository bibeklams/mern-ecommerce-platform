import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShieldAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

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
        {/* Icon */}
        <div className="flex justify-center">
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
            <FaShieldAlt className="text-white text-xl" />
          </motion.div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-white mt-5 tracking-tight">
          Verify your email
        </h2>

        <p className="text-center text-slate-400 mt-2 text-sm">
          We've sent a verification code to
        </p>

        <p className="text-center text-indigo-400 font-semibold mb-6 break-all">
          {email || "your email"}
        </p>

        <Formik
          initialValues={{
            otp: "",
          }}
          validationSchema={emailVerifySchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <div>
              <Field
                name="otp"
                type="text"
                maxLength="6"
                placeholder="······"
                autoComplete="one-time-code"
                className="
                w-full px-4 py-3
                rounded-lg
                bg-white/5
                border border-white/10
                text-center text-xl text-white
                tracking-[0.5em]
                placeholder:text-slate-600 placeholder:tracking-[0.5em]
                outline-none
                focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20
                transition-colors duration-200
                "
              />

              <ErrorMessage name="otp">
                {(msg) => (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-rose-400 mt-2 text-center"
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
                    Verifying...
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Verify email
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </Form>
        </Formik>

        <button
          onClick={() => navigate("/register")}
          className="w-full mt-4 text-sm text-slate-500 hover:text-indigo-400 transition-colors"
        >
          Back to register
        </button>
      </motion.div>
    </div>
  );
}

export default EmailVerified;
