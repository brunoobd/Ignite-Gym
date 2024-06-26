import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { useTheme } from "styled-components/native";
import { View } from "react-native";

export const Routes = () => {
  const { GRAY_700 } = useTheme().COLORS;
  const theme = DefaultTheme;

  theme.colors.background = GRAY_700;

  return (
    <View style={{ flex: 1, backgroundColor: GRAY_700 }}>
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </View>
  );
};
