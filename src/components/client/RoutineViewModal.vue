<template>
  <transition name="modal-fade">
    <div
      class="modal-overlay"
      @click="checkIfSaved(), $emit('close-modal'), closeAddActivity()"
    >
      <div class="modal" @click.stop>
        <div class="modal-header">
          <!-- action is "Creating" for Creating, "Viewing" for Viewing -->
          <span class="view-text">{{ action }}</span>
          <span class="routine-text">Routine</span>
        </div>

        <div class="content-area" id="scrollable-content-area">
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
                  @change="updateChangeBool"
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
                  @change="updateChangeBool"
                  v-model="routineDate"
                />
              </form>
            </div>
            <div class="top-right">
              <!-- showUpdate is false for Creating, true for Viewing -->
              <div class="top-right-top" v-show="showUpdate">
                <i
                  >Last Update -- {{ lastUpdatedName }} <br />
                  [{{ lastUpdatedTimestamp }}]</i
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
              @edit-activity="prepEditActivity"
              @delete-activity="confirmPrepDeleteActivity"
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
              @edit-activity="prepEditActivity"
              @delete-activity="confirmPrepDeleteActivity"
            />
          </div>
          <!-- WORKOUT COMMENTS SECTION -->
          <div
            class="workout-comments"
            v-if="activityArr.length > 0 || newActivitiesArr.length > 0"
          >
            <div style="margin-left: 0.5em;">Workout Comments</div>
            <div v-html="formattedRoutineStrings" id="comments"></div>
            <div>
              <label for="rComments" style="margin-left: 0.5em;">Add Comment</label> <br />
              <textarea
                name="rComments"
                id="rComments"
                placeholder="Share your comments here"
                @change="updateRoutineCommentsBool"
                v-model="routineNewComments"
              ></textarea>
             <div style="text-align: right;">
              <button>Add Comment</button>
             </div> 
            </div>
          </div>
        </div>
        
        <div style="text-align: center;">
          <!-- SAVE BUTTON -->
          <div class="save-button" style="margin: 0.5em 0em;">
            <button @click="confirmSaveRoutineToFS()">Save</button>
          </div>
          <!-- DELETE ROUTINE BUTTON -->
          <div class="delete-button">
            <button @click="confirmDelRoutineFromFS()" v-show="showUpdate">
              Delete Routine
            </button>
          </div>
        </div>
        
      </div>
      <!-- Close Modal Button -->
      <div
        class="close"
        @click="checkIfSaved(), $emit('close-modal'), closeAddActivity()"
      >
        <img class="close-img" src="@/assets/images/cross-icon.png" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
