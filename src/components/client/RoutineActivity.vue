<template>
  <div class="activity">
    <table style="width: 90%">
      <tr>
        <th style="width: 20%">{{ muscleGroup }}</th>
        <th style="width: 48%">Description</th>
        <th style="width: 8%">Set</th>
        <th style="width: 8%">Kg</th>
        <th style="width: 8%">Reps</th>
        <th style="width: 8%">Done?</th>
      </tr>
      <tr>
        <td rowspan="0">Chest</td>
        <td rowspan="0">Description of chest activity</td>
        <td>1</td>
        <td>16</td>
        <td>12</td>
        <td><input type="checkbox" /></td>
      </tr>
    </table>
    <!-- Include Edit Icon (On Hover show) -->
    <!-- Include Delete Icon (On Hover show) -->
  </div>
</template>

<script>
export default {
  name: "RoutineActivity",
  data() {
    return {};
  },
  props: {
    muscleGroup: String,
  },
};
</script>

<style scoped>
.activity {
  border: solid gray;
  border-radius: 25px;
  border-width: 0.1em;
  padding: 0.4em;
  margin-bottom: 1em;
}
</style>