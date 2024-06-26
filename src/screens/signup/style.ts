import { EdgeInsets } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

type ContainerProps = {
  insets: EdgeInsets;
};

export const Container = styled.SafeAreaView<ContainerProps>`
  flex: 1;

  ${({ theme, insets }) => css`
    padding-top: ${insets.top}px;

    background-color: ${theme.COLORS.GRAY_700};
  `}
`;

export const BackgroundImage = styled.Image`
  position: absolute;

  top: 0;
`;

export const Content = styled.View`
  padding-top: 50px;
  padding-left: 30px;
  padding-right: 30px;

  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Form = styled.View`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 15px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.XL}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`;
