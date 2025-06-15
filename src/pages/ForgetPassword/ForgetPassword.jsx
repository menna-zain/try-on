import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Input } from "@heroui/react";
import { Button } from "@heroui/react";

import { useFormik } from "formik";
import * as Yup from "yup";


export default function ForgetPassword() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  const [isloading, setIsloading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = () => {
    setIsloading(true);
    setErrMsg("");
    axios
      .post("https://www.tryon-store.xyz/api/v1/users/forgotPassword", values)
      // .post("https://api.tryon-store.xyz/api/v1/users/forgotPassword", values)
      .then((res) => {
        if (res.data.status == "success") {
        navigate("/newpassword")
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
    email: Yup.string().email().required("Email is required"),
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
              Forget Password
            </h2>
            <p className="text-sm text-gray-500 font-body">Please, entre your email address</p>
            <p className="mb-2 text-sm text-gray-500 font-body">You will receve a link to create a new password via email</p>
            <form onSubmit={handleSubmit}>
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
              />
                <Button
                  isLoading={isloading}
                  type="submit"
                  className="w-full py-3 mt-2 text-base font-medium text-white capitalize rounded-md bg-primary font-body"
                >
                  Send
                </Button>
                {errMsg && <p className="text-red-500">{errMsg}</p>}

                <span
                  onClick={() => navigate("/login")}
                  className="mt-2 text-sm text-gray-400 underline cursor-pointer font-body"
                >
                  Login to your account!
                </span>
          
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
