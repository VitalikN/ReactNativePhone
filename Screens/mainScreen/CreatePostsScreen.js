import React, { useState, useEffect, useRef } from "react";

import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState("");
  const [photoLocationName, setPhotoLocationName] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);

      setPhoto(uri);
    }
  };
  const sendPhoto = () => {
    navigation.navigate("Posts", { photo, place, photoLocationName });
    setPhoto("");
    setPlace("");
    setPhotoLocationName("");
  };

  const deletePost = () => {
    setPhoto("");
    setPlace("");
    setPhotoLocationName("");
  };

  return (
    <View style={styles.container}>
      {photo === "" ? (
        <View style={styles.container}>
          <Camera style={styles.camera} type={type} ref={setCameraRef}>
            <View style={styles.photoView}></View>
          </Camera>
          <View style={styles.containerBtn}>
            <View style={styles.containerTakePhoto}>
              <TouchableOpacity onPress={takePhoto}>
                <View style={styles.takePhotoOut}>
                  <View style={styles.takePhotoInner}></View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.containerReverse}>
              <TouchableOpacity
                style={styles.containerIcon}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons name="camera-reverse" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.containerPhoto}>
          <View>
            <Image source={{ uri: photo }} style={styles.takePhoto} />
          </View>
          <View style={styles.form}>
            <View>
              <TextInput
                value={place}
                onChangeText={(value) => setPlace(value)}
                style={styles.inputName}
                placeholder="Name..."
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 32 }}>
              <EvilIcons name="location" size={24} color="black" />

              <TextInput
                value={photoLocationName}
                onChangeText={(value) => setPhotoLocationName(value)}
                style={styles.inputLocation}
                placeholder="locality..."
              />
            </View>
          </View>

          <TouchableOpacity
            style={{
              ...styles.containerSendPhoto,
              backgroundColor:
                place !== "" && photoLocationName !== ""
                  ? "#FF6C00"
                  : "#F6F6F6",
            }}
            onPress={sendPhoto}
          >
            <Text
              style={{
                ...styles.publish,
                color:
                  place !== "" && photoLocationName !== ""
                    ? "#fff"
                    : "rgba(189, 189, 189, 1)",
              }}
            >
              Publish
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={deletePost}
            style={styles.containerIconDelete}
          >
            <AntDesign name="delete" size={22} color={"#BDBDBD"} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { height: "85%" },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  containerPhoto: {
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: "#fff",
  },
  takePhoto: {
    borderWidth: 1,
    borderColor: "#fff",
    width: "100%",
    height: 240,
    marginTop: 32,
    borderRadius: 8,
  },

  // flipContainer: {
  //   flex: 0.1,
  //   alignSelf: "flex-end",
  // },
  containerBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-around",
    backgroundColor: "#000",
  },
  containerTakePhoto: {
    flex: 1,
    alignItems: "center",
    marginLeft: 70,
  },

  containerReverse: {
    marginRight: 20,
  },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },

  // camera: {
  //   // flex: 1,
  //   width: 343,
  //   height: 240,
  //   marginTop: 32,
  //   borderRadius: 8,
  //   marginLeft: "auto",
  //   marginRight: "auto",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#F6F6F6",

  //   borderColor: "#E8E8E8",
  //   borderWidth: 1,
  // },

  // photoView: {
  //   flex: 1,
  //   backgroundColor: "transparent",
  //   justifyContent: "flex-end",
  //   borderColor: "#fff",
  //   borderWidth: 1,
  // },

  containerIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  /**Form */
  inputName: {
    marginTop: 48,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 19,
  },

  inputLocation: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: 8,
  },

  containerIconDelete: {
    width: 70,

    marginTop: Platform.OS === "ios" ? "45%" : "40%",
    marginBottom: 30,
    marginRight: "auto",
    marginLeft: "auto",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    color: "#DADADA",
  },

  icon: {
    fontSize: 30,
  },

  containerSendPhoto: {
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    marginTop: 32,
    // backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  publish: {
    fontFamily: "R-regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,

    color: "#ffffff",
  },
});
