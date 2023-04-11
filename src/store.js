import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { signOut } from "firebase/auth";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
      isTrainer: null,
      clientEmail: null,
      displayRoutines: false,
      clientInfo: null,
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
    },
    SET_CLIENT_EMAIL(state, value) {
      state.user.clientEmail = value;
    },
    SET_ROUTINES(state, value) {
      state.user.displayRoutines = value;
    },
    SET_CLIENTINFO(state, value) {
      state.user.clientInfo = value;
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
        trainerEmail,
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
          bookings: [],
          contactNo: contactNo,
          datetime: [],
          emergencyContactName: emergencyContactName,
          emergencyContactNo: emergencyContactNo,
          fatPercentage: [],
          fullName: fullName,
          muscleMass: [],
          routineNextId: 1,
          routines: [],
          weight: [],
          records: {
            benchPress: 0,
            deadlift: 0,
            squat: 0
          }, 
          goals: {
            muscleMassGoal: 0,
            weightGoal: 0,
          },
          trainerEmail: trainerEmail,
        });

        await updateDoc(doc(db, "trainer", trainerEmail), {
          ClientsId: arrayUnion(email),
        })
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
    },

    async setClientEmail(context, email) {
      context.commit("SET_CLIENT_EMAIL", email);
    },

    async setDisplayRoutinesStatus(context, bool) {
      context.commit("SET_ROUTINES", bool);
    },

    async setClientInfo(context, clientInfo) {
      context.commit("SET_CLIENTINFO", clientInfo);
    }
  },
});

export default store;
