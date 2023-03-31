<template>
  <transition name="modal-fade">
    <div
      class="modal-overlay"
      @click="$emit('close-modal'), closeAddActivity()"
    >
      <div class="modal" @click.stop>
        <div class="modal-header">
          <!-- action is "Creating" for Creating, "Viewing" for Viewing -->
          <span class="view-text">{{ modalAction }}</span>
          <span class="routine-text">Routine</span>
        </div>

        <div class="content-area">
          <!-- TOP SECTION -->
          <div class="top-part">
            <div class="top-left">
              <form action="" class="routine-info">
                <label for="rname">Routine Name</label>
                <input
                  type="text"
                  id="rname"
                  name="rname"
                  placeholder="Give a Name"
                  required
                  v-model="routineName"
                />
                <br />
                <label for="rdate">Routine Date</label>
                <input
                  type="date"
                  id="rdate"
                  name="rdate"
                  placeholder="DD/MM/YYYY"
                  required
                  v-model="routineDate"
                />
              </form>
            </div>
            <div class="top-right">
              <!-- showUpdate is false for Creating, true for Viewing -->
              <div class="top-right-top" v-show="showUpdate">
                <i
                  >Last Updated By {{ lastUpdatedName }} at
                  {{ lastUpdatedTimestamp }}</i
                >
              </div>
              <div class="top-right-btm">
                <button @click="showAddActivity()">Add Activity</button>
              </div>
            </div>
          </div>
          <!-- ADD (EDIT) ACTIVITY (Red color box) SECTION -->
          <div class="add-activity" v-show="addActivity">
            <form action="" style="display: flex">
              <div class="activity-left">
                <label for="muscles">ACTIVITY TYPE</label>
                <select name="muscles" id="muscles" v-model="activityType">
                  <option value="Chest">Chest</option>
                  <option value="Arms">Arms</option>
                  <option value="Shoulders">Shoulders</option>
                  <option value="Back">Back</option>
                  <option value="Abs">Abs</option>
                  <option value="Legs">Legs</option>
                  <option value="Cardio">Cardio</option>
                </select>
                <br />
                <label for="aName">ACTIVITY NAME</label>
                <input
                  type="text"
                  name="aName"
                  id="aName"
                  v-model="activityName"
                />
                <br />
                <!-- <label for="aSetNum">SETS</label>
                <input
                  type="number"
                  name="aSetNum"
                  id="aSetNum"
                  v-model="numSets"
                /> -->
                <label for="aSetNum">SETS</label>
                <select name="aSetNum" id="aSetNum" v-model="numSets">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <br />
                <div class="activity-set">
                  <div>
                    <label for="">SET 1 DETAILS</label>
                    <input
                      type="number"
                      name="weight-1"
                      id="weight-1"
                      v-model="weight1"
                    />KG
                    <input
                      type="number"
                      name="reps-1"
                      id="reps-1"
                      v-model="reps1"
                    />REPS
                    <label
                      ><input
                        type="checkbox"
                        id="done-1"
                        v-model="done1"
                      />Done?</label
                    >
                  </div>
                  <br />
                  <div v-if="numSets >= 2">
                    <label for="">SET 2 DETAILS</label>
                    <input
                      type="number"
                      name="weight-2"
                      id="weight-2"
                      v-model="weight2"
                    />KG
                    <input
                      type="number"
                      name="reps-2"
                      id="reps-2"
                      v-model="reps2"
                    />REPS
                    <label
                      ><input
                        type="checkbox"
                        id="done-2"
                        v-model="done2"
                      />Done?</label
                    >
                  </div>
                  <br />
                  <div v-if="numSets == 3">
                    <label for="">SET 3 DETAILS</label>
                    <input
                      type="number"
                      name="weight-3"
                      id="weight-3"
                      v-model="weight3"
                    />KG
                    <input
                      type="number"
                      name="reps-3"
                      id="reps-3"
                      v-model="reps3"
                    />REPS
                    <label
                      ><input
                        type="checkbox"
                        id="done-3"
                        v-model="done3"
                      />Done?</label
                    >
                  </div>
                </div>
              </div>
              <div class="activity-right">
                <label for="aDescription">DESCRIPTION</label> <br />
                <textarea
                  name="aDescription"
                  id="aDescription"
                  cols="30"
                  rows="10"
                  v-model="activityDescription"
                ></textarea>
              </div>
            </form>
            <div style="text-align: right">
              <button
                @click="closeAddActivity()"
                style="
                  background-color: white;
                  color: #ed1f24;
                  border: #ed1f24 solid 2px;
                  margin-right: 1em;
                "
              >
                Cancel
              </button>
              <button @click="confirmAddActivity()">Add</button>
            </div>
          </div>

          <div class="routine-form"></div>
          <!-- LIST ACTIVITIES (Gray color box) SECTION -->
          <!-- Use v-for loop to show the list of RoutineActivity component -->
          <div class="routine-activities">
            <!-- Activities from FireStore -->
            <RoutineActivity
              v-for="activity in activityArr"
              :key="activity.uniqueId"
              :activityType="activity.activityType"
              :activityName="activity.activityName"
              :activityDescription="activity.activityDescription"
              :numSets="activity.numSets"
              :setInfo="activity.setInfo"
              :uniqueId="activity.uniqueId"
            />
            <!-- New Activities Created using Button -->
            <RoutineActivity
              v-for="activity in newActivitiesArr"
              :key="activity.uniqueId"
              :activityType="activity.activityType"
              :activityName="activity.activityName"
              :activityDescription="activity.activityDescription"
              :numSets="activity.numSets"
              :setInfo="activity.setInfo"
              :uniqueId="activity.uniqueId"
            />
          </div>
          <!-- WORKOUT COMMENTS SECTION -->
          <!-- Toggle the form using v-show -->
          <div class="workout-comments"></div>
        </div>
      </div>
      <!-- SAVE BUTTON (To be created) -->
      <div class="close" @click="$emit('close-modal'), closeAddActivity()">
        <img class="close-img" src="@/assets/images/cross-icon.png" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
