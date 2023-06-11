import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

import { authSignOutUser } from "../../redux/auth/authOperations";

const MainTab = createBottomTabNavigator();

const Home = () => {
  const dispatch = useDispatch();
 
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          title: "Posts",

          headerRight: () => (
            <TouchableOpacity
              onPress={signOut}
              activeOpacity={0.7}
              style={styles.logout}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <TouchableOpacity style={styles.containerIcon}>
                <Feather name="grid" size={size} color="#FFFFFF" />
              </TouchableOpacity>
            ) : (
              <Feather name="grid" size={size} color={color} />
            ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={styles.arrowLeft}
              onPress={() => navigation.navigate("Posts")}
            >
              <Feather
                name="arrow-left"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),

          tabBarStyle: { display: "none" },
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <TouchableOpacity style={styles.containerIcon}>
                <AntDesign name="plus" size={size} color="#FFFFFF" />
              </TouchableOpacity>
            ) : (
              <AntDesign name="plus" size={size} color={color} />
            ),
        })}
        name="Create a post"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <TouchableOpacity style={styles.containerIcon}>
                <Feather name="user" size={size} color="#FFFFFF" />
              </TouchableOpacity>
            ) : (
              <Feather name="user" size={size} color={color} />
            ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
export default Home;

const styles = StyleSheet.create({
  logout: {
    marginRight: 16,
  },

  containerIcon: {
    backgroundColor: "#FF6C00",
    borderRadius: 20,

    width: 70,
    height: 40,

    justifyContent: "center",
    alignItems: "center",
  },

  arrowLeft: {
    marginLeft: 16,
  },
});
