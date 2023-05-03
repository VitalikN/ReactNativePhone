import React from "react";
import { View, Text, StyleSheet } from "react-native";

// import { MaterialIcons } from "@expo/vector-icons";
// <MaterialIcons name="logout" size={24} color="black" />;

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MapScreen</Text>
    </View>
  );
};
export default MapScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