import RoutineActivity from "./RoutineActivity.vue";
import Swal from "sweetalert2";
import { db, auth } from "../../firebase.js";
import * as firebase from "firebase/app";
import {
  doc,
  updateDoc,
  getDoc,
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { mapGetters } from "vuex";

export default {
  name: "RoutineViewModal",
  data() {
    return {
      /* Unique Identifier for Routines & Activites -- Change ONLY when add */
      routineNextId: 0,
      activityNextId: 0,
      /* Permanent creator */
      creatorName: "",
      routineId: 0, // For Creation of Routine Activity uniqueId
      /* Update Status */
      updateBool: false,
      /* Data Validation */
      hasFieldChanged: false,
      hasRoutineCommentsChanged: false,
      hasDeletedActivity: false,
      isEditingActivity: false,
      isSaved: false,
      /* Top Part of Modal */
      routineName: "",
      routineDate: "",
      lastUpdatedName: "",
      lastUpdatedTimestamp: "",
      /* Activity - General */
      activityArr: [], // Pass each object in this for each RoutineActivity
      addActivity: false,
      backupActivityArr: [], // Use this to reset activityArr if required
      newActivitiesArr: [], // All activity objs from "Add Activity" go here
      editActivitiesStorage: {}, // Store the currently edited activity
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
      /* Routine Comments */
      routineComments: [], // Array of String
      routineNewComments: "", // String of input
    };
  },
  methods: {
    async fetchFireBaseData() {
      let routineNextAvailId;
      let clientName;

      const clientRef = collection(db, "client");
      const thisClientQuery = query(
        clientRef,
        where("email", "==", this.email)
      );
      const clientQuerySnapshot = await getDocs(thisClientQuery);

      clientQuerySnapshot.forEach((doc) => {
        routineNextAvailId = doc.data().routineNextId;
      });

      this.routineNextId = routineNextAvailId;
      console.log("FROM FIREBASE: routineNextId IS", this.routineNextId);
    },
    showAddActivity() {
      this.addActivity = true;
    },
    closeAddActivity() {
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
      // Toggle addActivity section
      this.addActivity = false;
    },
    async checkIfSaved() {
      if (!this.isSaved) {
        // reset the stuff in modal
        this.activityArr = this.backupActivityArr;
        this.newActivitiesArr = [];
        this.hasDeletedActivity = false;
        this.hasRoutineCommentsChanged = false;
        this.routineNewComments = "";

        // also toggle the updateValue if previously updated
        if (this.updateBool) {
          console.log("===Setting update bool to false===");
          // navigate to the correct document & access routines
          const clientRef = doc(db, "client", this.email);
          const clientSnap = await getDoc(clientRef);
          let routinesFromFirebase = [];
          routinesFromFirebase = clientSnap.data().routines;

          // Create a new Routine based off current Modal
          let newRoutine = {};
          newRoutine["routineId"] = this.routineId;
          newRoutine["creatorName"] = this.creatorName;
          newRoutine["routineName"] = this.routineName;
          newRoutine["routineDate"] = this.convertToFirestoreTimestamp(
            this.routineDate
          );
          newRoutine["exerciseTypes"] = this.constructExerciseString();
          newRoutine["updatedBool"] = false; // toggle this
          newRoutine["lastUpdatedName"] = this.lastUpdatedName;
          newRoutine["lastUpdatedTimestamp"] = this.convertToFirestoreTimestamp(
            this.lastUpdatedTimestamp
          );
          newRoutine["activityNextId"] = this.activityNextId;
          newRoutine["activities"] = this.activityArr;
          newRoutine["routineComments"] = this.routineComments;

          // Delete Existing (old) version of current routine in FS (if applicable)
          let newRoutinesToFirebase = [];

          routinesFromFirebase.forEach((routine) => {
            // Skip the current routine
            if (this.routineId != routine.routineId) {
              newRoutinesToFirebase.push(routine);
            }
          });
          newRoutinesToFirebase.push(newRoutine);

          // Update new Array of Routines to FireStore
          await updateDoc(clientRef, {
            routines: newRoutinesToFirebase,
          });

          this.$emit("reload-routines");
        }
      }
    },
    prepEditActivity(activityInfo) {
      console.log("Editing...");
      console.log(activityInfo);

      // Give existing values
      this.activityType = activityInfo.activityType || "";
      this.activityName = activityInfo.activityName || "";
      this.activityDescription = activityInfo.activityDescription || "";
      this.numSets = activityInfo.numSets || "";

      if (activityInfo.setInfo && activityInfo.setInfo.length > 0) {
        this.weight1 =
          activityInfo.setInfo[0].weight !== undefined
            ? activityInfo.setInfo[0].weight
            : "";
        this.reps1 =
          activityInfo.setInfo[0].reps !== undefined
            ? activityInfo.setInfo[0].reps
            : "";
        this.done1 =
          activityInfo.setInfo[0].done !== undefined
            ? activityInfo.setInfo[0].done
            : "";

        if (activityInfo.numSets > 1) {
          this.weight2 =
            activityInfo.setInfo[1].weight !== undefined
              ? activityInfo.setInfo[1].weight
              : "";
          this.reps2 =
            activityInfo.setInfo[1].reps !== undefined
              ? activityInfo.setInfo[1].reps
              : "";
          this.done2 =
            activityInfo.setInfo[1].done !== undefined
              ? activityInfo.setInfo[1].done
              : "";
        }

        if (activityInfo.numSets > 2) {
          this.weight3 =
            activityInfo.setInfo[2].weight !== undefined
              ? activityInfo.setInfo[2].weight
              : "";
          this.reps3 =
            activityInfo.setInfo[2].reps !== undefined
              ? activityInfo.setInfo[2].reps
              : "";
          this.done3 =
            activityInfo.setInfo[2].done !== undefined
              ? activityInfo.setInfo[2].done
              : "";
        }
      }

      // Store the currently edited activity
      this.editActivitiesStorage = activityInfo;
      // Open Add Activity Part
      this.showAddActivity();
      // Scroll to top of window
      document.getElementById("scrollable-content-area").scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Signify we are editing an activity
      this.isEditingActivity = true;
    },
    confirmPrepDeleteActivity(activityId) {
      Swal.fire({
        title: "Are you sure?",
        text: "Your activity will be deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#ed1f24",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.prepDeleteActivity(activityId);
          Swal.fire("Deleted!", "Your activity has been deleted.", "success");
        }
      });
    },
    prepDeleteActivity(activityId) {
      console.log("Deleting...");
      // Keep the activityId to be deleted
      let delActivityId = parseInt(activityId);
      console.log(activityId);

      // Remove from activityArr (if it is there)
      const filteredActivityArr = this.activityArr.filter(
        (obj) => obj.activityId != delActivityId
      );
      // Remove from newActivitiesArr (if it is there)
      const filteredNewActivitiesArr = this.newActivitiesArr.filter(
        (obj) => obj.activityId != delActivityId
      );

      // Reassign arrays to the new ones
      this.activityArr = filteredActivityArr;
      this.newActivitiesArr = filteredNewActivitiesArr;

      // Set status of deletion
      this.hasDeletedActivity = true;
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
    // Tracks if changes are made for routineName & routineDate
    updateChangeBool() {
      console.log("Detected Change in Fields");
      this.hasFieldChanged = true;
    },
    // Tracks if changes are made for routineComments
    updateRoutineCommentsBool() {
      console.log("Detected Change in Routine Comments");
      this.hasRoutineCommentsChanged = true;
    },
    addActivityValidator() {
      console.log("Checking");
      // Check activityType, activityName, activityDescription, and numSets
      if (
        this.activityType === "" ||
        this.activityName === "" ||
        this.activityDescription === "" ||
        this.numSets === ""
      ) {
        return false;
      }

      // Check weight and reps based on numSets
      if (this.numSets >= 1) {
        if (
          this.weight1 === "" ||
          this.reps1 === "" ||
          this.weight1 < 0 ||
          this.reps1 < 0
        ) {
          return false;
        }
      }

      if (this.numSets >= 2) {
        if (
          this.weight2 === "" ||
          this.reps2 === "" ||
          this.weight2 < 0 ||
          this.reps2 < 0
        ) {
          return false;
        }
      }

      if (this.numSets >= 3) {
        if (
          this.weight3 === "" ||
          this.reps3 === "" ||
          this.weight3 < 0 ||
          this.reps3 < 0
        ) {
          return false;
        }
      }

      return true;
    },
    // "Add" Button (Red Section)
    // CASE 1: NEW activities (freshly created) <==> Add Activity Button
    // 1) Add to newActivitiesArr
    //
    // CASE 2: UPDATED activities (modified) <==> Edit Icon/Button
    // 1) Add old version to delActivitiesArr
    // 2) Add new version to newActivitiesArr
    // 3) Del from activityArr
    //
    // CASE 3: DELETED activities <==> Delete Icon/Button
    // 1) Add to delActivitiesArr
    // 2) Del from activityArr
    confirmAddActivity() {
      if (this.addActivityValidator()) {
        console.log("values are acceptable");

        if (this.isEditingActivity) {
          // If editing activity, remove old from `activityArr` (since updated is now in `newActivitiesArr`)
          let updatedActivityArr = this.activityArr.filter(
            (activity) =>
              activity.activityId != this.editActivitiesStorage.activityId
          );
          this.activityArr = updatedActivityArr;

          // The activity could also be in `newActivitiesArr` (filter for it too)
          let updatedNewActivitiesArr = this.newActivitiesArr.filter(
            (activity) =>
              activity.activityId != this.editActivitiesStorage.activityId
          );
          this.newActivitiesArr = updatedNewActivitiesArr;

          // reset values
          this.editActivitiesStorage = {};
          this.isEditingActivity = false;
        }

        let newActivityObj = {};
        // Assign & update the activityNextId
        newActivityObj["activityId"] = this.activityNextId;
        this.activityNextId += 1;
        newActivityObj["uniqueId"] =
          this.routineId + "-" + newActivityObj["activityId"];
        newActivityObj["activityType"] = this.activityType;
        newActivityObj["activityName"] = this.activityName;
        newActivityObj["activityDescription"] = this.activityDescription;
        newActivityObj["numSets"] = parseInt(this.numSets);

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

        // close the add activity portion --> Also resets section values
        this.closeAddActivity();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incomplete Fields Detected!",
        });
      }
    },
    getCurrentDateTime() {
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let seconds = currentDate.getSeconds();
      let ampm = hours >= 12 ? "PM" : "AM";

      // Adjust hours to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12;

      // Pad single-digit day, month, hour, minute, and second values with leading zeroes
      day = day < 10 ? "0" + day : day;
      month = month < 10 ? "0" + month : month;
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // Combine the formatted date and time values into a string
      let formattedDateTime = `${month}/${day}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;

      // Return the formatted date and time string
      return formattedDateTime;
    },
    convertToFirestoreTimestamp(dateString) {
      const dateParts = dateString.split(",");
      const dateStr = dateParts[0].trim();
      const timeStr = dateParts[1] ? dateParts[1].trim() : "00:00:00 am";
      const dateTimeStr = `${dateStr} ${timeStr}`;
      const timestamp = Timestamp.fromDate(new Date(dateTimeStr));
      return timestamp;
    },
    // Constructs the String for exerciseTypes
    constructExerciseString() {
      let typeArr = [];

      // Go through all activities & extract type
      this.activityArr.forEach((activity) => {
        typeArr.push(activity.activityType);
      });
      this.newActivitiesArr.forEach((activity) => {
        typeArr.push(activity.activityType);
      });

      // Output string without duplicate, sorted
      const output = [...new Set(typeArr)].sort().join(", ");
      return output;
    },
    // Constructs an object containing all Activities
    compileActivites() {
      let newArr = this.activityArr.concat(this.newActivitiesArr);
      return newArr;
    },
    saveRoutineValidator() {
      // Check if changes are made to routineName / routineDate
      if (this.hasFieldChanged || this.hasDeletedActivity) {
        // Check if fields are empty or no activities at all
        // Check if activity has been deleted
        if (this.routineName === "" || this.routineDate === "") {
          console.log("FAIL 1");
          return false;
        }
        if (this.newActivitiesArr.length == 0 && this.activityArr.length == 0) {
          console.log("FAIL 2");
          return false;
        }
        return true;
      } else if (this.hasRoutineCommentsChanged) {
        // If routineNewComments has changed ==> Check Not null
        // Check if fields are empty or no activities at all
        if (
          this.routineName === "" ||
          this.routineDate === "" ||
          this.routineNewComments === ""
        ) {
          console.log("FAIL 3");
          return false;
        }
        if (this.newActivitiesArr.length == 0 && this.activityArr.length == 0) {
          console.log("FAIL 4");
          return false;
        }
        return true;
      } else {
        // No changes were made to fields
        // Check routineName and routineDate
        if (this.routineName === "" || this.routineDate === "") {
          console.log("FAIL 5");
          return false;
        }
        // Check newActivitiesArr
        if (
          this.newActivitiesArr == null ||
          this.newActivitiesArr.length == 0
        ) {
          console.log("FAIL 6");
          return false;
        }
        return true;
      }
    },
    // Creates a new Comment Array based on
    createNewCommentsArray() {
      if (
        this.routineNewComments === "" ||
        this.routineNewComments == undefined
      ) {
        return this.routineComments;
      }
      let newComment = `${this.userFullName}: ${this.routineNewComments}`;
      let newCommentsArr = [...this.routineComments];
      newCommentsArr.push(newComment);
      return newCommentsArr;
    },
    confirmSaveRoutineToFS() {
      if (this.saveRoutineValidator()) {
        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to save this routine?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#28a745",
          cancelButtonColor: "#ed1f24",
          confirmButtonText: "Yes, save it!",
        }).then((result) => {
          if (result.isConfirmed) {
            this.saveRoutineToFS();
            Swal.fire("Saved!", "Your routine has been saved.", "success");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incomplete Fields Detected!",
        });
      }
    },
    // On click to "Save" at bottom of Modal
    async saveRoutineToFS() {
      // set status to save
      this.isSaved = true;

      // navigate to the correct document & access routines
      const clientRef = doc(db, "client", this.email);
      const clientSnap = await getDoc(clientRef);
      let routinesFromFirebase = [];
      routinesFromFirebase = clientSnap.data().routines;
      console.log(routinesFromFirebase);

      // Create a new Routine based off current Modal
      let newRoutine = {};
      newRoutine["routineId"] = this.routineNextId;
      this.routineNextId += 1; // Increment
      console.log("Incremented RoutineNextId:", this.routineNextId);

      newRoutine["creatorName"] = this.creatorName;
      newRoutine["routineName"] = this.routineName;
      newRoutine["routineDate"] = this.convertToFirestoreTimestamp(
        this.routineDate
      );
      newRoutine["exerciseTypes"] = this.constructExerciseString();
      newRoutine["updatedBool"] = true;
      newRoutine["lastUpdatedName"] = this.userFullName; // WHAT IF TRAINER???
      newRoutine["lastUpdatedTimestamp"] = this.convertToFirestoreTimestamp(
        this.getCurrentDateTime()
      );
      newRoutine["activityNextId"] = this.activityNextId;
      newRoutine["activities"] = this.compileActivites();
      newRoutine["routineComments"] = this.createNewCommentsArray();

      // Delete Existing (old) version of current routine in FS (if applicable)
      let newRoutinesToFirebase = [];

      routinesFromFirebase.forEach((routine) => {
        // Skip the current routine
        if (this.routineId != routine.routineId) {
          newRoutinesToFirebase.push(routine);
        }
      });
      newRoutinesToFirebase.push(newRoutine);

      console.log(newRoutinesToFirebase);

      // Update new Array of Routines & routineNextId to FireStore
      await updateDoc(clientRef, {
        routineNextId: this.routineNextId,
        routines: newRoutinesToFirebase,
      });

      console.log("New RoutineNextId:", this.routineNextId);

      // reset data
      this.newActivitiesArr = [];

      // Emit & Close the modal
      this.$emit("close-modal");
      this.$emit("reload-routines");
    },
    confirmDelRoutineFromFS() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to restore this routine!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#ed1f24",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.delRoutineFromFS();
          Swal.fire("Deleted!", "Your routine has been deleted.", "success");
        }
      });
    },
    async delRoutineFromFS() {
      // navigate to the correct document & access routines
      const clientRef = doc(db, "client", this.email);
      const clientSnap = await getDoc(clientRef);
      let routinesFromFirebase = [];
      routinesFromFirebase = clientSnap.data().routines;

      let newRoutinesToFirebase = [];

      // Go through each routine in firebase
      routinesFromFirebase.forEach((routine) => {
        // Skip the current routine
        if (this.routineId != routine.routineId) {
          newRoutinesToFirebase.push(routine);
        }
      });

      // Update new Array of Routines to FireStore
      await updateDoc(clientRef, {
        routines: newRoutinesToFirebase,
      });

      // Emit & Close the modal
      this.$emit("close-modal");
      this.$emit("reload-routines");
    },
    routineCommentsStringFormatter(arr) {
      return arr.join("<br>");
    },
  },
  watch: {
    email(newEmail) {
      // console.log("watch:", newEmail);
      this.fetchFireBaseData();
    },
    userFullName(newFullName) {
      // console.log("watch:", newFullName);
    },
    routineInfo() {
      console.log("Change in routine info");
      console.log(this.routineInfo);

      //Reset Fields for each RoutineInfo Change
      this.hasFieldChanged = false;
      this.newActivitiesArr = [];
      this.isSaved = false;
      this.hasRoutineCommentsChanged = false;
      this.routineNewComments = "";

      if (this.action == "Viewing") {
        console.log("Viewing");
        this.updateBool = this.routineInfo.updateBool;
        console.log(this.updateBool);
        this.creatorName = this.routineInfo.routineCreator;
        this.routineNextId = this.routineInfo.routineNextId;
        this.routineId = this.routineInfo.routineId;
        this.routineName = this.routineInfo.routineName;
        // format the date accordingly for html datepicker
        this.routineDate = this.formatDateForDatePicker(
          this.routineInfo.routineDate
        );
        this.lastUpdatedName = this.routineInfo.lastUpdatedName;
        this.lastUpdatedTimestamp = this.routineInfo.lastUpdatedTimestamp;
        this.routineComments = this.routineInfo.routineComments; // Array of Strings

        // Container to store activities (formatted for RoutineActivity)
        let activityInfo = [];
        // Create object to parse into RoutineActivity
        if (this.routineInfo.activities !== undefined) {
          this.routineInfo.activities.forEach((activity) => {
            activityInfo.push({
              uniqueId: this.routineInfo.routineId + "-" + activity.activityId,
              activityId: activity.activityId,
              activityType: activity.activityType,
              activityName: activity.activityName,
              activityDescription: activity.activityDescription,
              numSets: parseInt(activity.numSets),
              setInfo: activity.setInfo,
            });
          });
          this.activityArr = activityInfo;
          this.backupActivityArr = activityInfo;
          this.activityNextId = this.routineInfo.activityNextId;
          // console.log(this.activityArr);
        }
      } else {
        // Creating
        console.log("Creating");
        this.creatorName = this.userFullName;
        // No Data
        this.routineId = 0;
        this.routineName = "";
        this.routineDate = "";
        this.lastUpdatedName = "";
        this.lastUpdatedTimestamp = "";
        this.activityArr = [];
        this.backupActivityArr = [];
        this.activityNextId = 1;
        this.routineComments = [];
      }
    },
  },
  computed: {
    ...mapGetters(["user"]),
    formattedRoutineStrings() {
      if (this.routineComments === "" || this.routineComments == []) {
        return "No Comments Currently";
      }
      return this.routineCommentsStringFormatter(this.routineComments);
    },
  },
  mounted() {
    this.fetchFireBaseData();
    auth.onAuthStateChanged((user) => {
      this.$store.dispatch("fetchUser", user);
    });
  },
  updated() {
    this.hasFieldChanged = false;
    this.newActivitiesArr = [];
    this.isSaved = false;
  },
  components: {
    RoutineActivity,
  },
  props: {
    email: String,
    userFullName: String,
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

#comments {
  border: black 2px solid;
  border-radius: 25px;
  padding: 0.4em;
  margin-bottom: 1em;
  overflow: auto;
  max-height: 5em;
}

.add-activity {
  border-style: solid;
  border-radius: 25px;
  border-color: #ed1f24;
  border-width: 0.1em;
  margin-top: 1em;
  padding: 0.4em;
}

.activity-left input, select {
  width: 30%;
}

.activity-set input {
  width: 20%;
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

input[type="checkbox"] {
  height: 0.5em;
  padding: 0;
  margin: 0;
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
