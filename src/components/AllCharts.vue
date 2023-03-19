<script>
import Chart from "./Chart.vue";
import { db, auth } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useStore, mapGetters } from "vuex";

export default {
  data() {
    return {
      fatDateObject: {},
      weightDateObject: {},
      muscleDateObject: {},
      recentFat: null,
      recentWeight: null,
      recentMuscle: null,
    };
  },
  props: {
    email: String,
  },
  methods: {
    makeObject(dates, healthData) {
      let obj = {};
      for (let i = 0; i < dates.length; i++) {
        obj[dates[i]] = healthData[i];
      }
      return obj;
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  components: {
    Chart,
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
      const q = query(clientRef, where("email", "==", this.email)); // this should be made reactive
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // Retrieving the only data will the correct email
        let documentData = doc.data();

        // storing the array information (only getting last 5 data)
        let fatPercentageData = documentData.fatPercentage.slice(-5);
        let weightData = documentData.weight.slice(-5);
        let muscleMassData = documentData.muscleMass.slice(-5);
        let dates = documentData.datetime.slice(-5).map((dt) => dt.toDate());

        // assigning the recent health data
        this.recentFat = fatPercentageData[fatPercentageData.length - 1];
        this.recentWeight = weightData[weightData.length - 1];
        this.recentMuscle = muscleMassData[muscleMassData.length - 1];

        // making the health data objects
        this.fatDateObject = this.makeObject(dates, fatPercentageData);
        this.weightDateObject = this.makeObject(dates, weightData);
        this.muscleDateObject = this.makeObject(dates, muscleMassData);
      });
    } catch (error) {
      console.log(error);
      console.log("No email observed in database");
    }
  },
  // async beforeUpdate() { // causes infinite db calls
  //   try {
  //     const clientRef = collection(db, "client");
  //     const q = query(clientRef, where("email", "==", this.email)); // this should be made reactive
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       // Retrieving the only data will the correct email
  //       let documentData = doc.data();

  //       // storing the array information (only getting last 5 data)
  //       let fatPercentageData = documentData.fatPercentage.slice(-5);
  //       let weightData = documentData.weight.slice(-5);
  //       let muscleMassData = documentData.muscleMass.slice(-5);
  //       let dates = documentData.datetime.slice(-5).map((dt) => dt.toDate());

  //       // assigning the recent health data
  //       this.recentFat = fatPercentageData[fatPercentageData.length - 1];
  //       this.recentWeight = weightData[weightData.length - 1];
  //       this.recentMuscle = muscleMassData[muscleMassData.length - 1];

  //       // making the health data objects
  //       this.fatDateObject = this.makeObject(dates, fatPercentageData);
  //       this.weightDateObject = this.makeObject(dates, weightData);
  //       this.muscleDateObject = this.makeObject(dates, muscleMassData);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     console.log("No email observed in database");
  //   }
  // },
};
</script>

<template>
  <div class="chart-container">
    <Chart
      class="chart"
      chartName="Fat Percentage"
      :chartData="fatDateObject"
      :chartColor="['#FF0000']"
      :recentData="recentFat"
    />
    <Chart
      class="chart"
      chartName="Weight"
      :chartData="weightDateObject"
      :chartColor="['#FF0000']"
      :recentData="recentWeight"
    />
    <Chart
      class="chart"
      chartName="Muscle Mass"
      :chartData="muscleDateObject"
      :chartColor="['#FF0000']"
      :recentData="recentMuscle"
    />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");

.chart-container {
  display: flex;
  justify-content: space-between;
  margin: auto;
  text-transform: uppercase;
  font-family: "Teko", sans-serif;
  font-weight: bolder;
  overflow-x: auto;
  width: 90%;
  margin-bottom: 20px;
  height: 460px;
}

.chart-container:not(:hover) {
  overflow-x: hidden;
}

.chart {
  width: 800px;
  min-width: 380px;
  height: 380px;
  margin: 30px 20px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
}
</style>
