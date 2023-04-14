<script>
import Chart from "./Chart.vue";
import { db, auth } from "../../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useStore, mapGetters } from "vuex";

export default {
  // creates a component, "AllCharts", that holds 3 child Chart components and displays three different charts on the performance page
  name: "AllCharts",
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
    // takes in an email prop to know which client charts to display
    email: String,
  },
  methods: {
    // create the object to be passed down to chartkick
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
  // retrieve user information from firestore 
  async created() {
    try {
      // query matching to find the correct user
      const clientRef = collection(db, "client");
      const q = query(clientRef, where("email", "==", this.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // retrieve client data from firestore
        let documentData = doc.data();

        // storing the array information (only getting last 5 data)
        let fatPercentageData = documentData.fatPercentage.slice(-5);
        let weightData = documentData.weight.slice(-5);
        let muscleMassData = documentData.muscleMass.slice(-5);
        let dates = documentData.datetime.slice(-5).map((dt) => dt.toDate());

        // assigning the most recent health data
        this.recentFat = fatPercentageData[fatPercentageData.length - 1];
        this.recentWeight = weightData[weightData.length - 1];
        this.recentMuscle = muscleMassData[muscleMassData.length - 1];

        // making the health data objects
        this.fatDateObject = this.makeObject(dates, fatPercentageData);
        this.weightDateObject = this.makeObject(dates, weightData);
        this.muscleDateObject = this.makeObject(dates, muscleMassData);
      });
    } catch (error) {
      // error catching for debugging purposes
      console.log(error);
      console.log("No email observed in database");
    }
  },
};
</script>

<template>
  <div class="chart-container">
    <!-- Create a Fat Percentage chart -->
    <Chart
      class="chart"
      chartName="Fat Percentage"
      :chartData="fatDateObject"
      :chartColor="['#FF0000']"
      :recentData="recentFat"
      metric="%"
    />
    <!-- Create a Weight chart -->
    <Chart
      class="chart"
      chartName="Weight"
      :chartData="weightDateObject"
      :chartColor="['#FF0000']"
      :recentData="recentWeight"
      metric="KG"
    />
    <!-- Create a Muscle Mass chart -->
    <Chart
      class="chart"
      chartName="Muscle Mass"
      :chartData="muscleDateObject"
      :chartColor="['#FF0000']"
      :recentData="recentMuscle"
      metric="%"
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
  margin-bottom: 10px;
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
