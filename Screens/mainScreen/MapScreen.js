import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
// import { MaterialIcons } from "@expo/vector-icons";
// <MaterialIcons name="logout" size={24} color="black" />;

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 12,
          longitude: 32,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 12, longitude: 32 }} />
      </MapView>
    </View>
  );
};
export default MapScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
