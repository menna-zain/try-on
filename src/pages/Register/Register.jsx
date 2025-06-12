import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Input } from "@heroui/react";
import { Button } from "@heroui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const [isloading, setIsloading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = () => {
    setErrMsg("");
    setIsloading(true);
    axios
      .post("https://api.tryon-store.xyz/api/v1/users/signup", values)
      .then(({ data }) => {
        navigate("/login");
      })
      .catch((err) => {
        setErrMsg(err.response.data.message);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "name length must be more than 2 characters")
      .max(20, "name length must be less than 20 characters"),
    email: Yup.string()
      .email("Entre A Valid Email")
      .required("Email is required"),
    password: Yup.string()
      .required()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      ),
    passwordConfirm: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues,
      onSubmit: onSubmit,
      validationSchema,
    });

  // console.log(errors);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-full max-w-2xl px-8 space-y-6 text-black md:flex-row md:space-y-0 md:space-x-10">
          <div className="w-3/4 px-5 my-20 border rounded-xl md:text-left ">
            <h2 className="mt-5 text-xl font-bold capitalize font-heading">
              Welcome to TryOn
            </h2>
            <p className="mb-5 text-xl font-bold capitalize font-heading">
              Experience Shopping Like Never Before!
            </p>
            <form onSubmit={handleSubmit}>
              <Input
                isInvalid={touched.name && errors.name}
                errorMessage={<p>{errors.name}</p>}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                variant="bordered"
                className="col-span-2 mb-3 font-body"
                label="Name"
                type="name"
                autoComplete="off"
              />

              <Input
                isInvalid={touched.email && errors.email}
                errorMessage={<p>{errors.email}</p>}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                variant="bordered"
                label="Email"
                type="email"
                className="col-span-2 mb-3 font-body"
                autoComplete="off"
              />

              <div className="flex gap-2">
                <Input
                  isInvalid={touched.password && errors.password}
                  errorMessage={<p>{errors.password}</p>}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  variant="bordered"
                  className="col-span-2 mb-3 font-body"
                  label="Password"
                  type="password"
                  autoComplete="off"
                />

                <Input
                  isInvalid={touched.passwordConfirm && errors.passwordConfirm}
                  errorMessage={<p>{errors.passwordConfirm}</p>}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.passwordConfirm}
                  name="passwordConfirm"
                  variant="bordered"
                  className="col-span-1 mb-3 font-body"
                  label="Confirm Password"
                  type="Password"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <Button
                  isLoading={isloading}
                  type="submit"
                  color="primary"
                 className="w-full py-3 text-base text-white capitalize rounded-md font-mediam bg-primary font-body"
                >
                  sign up
                </Button>
                {errMsg && <p className="text-red-500">{errMsg}</p>}
                <div className="flex items-center w-full my-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-3 text-sm font-medium text-gray-500 font-body">
                    OR
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <Button className="flex items-center justify-center w-full gap-3 py-3 text-base bg-transparent border rounded-md font-body">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-6 c-third_party_auth__icon"
                  >
                    <g>
                      <path
                        className="c-third_party_auth__icon__google--red"
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      ></path>
                      <path
                        className="c-third_party_auth__icon__google--blue"
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      ></path>
                      <path
                        className="c-third_party_auth__icon__google--yellow"
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      ></path>
                      <path
                        className="c-third_party_auth__icon__google--green"
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      ></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </g>
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </form>

            <p className="my-2 text-sm text-gray-400 font-body">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="font-semibold text-black capitalize cursor-pointer"
              >
                sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
