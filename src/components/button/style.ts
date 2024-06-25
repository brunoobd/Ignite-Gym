import { ButtonVariant } from "@components/model";
import { PressableProps } from "react-native";
import styled, { css } from "styled-components/native";

type ButtonProps = PressableProps & {
  variant: ButtonVariant;
};

export const Container = styled.Pressable<ButtonProps>`
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;
  border-width: 1px;

  ${({ theme, variant }) => css`
    border-color: ${variant === "PRIMARY"
      ? theme.COLORS.GREEN_DARK
      : theme.COLORS.GREEN_MID};
    background-color: ${variant === "PRIMARY"
      ? theme.COLORS.GREEN_DARK
      : "tranparent"};
  `}
`;

export const Title = styled.Text<{ variant: ButtonProps["variant"] }>`
  ${({ theme, variant }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${variant === "PRIMARY"
      ? theme.COLORS.WHITE
      : theme.COLORS.GREEN_MID};
  `}
`;
