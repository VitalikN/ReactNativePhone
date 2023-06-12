import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";
import { auth } from "../../firebase/config";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      const updateUser = await updateProfile(user, {
        displayName: login,
      });
      const { uid, displayName } = await auth.currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        userEmail: email,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("authSignUpUser error", error);
      console.log("authSignUpUser error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("authSignInUser error", error);
      console.log("authSignInUser error.message", error.message);
    }
  };

export const authStateChangeUser = () => async (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
      };
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};
export const authSignOutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    console.log("authSignOutUser error.message", error.message);
  }
};
