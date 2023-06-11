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

export const authSignUpUser =
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
      // console.log("operations", auth);
    } catch (error) {
      console.log("authSignUpUser error", error);
      console.log("authSignUpUser error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async () => {
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

export const authStateChangeUser = () => async (dispatch) => {
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
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
    const auth = getAuth(app);
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
    console.log("authSignOutUser ======", auth);
  } catch (error) {
    console.log("authSignOutUser error.message", error.message);
  }
};
