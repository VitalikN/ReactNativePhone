import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";
import { app } from "../../firebase/config";

// import { createUserWithEmailAndPassword } from "firebase/auth";

export const authSingUpUser =
  ({ email, password, login }) =>
  async (dispatch) => {
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      const updateUser = await updateProfile(user, {
        displayName: login,
      });
      const { uid, displayName, userEmail } = await auth.currentUser;
      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        userEmail: userEmail,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      console.log("operations", auth);
    } catch (error) {
      console.log("authSingUpUser error", error);
      console.log("authSingUpUser error.message", error.message);
    }
  };

export const authSingInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);

      console.log("authSingInUser ======", auth);
    } catch (error) {
      console.log("authSingInUser error", error);
      console.log("authSingInUser error.message", error.message);
    }
  };

export const authSingOutUser = () => async (dispatch, getSatte) => {};
