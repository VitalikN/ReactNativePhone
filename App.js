import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import useRouter from "./router";

//
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useState } from "react";
import { app } from "./firebase/config";

//

const App = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) =>
    console.log("user==================", setUser(user))
  );
  const routing = useRouter(user);

  const [fontsLoaded] = useFonts({
    "R-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "R-medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "R-regular": require("./assets/fonts/Roboto-Regular400.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
};

export default App;
