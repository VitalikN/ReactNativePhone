import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import PostsScreen from "./Screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRouter = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator>
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
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      <MainTab.Screen
        options={{
          headerTitleAlign: "center",
          title: "Publication",
          headerRight: () => (
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
        name="Publication"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
        }}
        name="Create a publication"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
export default useRouter;
