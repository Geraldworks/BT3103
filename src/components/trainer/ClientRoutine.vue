<template>
  <div class="routines-page">
    <TrainerNavbar />
    <div>
      <TrainerPerformanceHeader
        :email="email"
        :profilePic="profilePicURL"
        @returnToHome="returnBackToTrainerHomePage()"
        @routeToPerformance="routeToPerformancePage()"
      />
    </div>
    <div class="content-container">
      <RoutineContent :email="email" :userFullName="userFullName" />
    </div>
  </div>
</template>

<script>
import RoutineContent from "../client/RoutineContent.vue";
import TrainerPerformanceHeader from "./TrainerPerformanceHeader.vue";
import TrainerNavbar from "./TrainerNavbar.vue";

export default {
  name: "ClientRoutine",
  props: ["email", "userFullName", "profilePicURL", "clientName"],
  components: {
    TrainerPerformanceHeader,
    RoutineContent,
    TrainerNavbar,
  },
  methods: {
    // goes back to the client selection page
    returnBackToTrainerHomePage() {
      this.$emit("returnToHome");
    },
    // goes to the routines page
    routeToPerformancePage() {
      this.$emit("routeToPerformance");
    },
  },
  emits: ["returnToHome", "routeToPerformance"],
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");

.content-container {
  background-color: #d9d9d9;
  margin: 0vw 10vw;
  border-radius: 25px;
  padding: 30px 60px;
  margin-top: 22px;
  max-height: 59vh;
  overflow-y: auto;
}

.routines-page {
  background-color: black;
  overflow-y: hidden;
  min-width: 800px; /* Or else the PerformanceBottom component will overflow into the side margin */
  padding-bottom: 5%;
  min-height: 100vh;
  font-family: Teko;
}

@media screen and (max-width: 800px) {
  .routines-page {
    padding-bottom: calc(600px - 10vh);
  }
  .content-container {
    max-height: 80vh;
  }
}

@media screen and (max-width: 550px) {
  .routines-page {
    padding-bottom: calc(850px - 10vh);
  }
}

@media screen and (max-width: 400px) {
  .routines-page {
    padding-bottom: calc(1200px - 10vh);
  }
}

body::-webkit-scrollbar {
  display: none;
}
</style>
