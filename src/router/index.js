import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../components/views/SignUp.vue";
import SignIn from "../components/views/SignIn.vue";
import LandingPage from "../components/views/LandingPage.vue";
import PerformancePage from "../components/views/PerformancePage.vue";
import BookingPage from "../components/views/BookingPage.vue";
import RoutinesPage from "../components/views/RoutinesPage.vue";
import TrainerPage from "../components/views/TrainerPage.vue";
import TrainerCalendarPage from "../components/views/TrainerCalendarPage.vue";
import NotFound from "../components/views/NotFound.vue";
import EditProfilePage from "../components/views/EditProfilePage.vue";
import GoalsPage from "../components/views/GoalsPage.vue";
import RecordsPage from "../components/views/RecordsPage.vue";

import store from "../store";

const routes = [
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
  },
  {
    path: "/performance",
    name: "Performance",
    component: PerformancePage,
  },
  {
    path: "/booking",
    name: "Booking",
    component: BookingPage,
  },
  // {
  //   path: "/calendar",
  //   name: "Calendar",
  //   component: CalendarPage,
  // },
  {
    path: "/routines",
    name: "Routines",
    component: RoutinesPage,
  },
  {
    path: "/editprofile",
    name: "EditProfile",
    component: EditProfilePage,
  },
  {
    path: "/goals",
    name: "Goals",
    component: GoalsPage,
  },
  {
    path: "/clients",
    name: "TrainerPage",
    component: TrainerPage,
  },
  {
    path: "/trainer-calendar",
    name: "TrainerCalendarPage",
    component: TrainerCalendarPage,
  },
  {
    path: "/records",
    name: "Records",
    component: RecordsPage,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  if (store.state.user.isTrainer) {
    // NAV GUARDS FOR TRAINER
    console.log("trainer");
    if (
      store.state.user.loggedIn &&
      (to.name == "Performance" ||
      to.name == "Booking" ||
      to.name == "Calendar" ||
      to.name == "Routines" ||
      to.name == "SignIn" ||
      to.name == "SignUp" ||
      to.name == "Landing" ||
      to.name == "EditProfile")
    ) {
        return { name: "TrainerPage" };
    }
  } else {
    // NAV GUARDS FOR CLIENT
    if (
      !store.state.user.loggedIn &&
      to.name !== "SignIn" &&
      to.name !== "Landing" &&
      to.name !== "SignUp"
    ) {
      return { name: "SignIn" };
    } else if (
      store.state.user.loggedIn &&
      (to.name == "Landing" ||
        to.name == "SignUp" ||
        to.name == "SignIn" ||
        to.name == "TrainerPage" ||
        to.name == "TrainerCalendarPage")
    ) {
      return { name: "Performance" };
    }
  }
});

export default router;
