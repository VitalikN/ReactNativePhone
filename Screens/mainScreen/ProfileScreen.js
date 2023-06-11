import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import { MaterialIcons } from "@expo/vector-icons";

import { authSignOutUser } from "../../redux/auth/authOperations";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>ProfileScreen</Text>
      </View>
      <TouchableOpacity
        onPress={signOut}
        activeOpacity={0.7}
        style={{
          margin: 30,
          justifyContent: "center",
        }}
      >
        <MaterialIcons name="logout" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
