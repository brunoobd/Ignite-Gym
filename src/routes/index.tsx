import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { gluestackUIConfig } from "config/gluestack-ui.config";
import { Box } from "@gluestack-ui/themed";
import { AppRoutes } from "./app.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

export const Routes = () => {
  const { user, isLoadingUserStorageData } = useAuth();
  DefaultTheme.colors.background = gluestackUIConfig.tokens.colors.gray700;

  if (isLoadingUserStorageData) return <Loading />;

  return (
    <Box flex={1} bg={"$gray700"}>
      <NavigationContainer theme={DefaultTheme}>
        {user ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};
