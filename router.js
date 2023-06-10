import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";

import Home from "./Screens/mainScreen/Home";
import MapScreen from "./Screens/mainScreen/MapScreen";
import CommentsScreen from "./Screens/mainScreen/CommentsScreen";

const MainStack = createStackNavigator();
const MainTab = createStackNavigator();

const useRouter = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Registration">
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator initialRouteName="Home">
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        name="Home"
        component={Home}
      />
      <MainTab.Screen
        options={{
          headerTitleAlign: "center",
          title: "MapScreen",
        }}
        name="MapScreen"
        component={MapScreen}
      />
      <MainTab.Screen
        options={{
          title: "CommentsScreen",
          headerTitleAlign: "center",
        }}
        name="CommentsScreen"
        component={CommentsScreen}
      />
    </MainTab.Navigator>
  );
};
export default useRouter;
