import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { Input } from "@heroui/react";
import { Button } from "@heroui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function PrivacySetting() {
  const initialValues = {
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  };

  const [isloading, setIsloading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = (values, { resetForm }) => {
    setIsloading(true);
    setErrMsg("");
    axios
      .patch(
        "https://tryon-lac.vercel.app/api/v1/users/updateMyPassword",
        values,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.token) {
          Cookies.remove("token");
          Cookies.set("token", res.data.token, { expires: 365 });
        }
        resetForm();
      })
      .catch((err) => {
        setErrMsg(
          err.response?.data?.status ||
            "Something went wrong, please try again."
        );
      })
      .finally(() => {
        setIsloading(false);
        resetForm();
      });
  };

  const validationSchema = Yup.object({
    passwordCurrent: Yup.string().required("Current password is required"),
    password: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      ),
    passwordConfirm: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    values,
    errors,
    resetForm,
    isValid,
    dirty,
  } = useFormik({
    initialValues,
    onSubmit: onSubmit,
    validationSchema,
  });

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white shadow-lg my-36 rounded-2xl">
          <h2 className="mb-4 text-xl font-bold text-start font-heading">
            Change Password
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              isInvalid={touched.passwordCurrent && errors.passwordCurrent}
              errorMessage={<p>{errors.passwordCurrent}</p>}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.passwordCurrent}
              name="passwordCurrent"
              variant="bordered"
              className="w-full mb-2 rounded-md"
              label="Current Password"
              type="password"
            />
            <Input
              isInvalid={touched.password && errors.password}
              errorMessage={<p>{errors.password}</p>}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              variant="bordered"
              className="w-full mb-2 rounded-md"
              label="New Password"
              type="password"
            />
            <Input
              isInvalid={touched.passwordConfirm && errors.passwordConfirm}
              errorMessage={<p>{errors.passwordConfirm}</p>}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.passwordConfirm}
              name="passwordConfirm"
              variant="bordered"
              className="w-full mb-3 rounded-md"
              label="Re-Password"
              type="password"
            />

            <Button
              isLoading={isloading}
              type="submit"
              disabled={!isValid || !dirty}
              className={`w-full mt-2 rounded-lg font-body ${
                !isValid || !dirty
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary-hover"
              }`}
            >
              Update Password
            </Button>

            {errMsg && <p className="mt-2 text-red-500">{errMsg}</p>}
          </form>
        </div>
      </div>
    </>
  );
}















































































































// import React, { useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// import { Input } from "@heroui/react";
// import { Button } from "@heroui/react";

// import { useFormik } from "formik";
// import * as Yup from "yup";

// export default function PrivacySetting() {
//   //  const [isChanged, setIsChanged] = useState(false);
//   const initialValues = {
//     passwordCurrent: "",
//     password: "",
//     passwordConfirm: "",
//   };

//   const [isloading, setIsloading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");

//   const onSubmit = (values, { resetForm }) => {
//     setIsloading(true);
//     setErrMsg("");
//     axios
//       .patch(
//         "https://tryon-lac.vercel.app/api/v1/users/updateMyPassword",
//         values,
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("token")}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res);
//         console.log(res.data.status);

//         if (res.data.token) {
//           Cookies.remove("token"); 
//           Cookies.set("token", res.data.token, { expires: 365 }); 
//         }
  
//         resetForm(); 
//         // window.location.reload(); 
//         // resetForm(); 
//       })
//       .catch((err) => {
//         setErrMsg(
//           err.response?.data?.status ||
//             "Something went wrong, please try again."
//         );
//       })
//       .finally(() => {
//         setIsloading(false);
//         resetForm();
//       });
//   };

//   const validationSchema = Yup.object({
//     passwordCurrent: Yup.string().required("Current password is required"),
//     password: Yup.string()
//       .required()
//       .matches(
//         /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//         "Minimum eight characters, at least one letter and one number"
//       ),
//     passwordConfirm: Yup.string()
//       .required("Password confirmation is required")
//       .oneOf([Yup.ref("password")], "Passwords must match"),
//   });

//   const {
//     handleSubmit,
//     handleChange,
//     handleBlur,
//     touched,
//     values,
//     errors,
//     resetForm,
//   } = useFormik({
//     initialValues,
//     onSubmit: onSubmit,
//     validationSchema,
//   });

//   return (
//     <>
//       <div className="flex items-center justify-center ">
//         <div className="w-full max-w-md p-6 bg-white shadow-lg my-36 rounded-2xl">
//           <h2 className="mb-4 text-xl font-semibold text-start">
//             Change Password
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <Input
//               isInvalid={touched.passwordCurrent && errors.passwordCurrent}
//               errorMessage={<p>{errors.passwordCurrent}</p>}
//               onBlur={handleBlur}
//               onChange={handleChange}
//               value={values.passwordCurrent}
//               name="passwordCurrent"
//               variant="bordered"
//               className="w-full mb-2 rounded-md "
//               label="Current Password"
//               type="password"
//             />
//             <Input
//               isInvalid={touched.password && errors.password}
//               errorMessage={<p>{errors.password}</p>}
//               onBlur={handleBlur}
//               onChange={handleChange}
//               value={values.password}
//               name="password"
//               variant="bordered"
//               className="w-full mb-2 rounded-md "
//               label="New Password"
//               type="password"
//             />
//             <Input
//               isInvalid={touched.passwordConfirm && errors.passwordConfirm}
//               errorMessage={<p>{errors.passwordConfirm}</p>}
//               onBlur={handleBlur}
//               onChange={handleChange}
//               value={values.passwordConfirm}
//               name="passwordConfirm"
//               variant="bordered"
//               className="w-full mb-3 rounded-md"
//               label="Re-Password"
//               type="password"
//             />

//             {/* <div className="flex flex-col items-center justify-center"> */}
           
//             <Button
//           //   className={`px-4 py-2 rounded-lg ${
//           //   isChanged
//           //     ? "bg-[#570091] text-white hover:bg-[#570091d7]"
//           //     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           // }`}
//           // disabled={!isChanged}
//               isLoading={isloading}
//               type="submit"
//               // className="w-full mt-2 text-gray-600 bg-gray-500 rounded-lg cursor-not-allowed"
//               className="w-full mt-2 text-white rounded-lg bg-primary hover:bg-primary-hover"
//             >
//               Update Password
//             </Button>
//             {errMsg && <p className="text-red-500">{errMsg}</p>}
//             {/* </div> */}
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
