import { useState } from "react";
import { FormLabel, FormErrorMessage, IconButton } from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { TFormControl } from "../..";
import {
  handleInputBlur,
  handleInputChange,
  signupSchema,
} from "../../../utilities";
import { useSignup, TSignupVariables } from "../../../store";

export const useFormConfig = () => {
  const signup = useSignup();

  return () => ({
    validationSchema: signupSchema,
    initialValues: { name: "", email: "", password: "" },
    onSubmit: async (
      variables: Pick<TSignupVariables, "email" | "password"> & { name: string }
    ) => {
      const names = variables.name.split(" ");
      const first_name = names[0];
      const last_name = names.length === 1 ? "" : names.slice(1).join(" ");

      await signup({
        email: variables.email,
        password: variables.password,
        first_name,
        last_name,
      });
    },
  });
};

export const useSignupControls = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "name",
        type: "text",
        autoFocus: true,
        label: <FormLabel mb={2}>Name</FormLabel>,
        styleProps: { colSpan: 12, mb: 4 },
        errorMessage:
          formik.touched?.name && formik.errors?.name ? (
            <FormErrorMessage fontSize="13.5px">
              {formik.errors.name}
            </FormErrorMessage>
          ) : undefined,
        onBlur: () => {
          handleInputBlur(formik, "name");
        },
        onChange: (event) => {
          handleInputChange(formik, "name", event);
        },
        value: formik.values?.name,
      },
    },
    {
      type: "text",
      properties: {
        name: "email",
        type: "email",
        label: (
          <FormLabel mb={2} color="gray.800">
            Email
          </FormLabel>
        ),
        styleProps: { colSpan: 12, mb: 4 },
        errorMessage:
          formik.touched?.email && formik.errors?.email ? (
            <FormErrorMessage fontSize="13.5px">
              {formik.errors.email}
            </FormErrorMessage>
          ) : undefined,
        onBlur: () => {
          handleInputBlur(formik, "email");
        },
        onChange: (event) => {
          handleInputChange(formik, "email", event);
        },
        value: formik.values?.email,
      },
    },
    {
      type: "text",
      properties: {
        name: "password",
        type: showPassword ? "text" : "password",
        label: <FormLabel mb={2}>Password</FormLabel>,
        styleProps: { colSpan: 12, mb: 4 },
        rightElement: formik?.touched?.password &&
          formik.values?.password.length > 0 && {
            children: showPassword ? (
              <IconButton
                aria-label="Button"
                variant="ghost"
                icon={<AiOutlineEyeInvisible />}
                onClick={() => {
                  setShowPassword(false);
                }}
                fontSize="lg"
                cursor="pointer"
              />
            ) : (
              <IconButton
                aria-label="Button"
                variant="ghost"
                icon={<AiOutlineEye />}
                onClick={() => {
                  setShowPassword(true);
                }}
                fontSize="lg"
                cursor="pointer"
              />
            ),
          },
        errorMessage:
          formik.touched?.password && formik.errors?.password ? (
            <FormErrorMessage fontSize="13.5px">
              {formik.errors.password}
            </FormErrorMessage>
          ) : undefined,
        onBlur: () => {
          handleInputBlur(formik, "password");
        },
        onChange: (event) => {
          handleInputChange(formik, "password", event);
        },
        value: formik.values?.password,
      },
    },
  ];
};
