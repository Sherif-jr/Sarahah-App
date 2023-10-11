import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Notification from "../../../components/Notification";

const Register = () => {
  const [notification, setNotification] = useState({
    show: false,
    title: "Sent!",
    body: "Your message was sent successfully!",
    varient: "success",
  });
  return (
    <>
      <div className="container text-center my-5">
        <div className="user my-3">
          <i className="far fa-edit user-icon"></i>
          <h4 className="login">Register</h4>
        </div>

        <Card className="p-5 w-50 m-auto">
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              rePassword: "",
              age: 0,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required().trim().min(3).label("Name"),
              email: Yup.string().required().email().label("Email"),
              password: Yup.string()
                .required()
                .matches(
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
                ),
              rePassword: Yup.string()
                .oneOf([Yup.ref("password"), null])
                .required()
                .label("Password Confirmation"),
              age: Yup.number().min(14).max(99).required().label("Age"),
            })}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              try {
                const { data } = await axios.post(
                  "https://sara7aiti.onrender.com/api/v1/user",
                  values
                );
                console.log(data);
                setSubmitting(false);
                setStatus({ success: true });
                setNotification({
                  show: true,
                  title: "Created!",
                  body: "Your account was created successfully! head to login page to continue.",
                  varient: "success",
                });
              } catch (e) {
                console.log(e.response.data.error);
                setSubmitting(false);
                setStatus({ success: false });
                setNotification({
                  show: true,
                  title: "Oops!",
                  body: e.response?.data?.error || "Something went wrong.",
                  varient: "danger",
                });
              }
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              errors,
              isSubmitting,
              dirty,
              isValid,
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  className={`form-control ${
                    touched.name && errors.name ? "border-danger" : ""
                  }`}
                  placeholder="Enter your Name"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name ? (
                  <div className="text-start text-danger">{errors.name}</div>
                ) : (
                  ""
                )}
                <input
                  className="form-control my-2 "
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email ? (
                  <div className="text-start text-danger">
                    {touched.email && errors.email ? errors.email : " "}
                  </div>
                ) : (
                  ""
                )}
                <input
                  className="form-control  "
                  placeholder="Enter your Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password ? (
                  <div className="text-start text-danger">
                    {errors.password}
                  </div>
                ) : (
                  ""
                )}
                <input
                  className="form-control  my-2"
                  placeholder="Password Confirmation"
                  type="password"
                  name="rePassword"
                  value={values.rePassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.rePassword && errors.rePassword ? (
                  <div className="text-start text-danger">
                    {errors.rePassword}
                  </div>
                ) : (
                  ""
                )}
                <input
                  className="form-control  my-2"
                  placeholder="Age"
                  type="number"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.age && errors.age ? (
                  <div className="text-start text-danger">{errors.age}</div>
                ) : (
                  ""
                )}
                <button
                  className={`btn btn-outline-dark btn-default-outline my-4 w-100 rounded ${styles.btn}`}
                  type="submit"
                  disabled={isSubmitting || !(isValid && dirty)}
                >
                  Register
                </button>
                <Link
                  className="btn btn-outline-dark btn-default-outline"
                  to="/auth/login"
                >
                  Login
                </Link>
              </form>
            )}
          </Formik>
        </Card>
      </div>
      <Notification
        show={notification.show}
        onHide={() => {
          setNotification((prev) => ({ ...prev, show: false }));
        }}
        title={notification.title}
        body={notification.body}
        varient={notification.varient}
      />
    </>
  );
};

export default Register;
