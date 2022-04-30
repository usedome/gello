import { FC } from "react";
import {
  FormControl as ChakraFormControl,
  GridItem,
  Textarea,
} from "@chakra-ui/react";
import { TFormControl } from ".";
import { CustomTextInput } from "../Custom";

export const FormControl: FC<TFormControl> = ({ type, properties }) => {
  const { label, helperText, errorMessage, styleProps, ...props } = properties;
  const isRequired = styleProps?.isRequired ?? false;
  delete styleProps?.isRequired;

  const displayControl = () => {
    const properties: any = props;
    switch (type) {
      case "text":
        return <CustomTextInput {...properties} />;
      case "textarea":
        return <Textarea {...properties} />;
      default:
        return <div />;
    }
  };

  return (
    <GridItem {...styleProps}>
      <ChakraFormControl
        isInvalid={Boolean(errorMessage)}
        isRequired={isRequired}
      >
        {label && label}
        {displayControl()}
        {helperText && helperText}
        {errorMessage && errorMessage}
      </ChakraFormControl>
    </GridItem>
  );
};
