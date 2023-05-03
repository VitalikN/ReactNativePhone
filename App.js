import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import useRouter from "./router";

const App = () => {
  const routing = useRouter({});

  const [fontsLoaded] = useFonts({
    "R-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "R-medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "R-regular": require("./assets/fonts/Roboto-Regular400.ttf"),
  });

  if (!fontsLoaded) return null;

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default App;
