import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Routes } from "@routes/index";
import { ActivityIndicator, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />

      {fontsLoaded ? <Routes /> : <ActivityIndicator />}
    </SafeAreaProvider>
  );
}
