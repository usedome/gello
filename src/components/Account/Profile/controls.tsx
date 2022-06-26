import { useContext, Dispatch, useState } from "react";
import { FormLabel, FormErrorMessage, chakra } from "@chakra-ui/react";
import { TFormControl } from "../..";
import { AppContext, TAppState } from "../../../contexts";
import {
  TAppAction,
  useUpdateUser,
  useUpdateUserPassword,
} from "../../../store";
import { updateUserPasswordSchema, updateUserSchema } from "../../../utilities";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";

export const useProfileConfig = () => {
  const [{ me }] = useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const updateUser = useUpdateUser();
  return () => ({
    validationSchema: updateUserSchema,
    initialValues: {
      first_name: me?.first_name as string,
      last_name: me?.last_name as string,
      email: me?.email as string,
    },
    onSubmit: async (values: {
      first_name: string;
      last_name: string;
      email: string;
    }) => {
      const { first_name, last_name } = values;
      await updateUser({ first_name, last_name });
    },
  });
};

export const usePasswordConfig = () => {
  const updateUserPassword = useUpdateUserPassword();
  return () => ({
    validationSchema: updateUserPasswordSchema,
    initialValues: { password: "", password_confirmation: "" },
    onSubmit: async (values: {
      password: string;
      password_confirmation: string;
    }) => {
      await updateUserPassword({ password: values.password });
    },
  });
};

export const useProfileControls = () => {
  const PencilEdit = chakra(HiOutlinePencilAlt);
  return (formik: any, onOpen: () => void): TFormControl[] => {
    const handleChange = (
      field: string,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (!formik.touched?.[field]) formik.touched[field] = true;
      formik.setFieldValue(field, event.target.value);
    };
    return [
      {
        type: "text",
        properties: {
          name: "first_name",
          label: <FormLabel>First name</FormLabel>,
          styleProps: { colSpan: 6, mb: 4, isRequired: true },
          errorMessage:
            formik.touched?.first_name && formik.errors?.first_name ? (
              <FormErrorMessage>{formik.errors.first_name}</FormErrorMessage>
            ) : undefined,
          onBlur: formik.handleBlur,
          onChange: (event) => {
            handleChange("first_name", event);
          },
          value: formik.values?.first_name,
        },
      },
      {
        type: "text",
        properties: {
          name: "last_name",
          label: <FormLabel>Last name</FormLabel>,
          styleProps: { colSpan: 6, mb: 4, isRequired: true },
          errorMessage:
            formik.touched?.last_name && formik.errors?.last_name ? (
              <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
            ) : undefined,
          onBlur: formik.handleBlur,
          onChange: (event) => {
            handleChange("last_name", event);
          },
          value: formik.values?.last_name,
        },
      },
      {
        type: "text",
        properties: {
          name: "email",
          isDisabled: true,
          label: (
            <FormLabel d="flex" alignItems="center">
              Email{" "}
              <PencilEdit
                cursor="pointer"
                onClick={onOpen}
                ml={2}
                fontSize="lg"
              />
            </FormLabel>
          ),
          styleProps: { colSpan: 6, mb: 4, isRequired: true },
          errorMessage:
            formik.touched?.email && formik.errors?.email ? (
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            ) : undefined,
          onBlur: formik.handleBlur,
          onChange: (event) => {
            handleChange("first_name", event);
          },
          value: formik.values?.email,
        },
      },
    ];
  };
};

export const usePasswordControls = () => {
  const EyeOpen = chakra(AiOutlineEye);
  const EyeClosed = chakra(AiOutlineEyeInvisible);
  const [show, setShow] = useState<{
    [key in "password" | "password_confirmation"]: boolean;
  }>({ password: false, password_confirmation: false });

  return (formik: any): TFormControl[] => {
    const handleChange = (
      field: string,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (!formik.touched?.[field]) formik.touched[field] = true;
      formik.setFieldValue(field, event.target.value);
    };
    return [
      {
        type: "text",
        properties: {
          name: "password",
          type: show.password ? "text" : "password",
          label: <FormLabel>Password</FormLabel>,
          styleProps: { colSpan: 6, mb: 4, isRequired: true },
          rightElement: formik?.touched?.password && {
            children: show.password ? (
              <EyeClosed
                cursor="pointer"
                onClick={() => {
                  setShow({ ...show, password: false });
                }}
              />
            ) : (
              <EyeOpen
                cursor="pointer"
                onClick={() => {
                  setShow({ ...show, password: true });
                }}
              />
            ),
          },
          errorMessage:
            formik.touched?.password && formik.errors?.password ? (
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            ) : undefined,
          onBlur: formik.handleBlur,
          onChange: (event) => {
            handleChange("password", event);
          },
          value: formik.values?.password,
        },
      },
      {
        type: "text",
        properties: {
          name: "password_confirmation",
          type: show.password_confirmation ? "text" : "password",
          label: <FormLabel>Password Confirmation</FormLabel>,
          styleProps: { colSpan: 6, mb: 4, isRequired: true },
          rightElement: formik?.touched?.password_confirmation && {
            children: show.password_confirmation ? (
              <EyeClosed
                cursor="pointer"
                onClick={() => {
                  setShow({ ...show, password_confirmation: false });
                }}
              />
            ) : (
              <EyeOpen
                cursor="pointer"
                onClick={() => {
                  setShow({ ...show, password_confirmation: true });
                }}
              />
            ),
          },
          errorMessage:
            formik.touched?.password && formik.errors?.password_confirmation ? (
              <FormErrorMessage>
                {formik.errors.password_confirmation}
              </FormErrorMessage>
            ) : undefined,
          onBlur: formik.handleBlur,
          onChange: (event) => {
            handleChange("password_confirmation", event);
          },
          value: formik.values?.password_confirmation,
        },
      },
    ];
  };
};
