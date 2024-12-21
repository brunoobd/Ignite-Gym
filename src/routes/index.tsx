import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { gluestackUIConfig } from "config/gluestack-ui.config";
import { Box } from "@gluestack-ui/themed";

export const Routes = () => {
  DefaultTheme.colors.background = gluestackUIConfig.tokens.colors.gray700;

  return (
    <Box flex={1} bg={"$gray700"}>
      <NavigationContainer theme={DefaultTheme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
};
