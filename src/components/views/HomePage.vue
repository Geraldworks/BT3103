<template>
  <div class="performance-page">
    <div>
      <NavBar />
    </div>
    <PerformanceHeader />
    <div class="content-container">
      <AllCharts />
      <Records />
      <ProgressSection />
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div v-if="user.loggedIn" class="alert alert-success" role="alert">
            Welcome, {{ user.data.email }} <br /><br />
            You are logged in!
          </div>
          <div v-else class="alert alert-danger" role="alert">
            You are not logged in!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { auth } from "../../firebase";
import AllCharts from "../AllCharts.vue";
import Records from "./Records.vue";
import ProgressSection from "./ProgressSection.vue";
import PerformanceHeader from "../PerformanceHeader.vue";

export default {
  name: "HomePageComponent",
  setup() {
    const store = useStore();

    auth.onAuthStateChanged((user) => {
      store.dispatch("fetchUser", user);
    });

    const user = computed(() => {
      return store.getters.user;
    });

    return { user };
  },

  components: {
    AllCharts,
    Records,
    ProgressSection,
    PerformanceHeader,
  },
};
</script>

<style>
.performance-page {
  background-color: black;
}

.content-container {
  background-color: #D9D9D9;
  margin: 0 30px;
  border-radius: 25px;
}
</style>
