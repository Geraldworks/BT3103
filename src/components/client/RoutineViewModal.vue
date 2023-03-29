<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <!-- action is "Creating" for Creating, "Viewing" for Viewing -->
          <span class="view-text">{{ action }}</span>
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
                <i>Last Updated By {{ userName }} at {{ updateTime }}</i>
              </div>
              <div class="top-right-btm">
                <button>Add Activity</button>
              </div>
            </div>
          </div>
          <!-- ADD (EDIT) ACTIVITY (Red color box) SECTION -->
          <!-- Toggle the form using v-show -->
          <div class="routine-form"></div>
          <!-- LIST ACTIVITIES (Gray color box) SECTION -->
          <!-- Use v-for loop to show the list of RoutineActivity component -->
          <div class="routine-activities">
            <!-- Just put 1 for testing purpose -->
            <RoutineActivity :muscleGroup="activityType" />
          </div>
          <!-- WORKOUT COMMENTS SECTION -->
          <!-- Toggle the form using v-show -->
          <div class="workout-comments"></div>
        </div>
      </div>
      <!-- SAVE BUTTON (To be created) -->
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="@/assets/images/cross-icon.png" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
import RoutineActivity from "./RoutineActivity.vue";

export default {
  name: "RoutineViewModal",
  data() {
    return {
      action: "",
      routineName: "",
      routineDate: "",
      userName: "Sarah" /* Placeholder */,
      updateTime: "31-03-2023 16:00:00" /* Placeholder */,
      activityType: "Chest" /* Placeholder */,
    };
  },
  components: {
    RoutineActivity,
  },
  props: {
    action: String,
    showUpdate: Boolean,
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
  height: 90%;
  width: 90%;
  margin-top: 6%;
  border-radius: 20px;
  max-width: 85%;
  max-height: 80%;
  font-size: 28px;
  padding: 20px 50px;
  min-width: 550px;
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
  border-bottom: 2px red solid;
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
  background-color: rgb(237, 31, 36);
  border: none;
  outline: none;
  cursor: pointer;
  padding: 2px 10px;
  font-size: 1.5rem;
  text-align: center;
  box-sizing: border-box;
  color: white;
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
