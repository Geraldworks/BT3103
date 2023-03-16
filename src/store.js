import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    async signUp(
      context,
      {
        gymmboxxid,
        contactNo,
        emergencyContactName,
        emergencyContactNo,
        fullName,
        email,
        password,
      }
    ) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response) {
        context.commit("SET_USER", {
          email: email,
        }); // store the state of the email so that it can be accessed to pull data from db
        // push info to db
        await setDoc(doc(db, "client", email), {
          gymmboxxid: gymmboxxid,
          bookingIds: [],
          contactNo: contactNo,
          datetime: [],
          emergencyContactName: emergencyContactName,
          emergencyContactNo: emergencyContactNo,
          fatPercentage: [],
          fullName: fullName,
          muscleMass: [],
          routineIds: [],
          weight: [],
        });
      } else {
        throw new Error("Unable to register user");
      }
    },

    async signIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit("SET_USER", {
          email: email,
        });
      } else {
        throw new Error("login failed");
      }
    },

    async logOut(context) {
      await signOut(auth);
      context.commit("SET_USER", null); // to reset the email saved in store
    },

    async fetchUser(context, user) {
      context.commit("SET_LOGGED_IN", user !== null);
      if (user) {
        context.commit("SET_USER", {
          email: user.email,
        });
      } else {
        context.commit("SET_USER", null);
      }
    }
  },
});

export default store;
