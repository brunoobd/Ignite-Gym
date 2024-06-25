import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { ActivityIndicator, StatusBar, Text, View } from "react-native";
import theme from "src/theme";
import { ThemeProvider } from "styled-components/native";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />

      {fontsLoaded ? <Text>Hello World!</Text> : <ActivityIndicator />}
    </ThemeProvider>
  );
}
