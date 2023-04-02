<template>
  <Navbar />
  <div class="routines-page">
    <div class="routine-page-header">Your Routines</div>

    <div class="content-container">
      <RoutineContent :email="email" :fullName="fullName" />
    </div>
  </div>
</template>

<script>
import { mapGetters, useStore } from "vuex";
import { db, auth } from "../../firebase.js";
import RoutineContent from "../client/RoutineContent.vue";

export default {
  name: "RoutinesPage",
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      email: "",
      fullName: "",
    };
  },
  mounted() {
    const store = useStore();
    auth.onAuthStateChanged((user) => {
      store.dispatch("fetchUser", user);
    });
  },
  async created() {
    this.email = this.user.data.email;
    // this.fullName = this.user.data.fullName;
    console.log(this.email);
    // console.log(this.fullName);
  },
  methods: {
    // if using this method, ensure RoutineContent $emit() & listen to it
    // reloadRoutinesPage() {
    //   // window.location.reload();
    //   this.$router.go(0);
    // },
  },
  components: {
    RoutineContent,
  },
  watch: {
    email(newEmail) {
      console.log(newEmail);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");

.routine-page-header {
  color: white;
  border-bottom: 5px white solid;
  font-size: 3rem;
  text-transform: uppercase;
  width: 80%;
  margin: auto;
  padding-top: 20px;
}

.routines-page {
  background-color: black;
  overflow-y: hidden;
  min-width: 800px; /* Or else the PerformanceBottom component will overflow into the side margin */
  padding-bottom: 30px;
  min-height: 79vh;
  font-family: Teko;
}

.content-container {
  background-color: #d9d9d9;
  margin: 0vw 10vw;
  border-radius: 25px;
  padding: 30px 60px;
  margin-top: 22px;
  max-height: 59vh;
  overflow-y: auto;
}

body::-webkit-scrollbar {
  display: none;
}
</style>