import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";

import { verifyResetOtpUser } from "../../redux/thunks/authThunk";

const otpSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const email = location.state?.email;

  const handleSubmit = async (values, { resetForm }) => {
    if (!email) {
      alert("Email not found");
      navigate("/forgot-password");
      return;
    }

    const resultAction = await dispatch(
      verifyResetOtpUser({
        email,
        otp: values.otp,
      }),
    );

    if (verifyResetOtpUser.fulfilled.match(resultAction)) {
      alert(resultAction.payload.message || "OTP verified successfully");

      resetForm();

      navigate("/reset-password", {
        state: {
          email,
        },
      });
    } else {
      alert(resultAction.payload || "OTP verification failed");
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
            text-white text-2xl font-black
            "
          >
            #
          </motion.div>

          <h1 className="mt-4 text-2xl font-bold text-white tracking-tight">
            Verify OTP
          </h1>

          <p className="text-center text-sm text-slate-400 mt-1">
            Enter the code sent to
            <br />
            <span className="font-medium text-slate-200">
              {email || "your email"}
            </span>
          </p>
        </div>

        <Formik
          initialValues={{
            otp: "",
          }}
          validationSchema={otpSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">
                One-time passcode
              </label>

              <Field
                name="otp"
                type="text"
                placeholder="······"
                maxLength="6"
                autoComplete="one-time-code"
                className="
                w-full
                px-4 py-3
                rounded-lg
                bg-white/5
                border border-white/10
                text-center text-lg text-white
                tracking-[0.6em]
                placeholder:text-slate-600 placeholder:tracking-[0.6em]
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
                    className="text-xs text-rose-400 mt-1.5 pl-1 text-center"
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
                    Verify OTP
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate("/forgot-password")}
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
              Back
            </motion.button>
          </Form>
        </Formik>
      </motion.div>
    </div>
  );
}

export default VerifyOtp;