import RoutineActivity from "./RoutineActivity.vue";
import { db, auth } from "../../firebase.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { mapGetters } from "vuex";

export default {
  name: "RoutineViewModal",
  data() {
    return {
      modalAction: "", // Title of Modal
      routineId: 0, // For Creation of Routine Activity uniqueId
      /* Top Part of Modal */
      routineName: "",
      routineDate: "",
      lastUpdatedName: "",
      lastUpdatedTimestamp: "",
      /* Activity - General */
      activityArr: [], // Pass each object in this for each RoutineActivity
      addActivity: false,
      newActivitiesArr: [], // All activity objs from "Add Activity" go here
      /* Add Activity Information */
      activityType: "",
      activityName: "",
      activityDescription: "",
      /* Set Info */
      numSets: "",
      weight1: "",
      weight2: "",
      weight3: "",
      reps1: "",
      reps2: "",
      reps3: "",
      done1: "",
      done2: "",
      done3: "",
    };
  },
  methods: {
    showAddActivity() {
      this.addActivity = true;
    },
    closeAddActivity() {
      this.addActivity = false;
    },
    formatDateForDatePicker(dateString) {
      if (dateString == null) {
        return;
      }
      var dateParts = dateString.split("/");
      var day = dateParts[0].padStart(2, "0");
      var month = dateParts[1].padStart(2, "0");
      var year = dateParts[2];
      return year + "-" + month + "-" + day;
    },
    confirmAddActivity() {
      let newActivityObj = {};
      newActivityObj["activityId"] =
        this.activityArr.length + this.newActivitiesArr.length + 1;
      newActivityObj["uniqueId"] =
        this.routineId + "-" + newActivityObj["activityId"];
      newActivityObj["activityType"] = this.activityType;
      newActivityObj["activityName"] = this.activityName;
      newActivityObj["activityDescription"] = this.activityDescription;
      newActivityObj["numSets"] = this.numSets;

      /* Fill up set */
      let setsArr = [];
      if (this.numSets >= 1) {
        setsArr.push({
          setNum: 1,
          weight: this.weight1,
          reps: this.reps1,
          done: this.done1 ? true : false,
        });
      }
      if (this.numSets >= 2) {
        setsArr.push({
          setNum: 2,
          weight: this.weight2,
          reps: this.reps2,
          done: this.done2 ? true : false,
        });
      }
      if (this.numSets == 3) {
        setsArr.push({
          setNum: 3,
          weight: this.weight3,
          reps: this.reps3,
          done: this.done3 ? true : false,
        });
      }
      newActivityObj["setInfo"] = setsArr;

      console.log(newActivityObj);
      // Assign the new activities to data property
      this.newActivitiesArr.push(newActivityObj);
      console.log(this.newActivities);

      // Reset values
      this.activityType = "";
      this.activityName = "";
      this.activityDescription = "";
      this.numSets = "";
      this.weight1 = "";
      this.weight2 = "";
      this.weight3 = "";
      this.reps1 = "";
      this.reps2 = "";
      this.reps3 = "";
      this.done1 = "";
      this.done2 = "";
      this.done3 = "";

      // close the add activity portion
      this.closeAddActivity();
    },
  },
  watch: {
    routineInfo() {
      console.log("Change in routine info");
      console.log(this.routineInfo);
      if (this.routineInfo !== undefined) {
        this.routineId = this.routineInfo.routineId;
        this.routineName = this.routineInfo.routineName;
        // format the date accordingly for html datepicker
        this.routineDate = this.formatDateForDatePicker(
          this.routineInfo.routineDate
        );
        this.lastUpdatedName = this.routineInfo.lastUpdatedName;
        this.lastUpdatedTimestamp = this.routineInfo.lastUpdatedTimestamp;

        // Container to store activities (formatted for RoutineActivity)
        let activityInfo = [];
        // Create object to parse into RoutineActivity
        if (this.routineInfo.activities !== undefined) {
          this.routineInfo.activities.forEach((activity) => {
            activityInfo.push({
              uniqueId: this.routineInfo.routineId + "-" + activity.activityId,
              activityType: activity.activityType,
              activityName: activity.activityName,
              activityDescription: activity.activityDescription,
              numSets: activity.numSets,
              setInfo: activity.setInfo,
            });
          });
          this.activityArr = activityInfo;
          console.log(this.activityArr);
        } else {
          this.activityArr = [];
        }
      }
    },
  },
  components: {
    RoutineActivity,
  },
  props: {
    action: String,
    showUpdate: Boolean,
    routineInfo: Object, // All information related to routines (from RoutinesPage)
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");
.modal-overlay {
  position: fixed;
  z-index: 500;
  top: -10px;
  bottom: -10px;
  left: -10px;
  right: -10px;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  position: relative;
  background-color: black;
  border: 2px solid #ed1f24;
  margin-top: 6%;
  border-radius: 25px;
  max-width: 75%;
  max-height: 80%;
  font-size: 28px;
  padding: 20px 50px;
}

/* Heading CSS */
.modal-header {
  color: white;
  border-bottom: 3px white solid;
  padding: 10px 10px 0 10px;
  font-size: 3rem;
  text-transform: uppercase;
  width: 100%;
  justify-content: normal;
}

.view-text {
  margin-right: 1vw;
}

.routine-text {
  color: #ed1f24;
}

/* Content Settings */
.content-area {
  background-color: #d9d9d9;
  border-radius: 25px;
  margin-top: 10px;
  padding: 15px 20px;
  overflow: auto;
}

/* Content Settings - Top Part */
.top-part {
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  border-bottom: 2px #ed1f24 solid;
}

.top-left {
  flex: 8;
}

.routine-info label {
  width: 5em;
  margin-left: 0em;
}

.routine-info input {
  border-radius: 25px;
  margin-bottom: 5px;
  padding: 0px 10px;
}

.top-right {
  flex: 4;
  display: flex;
  flex-direction: column;
}

.top-right-top {
  flex: 1;
  font-size: 1.5rem;
  color: #868686;
  margin-left: auto; /* Align to the most right */
}

.top-right-btm {
  flex: 1;
  margin-left: auto; /* Align to the most right */
}
/* Button CSS */
button {
  border-radius: 25px; /* half of height */
  background-color: #ed1f24;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 2px 10px;
  font-size: 1.5rem;
  text-align: center;
  box-sizing: border-box;
  color: white;
  min-width: 5em;
}

button:hover {
  animation-name: pill-button-highlight;
  animation-duration: 0.15s;
  animation-fill-mode: forwards;
  box-sizing: border-box;
}

@keyframes pill-button-highlight {
  from {
    border: 0px black solid;
  }
  to {
    border: 2px black solid;
  }
}

/* Routine Activities */
.routine-activities {
  margin-top: 10px;
}

.add-activity {
  border-style: solid;
  border-radius: 25px;
  border-color: #ed1f24;
  border-width: 0.1em;
  margin-top: 1em;
  padding: 0.4em;
}

.activity-left input,
select {
  width: 25%;
}

.activity-left label,
.routine label {
  display: inline-block;
  text-align: right;
  width: 5em;
}

.activity-right {
  width: 50%;
}

input,
select {
  border-radius: 25px;
  margin: 0.2em;
  margin-left: 0.5em;
  padding: 0em 0.5em;
  height: 1.5em;
}

textarea {
  border-width: 0.075em;
  border-radius: 25px;
  width: 100%;
  height: 8em;
  padding: 0.25em;
}

/* Close Modal CSS */
.close {
  margin: 6% 0 0 10px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

/* Other Modal Settings */
.modal::-webkit-scrollbar {
  display: none;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
