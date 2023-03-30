<template>
  <div class="activity">
    <div class="activityDetails">
      <div class="type-area">
        <span class="header-text">{{ activityType }} Activity</span>
        <span class="body">{{ activityName }}</span>
      </div>
      <div class="desc-area">
        <span class="header-text">Description</span>
        <span class="body">{{ activityDescription }}</span>
      </div>
    </div>
    <div class="setDetails">
      <table class="setTable" style="width: 100%">
        <tr>
          <th style="width: 25%">Set</th>
          <th style="width: 25%">Kg</th>
          <th style="width: 25%">Reps</th>
          <th style="width: 25%">Done?</th>
        </tr>
        <tr>
          <td>1</td>
          <td>16</td>
          <td>12</td>
          <td><input type="checkbox" /></td>
        </tr>
      </table>
    </div>
    <div class="icons">
      <!-- Include Edit Icon (On Hover show) -->
      <!-- Include Delete Icon (On Hover show) -->
    </div>
  </div>
</template>

<script>
export default {
  name: "RoutineActivity",
  data() {
    return {};
  },
  props: {
    activityType: String,
    activityName: String,
    activityDescription: String,
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
  display: flex;
  flex-direction: row;
}

.activityDetails {
  flex: 12;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
}

.type-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.desc-area {
  flex: 3;
  display: flex;
  flex-direction: column;
}

.header-text {
  text-decoration: underline;
}

.setDetails {
  flex: 6;
}

.setTable {
  text-align: center;
}

.icons {
  flex: 1;
}
</style>