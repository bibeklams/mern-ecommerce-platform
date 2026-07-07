import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/authServices";

function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await forgotPassword(values);

      alert(data.message);

      resetForm();

      navigate("/verify-reset-otp", {
        state: {
          email: values.email,
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
          email: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="email" type="email" placeholder="example@gmail.com" />

          <button type="submit">Send OTP</button>
        </Form>
      </Formik>
    </div>
  );
}

export default ForgotPassword;
