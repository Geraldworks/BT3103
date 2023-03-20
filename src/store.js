import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
      isTrainer: null
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
    SET_TRAINER(state, value) {
      state.user.isTrainer = value;
    }
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    })
  ],
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
          email: email,
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
          records: {
            benchPress: 0,
            deadlift: 0,
            squat: 0
          }, 
          goals: {
            muscleMassGoal: 0,
            weightGoal: 0,
          }
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
        context.commit("SET_LOGGED_IN", auth.currentUser !== null); // set loggedIn
      } else {
        throw new Error("login failed");
      }
    },

    async logOut(context) {
      await signOut(auth);
      context.commit("SET_USER", null); // to reset the email saved in store
      context.commit("SET_TRAINER", null); // to reset isTrainer
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
    },

    async fetchTrainer(context) {
      context.commit("SET_TRAINER", true);
    }
  },
});

export default store;
