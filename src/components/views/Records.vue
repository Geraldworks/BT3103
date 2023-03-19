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
import ComponentHeader from "./ComponentHeader.vue";
export default {
  name: "Records",
  data() {
    return {
      blackHeader: "Personal",
      redHeader: "Records",
      deadliftData: 50,
      benchPressData: 50,
      squatData: 50,
    };
  },
  components: {
    ComponentHeader,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");

.records-section-container {
  /* display: inline-block; */
  display: flex;
  flex-direction: column;
  height: 34.5vh;
  width: 33%;
  box-sizing: border-box;
}
table {
  width: 90%;
  margin: 0 auto;
  padding: 5px;
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