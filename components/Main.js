import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { authSlice } from "../redux/auth/authReducer";
import { useDispatch, useSelector } from "react-redux";
import useRouter from "../router";

const Main = () => {
  const dispatch = useDispatch();
  const { stateChange } = useSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userUpdateProfile = {
          login: user.displayName,
          userId: user.uid,
          userEmail: user.email,
        };
        dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      }
    });
  }, [stateChange]);

  const routing = useRouter(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
