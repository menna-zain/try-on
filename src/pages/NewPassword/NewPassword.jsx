import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Input } from "@heroui/react";
import { Button } from "@heroui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function NewPassword() {
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    passwordConfirm: "",
  };

  const [isloading, setIsloading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = (id) => {
    setIsloading(true);
    setErrMsg("");
    axios
      .patch(
        `https://www.tryon-store.xyz/api/v1/users/resetPassword/${id}`,
        // `https://api.tryon-store.xyz/api/v1/users/resetPassword/${id}`,
        values
      )
      .then((res) => {
        if (res.data.status == "success") {
            navigate("/login")
        }
      })
      .catch((err) => {
        setErrMsg(err.response.data.message);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const validationSchema = Yup.object({
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

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <div className="flex items-center justify-center w-full max-w-2xl text-black md:flex-row md:space-y-0 md:space-x-10">
          <div className="w-3/4 px-5 py-3 my-40 border rounded-xl md:text-left">
            <h2 className="text-2xl font-bold capitalize font-heading">
              Set A New Password
            </h2>
            <p className="mb-2 text-sm text-gray-500 font-body">
              must be at least 8 character.
            </p>
            <form onSubmit={handleSubmit}>
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

              <Button
                isLoading={isloading}
                type="submit"
                className="w-full py-3 mt-2 text-base text-white capitalize rounded-md bg-primary font-mediam font-body"
              >
                Save
              </Button>
              {errMsg && <p className="text-red-500">{errMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
