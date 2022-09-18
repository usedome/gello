import { FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { TFormControl } from "../..";
import { signupSchema } from "../../../utilities";

export const useFormConfig = () => {
  return () => ({
    validationSchema: signupSchema,
    initialValues: { name: "", last_name: "", email: "", password: "" },
    onSubmit: () => {},
  });
};

export const useSignupControls = () => {
  return (formik: any): TFormControl[] => [
    {
      type: "text",
      properties: {
        name: "name",
        type: "text",
        label: <FormLabel mb={2}>Name</FormLabel>,
        styleProps: { colSpan: 12, mb: 5 },
        errorMessage:
          formik.touched?.name && formik.errors?.name ? (
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          ) : undefined,
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        value: formik.values?.name,
      },
    },
    {
      type: "text",
      properties: {
        name: "email",
        type: "email",
        label: <FormLabel mb={2}>Email</FormLabel>,
        styleProps: { colSpan: 12, mb: 5 },
        errorMessage:
          formik.touched?.email && formik.errors?.email ? (
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          ) : undefined,
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        value: formik.values?.email,
      },
    },
    {
      type: "text",
      properties: {
        name: "password",
        type: "password",
        label: <FormLabel mb={2}>Password</FormLabel>,
        styleProps: { colSpan: 12, mb: 5 },
        errorMessage:
          formik.touched?.password && formik.errors?.password ? (
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          ) : undefined,
        onBlur: formik.handleBlur,
        onChange: formik.handleChange,
        value: formik.values?.password,
      },
    },
  ];
};
