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
      <table class="setTable" :id="'setTable-' + uniqueId" style="width: 100%">
        <tr>
          <th style="width: 25%">Set</th>
          <th style="width: 25%">Kg</th>
          <th style="width: 25%">Reps</th>
          <th style="width: 25%">Done?</th>
        </tr>
      </table>
    </div>
    <div class="icons">
      <!-- Edit Icon -->
      <div class="edit">
        <img
          class="edit-img"
          src="@/assets/images/edit-icon.png"
          alt=""
          @click="reqEditActivity"
        />
      </div>
      <!-- Delete Icon -->
      <div class="delete">
        <img
          class="delete-img"
          src="@/assets/images/delete-icon.png"
          alt=""
          @click="reqDeleteActivity"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoutineActivity",
  data() {
    return {};
  },
  methods: {
    // Called on clicking Edit Icon
    reqEditActivity() {
      // Format correct Activity Info to be emitted
      let activityInfo = {
        uniqueId: this.uniqueId,
        // Get the activity ID from the unique ID
        activityId: this.uniqueId.split("-")[1],
        activityType: this.activityType,
        activityName: this.activityName,
        activityDescription: this.activityDescription,
        numSets: this.numSets,
        setInfo: this.setInfo,
      };
      this.$emit("edit-activity", activityInfo);
    },
    // Called on clicking Delete Icon
    reqDeleteActivity() {
      this.$emit("delete-activity", this.uniqueId.split("-")[1]);
    },
  },
  props: {
    uniqueId: String,
    activityType: String,
    activityName: String,
    activityDescription: String,
    numSets: Number,
    setInfo: Array,
  },
  mounted() {
    let index = 1;
    // access the table element & create row reference
    let table = document.getElementById("setTable-" + this.uniqueId);
    this.setInfo.forEach((set) => {
      let row = table.insertRow(index);
      // populate the cells
      row.insertCell(0).innerHTML = set.setNum;
      row.insertCell(1).innerHTML = set.weight;
      row.insertCell(2).innerHTML = set.reps;
      // Set tick if true, else cross
      row.insertCell(3).innerHTML = set.done ? "&#10003;" : "&#10005;";
      index++;
    });
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
  flex: 2;
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
  display: flex;
  flex-direction: row;
  margin-left: 10px;
}

.edit,
.delete {
  flex: 1;
  cursor: pointer;
}

.edit-img,
.delete-img {
  width: 15px;
}
</style>
