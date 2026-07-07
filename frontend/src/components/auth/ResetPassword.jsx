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
    <div>
      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
            name="newPassword"
            type="password"
            placeholder="New Password"
          />

          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />

          <button type="submit">Change Password</button>
        </Form>
      </Formik>
    </div>
  );
}

export default ResetPassword;
