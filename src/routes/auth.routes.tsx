import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignIn } from "@screens/signin";
import { SignUp } from "@screens/signup";

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Screen, Navigator } = createNativeStackNavigator<AuthRoutes>();

export const AuthRoutes = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="signIn" component={SignIn} />
    <Screen name="signUp" component={SignUp} />
  </Navigator>
);
