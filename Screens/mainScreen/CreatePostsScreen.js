import React from "react";
import { View, Text, StyleSheet } from "react-native";

// import { Feather } from "@expo/vector-icons";
// <Feather name="arrow-left" size={24} color="black" />;

const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CreatePostsScreen</Text>
    </View>
  );
};
export default CreatePostsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
