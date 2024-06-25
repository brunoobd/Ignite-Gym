import { TextInputProps } from "react-native";
import { Container } from "./style";
import { useState } from "react";

type Props = TextInputProps & {
  hasError?: boolean;
};

export const Input = ({ hasError = false, ...props }: Props) => {
  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    props.onFocus;
    setFocused(true);
  };

  const onBlur = () => {
    props.onBlur;
    setFocused(false);
  };

  return (
    <Container
      focused={focused}
      hasError={hasError}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    />
  );
};
