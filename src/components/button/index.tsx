import { PressableProps } from "react-native";
import { Container, Title } from "./style";
import { ButtonVariant } from "@components/model";
import { useTheme } from "styled-components/native";
import { useEffect, useState } from "react";

type Props = PressableProps & {
  title: string;
  variant?: ButtonVariant;
};

export const Button = ({ title, variant = "PRIMARY", ...props }: Props) => {
  const { GREEN_DARK, GREEN_MID, WHITE } = useTheme().COLORS;
  const [isPressed, setIsPressed] = useState(false);

  const getButtonStyle = (pressed: boolean) => {
    if (variant === "PRIMARY") {
      if (pressed) {
        return {
          backgroundColor: GREEN_MID,
          borderColor: GREEN_MID,
        };
      } else {
        return {
          backgroundColor: GREEN_DARK,
          borderColor: GREEN_DARK,
        };
      }
    } else {
      if (pressed) {
        return {
          backgroundColor: GREEN_DARK,
          borderColor: GREEN_DARK,
        };
      } else {
        return {
          backgroundColor: "transparent",
          borderColor: GREEN_MID,
        };
      }
    }
  };

  const onPressIn = () => setIsPressed(true);

  const onPressOut = () => setIsPressed(false);

  return (
    <Container
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({ pressed }) => getButtonStyle(pressed)}
      variant={variant}
      {...props}
    >
      <Title
        style={{
          color: `${variant === "SECONDARY" && !isPressed ? GREEN_MID : WHITE}`,
        }}
        variant={variant}
      >
        {title}
      </Title>
    </Container>
  );
};
