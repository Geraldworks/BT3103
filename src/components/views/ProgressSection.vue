<template>
  <div class="progress-section-container">
    <div class="progress-header">
      <ComponentHeader :blackHeader="blackHeader" :redHeader="redHeader" />
    </div>
    <div class="progress-chart-container">
      <ProgressChart
        chartName="Weight"
        :progressOutput="weightData.Progress"
        :goal="weightGoal"
        :chartData="weightData"
        :chartColors="['#ED1F24', '#FFFFFF']"
        :chartLibrary="{
          cutout: '80%',
          borderColor: '#ED1F24',
          color: '#000',
        }"
      />
      <ProgressChart
        chartName="Muscle Mass"
        :chartData="muscleData"
        :progressOutput="muscleData.Progress"
        :goal="muscleGoal"
        :chartColors="['#ED1F24', '#FFFFFF']"
        :chartLibrary="{
          cutout: '80%',
          borderColor: '#ED1F24',
          color: '#000',
        }"
      />
    </div>
  </div>
</template>

<script>
import { db, auth } from "../../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useStore, mapGetters } from "vuex";

import ProgressChart from "./ProgressChart.vue";
import ComponentHeader from "./ComponentHeader.vue";
export default {
  name: "ProgressSection",
  data() {
    return {
      blackHeader: "Current",
      redHeader: "Progress",
      weightGoal: null,
      weightData: {
        Progress: null,
        Remaining: null,
      },
      muscleGoal: null,
      muscleData: {
        Progress: null,
        Remaining: null,
      },
    };
  },
  props: {
    email: String,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  components: {
    ProgressChart,
    ComponentHeader,
  },
  mounted() {
    const store = useStore();
    auth.onAuthStateChanged((user) => {
      store.dispatch("fetchUser", user);
    });
  },
  async created() {
    try {
      const clientRef = collection(db, "client");
      const q = query(clientRef, where("email", "==", this.user.data.email));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // Retrieving the only data will the correct email
        let documentData = doc.data();

        // storing the latest information
        let weightData = documentData.weight.slice(-1);
        let muscleMassData = documentData.muscleMass.slice(-1);

        // storing the goals
        let weightGoalValue = documentData.goals["weightGoal"];
        let muscleMassGoalValue = documentData.goals["muscleMassGoal"];

        // Compute the progress
        let weightProgress = Number(
          (weightData / weightGoalValue) * 100
        ).toFixed();
        let muscleMassProgress = Number(
          (muscleMassData / muscleMassGoalValue) * 100
        ).toFixed();

        // Assign the values to data()
        this.weightGoal = `${weightGoalValue}kg`;
        this.weightData.Progress = weightProgress;
        this.weightData.Remaining = 100 - weightProgress;
        this.muscleGoal = `${muscleMassGoalValue}%`;
        this.muscleData.Progress = muscleMassProgress;
        this.muscleData.Remaining = 100 - muscleMassProgress;
      });
    } catch (error) {
      console.log(error);
      console.log("No email observed in database");
    }
  },
};
</script>

<style scoped>
.progress-section-container {
  /* background: rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  display: inline-block;
  height: 34.5vh;
  box-sizing: border-box; */
  display: flex;
  flex-direction: column;
  /* height: 34.5vh; */
  width: 100%;
  box-sizing: border-box;
}

.progress-chart-container {
  display: flex;
  justify-content: space-evenly;
}
</style>