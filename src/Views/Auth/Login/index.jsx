import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./Login.module.css";
import { UserContext } from "../../../context/UserContext";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon"></i>
        <h4 className="login">Login</h4>
      </div>

      <Card className="p-5 w-50 m-auto">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().required().email().label("Email"),
            password: Yup.string().required().min(8).label("Password"),
          })}
          onSubmit={async (values, { setStatus, setSubmitting }) => {
            try {
              const { data } = await axios.post(
                "https://sara7aiti.onrender.com/api/v1/user/signin",
                values
              );
              login(data.token);
              navigate("/messages/my-messages");
              console.log(data);
              setSubmitting(false);
              setStatus({ success: true });
            } catch (e) {
              console.log(e.message);
              setSubmitting(false);
              setStatus({ success: false });
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
              <div>
                <input
                  className="form-control"
                  placeholder="Enter your email"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email ? (
                  <div className="text-start text-danger">
                    {touched.email && errors.email ? errors.email : ""}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="my-4">
                <input
                  className="form-control"
                  placeholder="Enter your Password"
                  type="text"
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
              </div>
              <button
                type="submit"
                className={`btn btn-default-outline my-4 w-100 rounded ${styles.btn}`}
                disabled={isSubmitting || !(isValid && dirty)}
              >
                Login
              </button>
              <p>
                <Link className="text-muted forgot btn" to="">
                  I Forgot My Password
                </Link>
              </p>
              <Link className="btn btn-default-outline" to="/auth/register">
                Register
              </Link>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
