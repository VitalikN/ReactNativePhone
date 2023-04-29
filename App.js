import { useFonts } from "expo-font";

import RegistrationScreen from "./components/Screens/RegistrationScreen";
import LoginScreen from "./components/Screens/LoginScreen";

const App = () => {
  const [fontsLoaded] = useFonts({
    "R-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "R-medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "R-regular": require("./assets/fonts/Roboto-Regular400.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <>
      {/* <RegistrationScreen /> */}
      <LoginScreen />
    </>
  );
};

export default App;
