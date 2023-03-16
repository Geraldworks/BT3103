<template>
  <div>
    <NavBar />
  </div>
  <h1>this is home page</h1>
  <Chart/>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
          <div v-if="user.loggedIn" class="alert alert-success" role="alert">
            Welcome, {{ user.data.email }} <br><br> 
            You are logged in!
          </div>
          <div v-else class="alert alert-danger" role="alert">
            You are not logged in!
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { auth } from "../../firebase";
import Chart from "./Chart.vue";

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
    Chart
  }
};
</script>
