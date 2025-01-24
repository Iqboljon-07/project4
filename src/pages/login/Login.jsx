import axios from "axios";
import React from "react";
import logo from "../../assets/logo.svg";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";

import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useStateValue } from "../../context";
const validationSchema = Yup.object({
  username: Yup.string()
    .min(4, "Kamida 4 ta harf qatnashsin")
    .max(10, "Ko'pi bilan 10 ta harf qatnashsin")
    .required("Maydon bo'sh bo'lmasin"),
  password: Yup.string()
    .min(6, "Kamida 6 ta son qatnashsin")
    .max(8, "Ko'pi bilan 8 ta bo'lsin")
    .matches(/^(?=.*[A-Za-z])/, "Parol kamida bitta Harf qatnashsin")
    .required("Maydon bo'sh bo'lmasin"),
});

function Login() {
  const { password, setPassword } = useStateValue();
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  const onSubmit = (values) => {
    console.log(values);
    (async () => {
      try {
        let response = await axios.post(
          "https://nt-shopping-list.onrender.com/api/auth",
          {
            username: values.username,
            password: values.password,
          },

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          toast.success("Signed in successfully");
          navigate("/");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      } catch (error) {
        toast.error("Invalid credentials");
        console.error(error);
      }
    })();
  };

  return (
    <div className="login">
      <div className="login_item">
        <div className="login_title1">
          <img src={logo} alt="" />
          <h6>Welcome back to</h6>
          <h2>Shopping List</h2>
        </div>
        <div className="login_title2">
          <p>Sign In</p>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <div>
                  <label htmlFor="username"></label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    placeholder="login"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label htmlFor="password"></label>
                  <div className="password">
                    <Field
                      type={password ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="password"
                    />
                    {password ? (
                      <RemoveRedEyeIcon onClick={() => setPassword(false)} />
                    ) : (
                      <VisibilityOffIcon onClick={() => setPassword(true)} />
                    )}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <button className="btns" type="submit">
                  Submit
                </button>
              </Form>
            )}
          </Formik>

          <span style={{ width: "100%", fontSize: "14px" }}>
            No account yet? <NavLink to="/registr">Create One.</NavLink>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
