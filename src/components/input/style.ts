import { TextInputProps } from "react-native";
import styled, { css } from "styled-components/native";

type InputProps = TextInputProps & {
  hasError: boolean;
  focused: boolean;
};

export const Container = styled.TextInput.attrs<InputProps>(({ theme }) => ({
  placeholderTextColor: theme.COLORS.GRAY_300,
}))`
  width: 100%;
  padding: 16px;

  border-radius: 5px;
  border-width: 1px;

  ${({ theme, focused, hasError }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.WHITE};

    background-color: ${theme.COLORS.GRAY_700};

    border-color: ${hasError
      ? theme.COLORS.RED
      : focused
      ? theme.COLORS.GREEN_MID
      : "transparent"};
  `}
`;
