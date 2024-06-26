import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { SignUp } from "@screens/signup";
import { ActivityIndicator, StatusBar, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import theme from "src/theme";
import { ThemeProvider } from "styled-components/native";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={"transparent"}
          translucent
        />

        {fontsLoaded ? <SignUp /> : <ActivityIndicator />}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
