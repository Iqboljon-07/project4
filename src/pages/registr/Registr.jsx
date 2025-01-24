import axios from "axios";
import React, { useRef } from "react";
import logo from "../../assets/logo.svg";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";
import * as Yup from "yup";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useStateValue } from "../../context";

const SignupSchema = Yup.object({
  name: Yup.string()
    .min(4, "Kamida 4 Harf qatnashsin")
    .max(10, "Ko'pi bilan 10 ta so'z qatnashsin")
    .required("Maydon bo'sh bolmasligi kerak"),
  username: Yup.string()
    .min(4, "Kamida 4 Harf qatnashsin")
    .max(10, "Ko'pi bilan 10 ta  so'z qatnashsin")
    .required("Maydon bo'sh bolmasligi kerak"),
  password: Yup.string()
    .min(6, "Kamida 6 son qatnashsin")
    .max(10, "Ko'pi bilan 10 ta so'z qatnashsin")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      "Parol harflar va raqamlardan iborat bo'lishi kerak"
    )
    .required("Maydon bo'sh bolmasligi kerak"),
});

function Registr() {
  const { password, setPassword } = useStateValue();
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }

  const onSubmit = async (values) => {
    try {
      let response = await axios.post(
        "https://nt-shopping-list.onrender.com/api/users",
        {
          name: values.name,
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
      if (response.status === 201) {
        toast.success("Signed up successfully");
        navigate("/");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (error) {
      toast.error("Invalid credentials");
      console.error(error);
    }
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
          <p>Register</p>

          <Formik
            initialValues={{ name: "", username: "", password: "" }}
            validationSchema={SignupSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <div>
                  <label htmlFor="name"></label>
                  <Field type="text" name="name" id="name" placeholder="name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>

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
                  <div className="password">
                    <Field
                      type={password ? "text" : "password"}
                      name="password"
                      id="pasword"
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
            No account yet? <NavLink to="/login">Log In</NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Registr;
