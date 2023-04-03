<template>
    <div>
        <TrainerPerformanceHeader 
            :email= "email" 
            :profilePic="profilePicURL"
            @returnToHome="returnBackToTrainerHomePage()"
            @routeToPerformance="routeToPerformancePage()"
        />
    </div>
    <div class="routines-page">
        <div class="routine-page-header">Your Routines</div>

        <div class="content-container">
        <RoutineContent :email="email" :fullName="fullName" />
        </div>
    </div>
</template>

<script>
import ClientRoutineContent from "./ClientRoutineContent.vue";
import RoutineContent from "../client/RoutineContent.vue";
import TrainerPerformanceHeader from "./TrainerPerformanceHeader.vue";

export default {
    name: "ClientRoutine",
    props:["email", "fullName", "profilePicURL"],
    components: {
        ClientRoutineContent,
        TrainerPerformanceHeader,
        RoutineContent
    },
    methods: {
        returnBackToTrainerHomePage() {
            this.$emit("returnToHome");
        },
        routeToPerformancePage() {
            this.$emit("routeToPerformance");
        }
    },
    emits: ["returnToHome"]
}
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
.routine-page-header {
  color: white;
  border-bottom: 5px white solid;
  font-size: 3rem;
  text-transform: uppercase;
  width: 80%;
  margin: auto;
  padding-top: 20px;
}
body::-webkit-scrollbar {
  display: none;
}
</style>