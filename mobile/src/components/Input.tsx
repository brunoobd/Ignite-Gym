import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input as GluestackInput,
  InputField,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string;
  isReadOnly?: boolean;
};

export const Input = ({ errorMessage, isReadOnly = false, ...rest }: Props) => {
  const isInvalid = !!errorMessage;

  return (
    <FormControl isInvalid={isInvalid} mb="$4" w="$full">
      <GluestackInput
        h={"$14"}
        borderWidth={"$1"}
        borderColor={"$gray700"}
        borderRadius={"$md"}
        $focus={{
          borderWidth: 1,
          borderColor: isInvalid ? "$red500" : "$green500",
        }}
        $invalid={{ borderWidth: 1, borderColor: "$red500" }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        <InputField
          px="$4"
          bg="$gray700"
          color="$white"
          fontFamily="$body"
          placeholderTextColor={"$gray300"}
          {...rest}
        />
      </GluestackInput>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};
