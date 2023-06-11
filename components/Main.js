import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import useRouter from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";

const Main = () => {
  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [stateChange]);

  const routing = useRouter(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
