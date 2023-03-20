<template>
  <div class="records-section-container">
    <ComponentHeader :blackHeader="blackHeader" :redHeader="redHeader" />
    <table class="record-info">
      <tbody>
        <tr>
          <td>Deadlift</td>
          <td>{{ deadliftData }} kg</td>
        </tr>
        <tr>
          <td>Bench Press</td>
          <td>{{ benchPressData }} kg</td>
        </tr>
        <tr>
          <td>Squat</td>
          <td>{{ squatData }} kg</td>
        </tr>
      </tbody>
    </table>

    <!-- <h3 class="prTitle">Deadlift: {{ deadliftData }}kg</h3>
    <h3 class="prTitle">Bench Press: {{ benchPressData }}kg</h3>
    <h3 class="prTitle">Squat: {{ squatData }}kg</h3> -->
  </div>
</template>

<script>
import { db, auth } from "../../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useStore, mapGetters } from "vuex";

import ComponentHeader from "./ComponentHeader.vue";
export default {
  name: "Records",
  data() {
    return {
      blackHeader: "Personal",
      redHeader: "Records",
      deadliftData: null,
      benchPressData: null,
      squatData: null,
    };
  },
  components: {
    ComponentHeader,
  },
  props: {
    email: String,
  },
  computed: {
    ...mapGetters(["user"]),
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

        // retrieve personal records
        let deadliftRecord = documentData.records["deadlift"];
        let benchPressRecord = documentData.records["benchPress"];
        let squatRecord = documentData.records["squat"];

        // Assign the values to data()
        this.deadliftData = deadliftRecord;
        this.benchPressData = benchPressRecord;
        this.squatData = squatRecord;
      });
    } catch (error) {
      console.log(error);
      console.log("No email observed in database");
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");

.records-section-container {
  /* display: inline-block; */
  display: flex;
  flex-direction: column;
  /* height: 34.5vh; */
  width: 100%;
  box-sizing: border-box;
}
table {
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 20px;
}
tr {
  border: 1px solid white;
}
td {
  padding: 5px;
  color: white;
  font-family: "Teko", sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
}
</style>