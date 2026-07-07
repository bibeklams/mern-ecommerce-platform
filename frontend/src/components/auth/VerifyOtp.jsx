import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyResetOtp } from "../../services/authServices";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await verifyResetOtp({
        email,
        otp: values.otp,
      });

      alert(data.message);

      resetForm();

      navigate("/reset-password", {
        state: {
          email,
        },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          otp: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="otp" type="text" placeholder="Enter OTP" />

          <button type="submit">Verify OTP</button>
        </Form>
      </Formik>
    </div>
  );
}

export default VerifyOtp;
