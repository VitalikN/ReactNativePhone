import { StatusBar } from "expo-status-bar";

import { useState } from "react";
import {
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

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
                marginBottom: isKeyboardVisible ? -250 : 0,
              }}
            >
              <Text style={styles.text}>login</Text>

              <View>
                <TextInput
                  style={styles.input}
                  // activeStyle={styles.input_active}
                  placeholder="Email address"
                  value={state.email}
                  onFocus={() => setIsKeyboardVisible(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View>
                <TextInput
                  style={{ ...styles.input, marginBottom: 43 }}
                  placeholder="Password"
                  onFocus={() => setIsKeyboardVisible(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  secureTextEntry={true}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn}
                onPress={handleSubmit}
              >
                <Text style={styles.btnText}>Sign in</Text>
              </TouchableOpacity>
              <Text style={styles.textSign}>
                Don't have an account? Register
              </Text>
            </View>
          </KeyboardAvoidingView>
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;

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
  },
  text: {
    fontFamily: "R-medium",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,

    color: "#212121",
    marginTop: 32,
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

  btn: {
    marginBottom: 16,

    height: 51,
    backgroundColor: "#ff6C00",
    borderRadius: 100,
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
    marginBottom: 144,
    color: "#1b4371",
    textAlign: "center",
  },
});
