import "react-native-gesture-handler";

import { useFonts } from "expo-font";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "./components/Main";

const App = () => {
  const [fontsLoaded] = useFonts({
    "R-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "R-medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "R-regular": require("./assets/fonts/Roboto-Regular400.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
