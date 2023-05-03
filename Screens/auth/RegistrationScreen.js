import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const [passwordSecured, setPasswordSecured] = useState(true);

  const keyboardHide = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss();
  };
  const handleSubmit = () => {
    keyboardHide();
    setState(initialState);
    console.log(state);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.img}
          source={require("../../assets/photo.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                ...styles.form_container,
                marginBottom: isKeyboardVisible ? -170 : 0,
              }}
            >
              <Text style={styles.text}>Registration</Text>
              <Image
                source={require("../../assets/photo.png")}
                style={styles.imgAvatar}
                contentFit="cover"
                transition={1000}
              />
              <View style={styles.containerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="login"
                  value={state.login}
                  onFocus={() => setIsKeyboardVisible(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  require
                />
              </View>
              <View style={styles.containerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  require
                  onFocus={() => setIsKeyboardVisible(true)}
                />
              </View>
              <View style={styles.containerInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  secureTextEntry={true}
                  require
                  onFocus={() => setIsKeyboardVisible(true)}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn}
                onPress={handleSubmit}
              >
                <Text style={styles.btnText}>Register</Text>
              </TouchableOpacity>

              <Text style={styles.textSign}>
                Already have an account?{" "}
                <Text onPress={() => navigation.navigate("Login")}>
                  Sign in
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  img: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  form_container: {
    position: "relative",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  imgAvatar: {
    position: "absolute",
    width: 120,
    height: 120,

    top: -60,

    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  containerInput: {
    width: "100%",
  },

  text: {
    fontFamily: "R-medium",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,

    color: "#212121",
    marginTop: 92,
    marginBottom: 33,
  },
  input: {
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,

    height: 50,
  },

  // input_active: {
  //   backgroundColor: "#ffffff",
  //   borderColor: "#FF6C00",
  // },

  btn: {
    marginBottom: 16,

    height: 51,
    backgroundColor: "#ff6C00",
    borderRadius: 100,
    textAlign: "center",
  },
  btnText: {
    fontFamily: "R-regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,

    padding: 145,
    paddingBottom: 16,
    paddingTop: 16,
    color: "#ffffff",
  },
  textSign: {
    fontFamily: "R-regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 78,
    color: "#1b4371",
    textAlign: "center",
  },
});
