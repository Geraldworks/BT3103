<template>
  <div class="routine-content-area">
    <div class="interactive-top-area">
      <button
        @click="showRoutineCreateModal()"
        id="new-routine"
        class="pill-button"
      >
        Create New Routine
      </button>
      <!-- Include filter here if we decide to do it -->
    </div>

    <div class="routine-list">
      <!-- If no routines -->
      <div v-if="routineArr.length == 0" id="empty-routines">
        No routines currently... Create one now!
      </div>
      <div class="item-container-header" v-else>
        <div class="routinecreator-header">Routine Creator</div>
        <div class="routinename-header">Routine Name</div>
        <div class="exercisetypes-header">Routine Focus</div>
        <div class="routinedate-header">Routine Date</div>
        <div class="update-icon-header"></div>
      </div>
      <RoutineBlock
        v-for="routine in routineArr.sort(this.comparatorForRoutine)"
        :routineCreator="routine.routineCreator"
        :routineName="routine.routineName"
        :exerciseTypes="routine.exerciseTypes"
        :routineDate="routine.routineDate"
        :updateBool="routine.updateBool"
        :hiddenInfo="routine"
        @show-routine-view-modal="showRoutineViewModal"
      >
      </RoutineBlock>
    </div>
    <div class="viewModal">
      <RoutineViewModal
        :email="email"
        :userFullName="userFullName"
        :action="viewingAction"
        :showUpdate="showUpdateInViewing"
        :routineInfo="selectedRoutineInfo"
        v-show="routineViewModal"
        @close-modal="routineViewModal = false"
        @reload-routines="reloadPage"
      />
    </div>
  </div>
</template>

<script>
import { collection, getDocs, query, where } from "firebase/firestore";
import { mapGetters, useStore } from "vuex";
import { db, auth } from "../../firebase.js";

import RoutineViewModal from "../client/RoutineViewModal.vue";
import RoutineBlock from "../client/RoutineBlock.vue";

export default {
  name: "RoutineContent",
  data() {
    return {
      viewingAction: "",
      showUpdateInViewing: true,
      routineArr: [],
      selectedRoutineInfo: {},
      routineViewModal: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.fetchFireBaseData();
    const store = useStore();
    auth.onAuthStateChanged((user) => {
      store.dispatch("fetchUser", user);
    });
  },
  methods: {
    async fetchFireBaseData() {
      // console.log("====Fetching Firebase Data====");
      // Container to store routines from firebase (raw)
      let routinesFromFirebase = [];
      // Container to store routines (formatted for RoutineBlock)
      let routineList = [];
      // Declare Other variables from firebase
      let routineNextAvailId;

      // Retrieve client's document
      const clientRef = collection(db, "client");
      const thisClientQuery = query(
        clientRef,
        where("email", "==", this.email)
      );
      const clientQuerySnapshot = await getDocs(thisClientQuery);

      // Access routines field
      clientQuerySnapshot.forEach((doc) => {
        routinesFromFirebase = doc.data().routines;
        routineNextAvailId = doc.data().routineNextId;
        // access clientTrainer here if needed
      });

      // function to convert dates to nicer format
      function convertDateFormat(dateObj) {
        // Check whether the date object includes a time component
        if (
          dateObj.getHours() > 0 ||
          dateObj.getMinutes() > 0 ||
          dateObj.getSeconds() > 0
        ) {
          // Format with time component: "mm/dd/yyyy, hh:mm:ss am" -> "dd/mm/yyyy, hh:mm:ss am"
          const formatter = new Intl.DateTimeFormat("en-SG", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          });
          return formatter.format(dateObj);
        } else {
          // Format without time component: "mm/dd/yyyy" -> "dd/mm/yyyy"
          const formatter = new Intl.DateTimeFormat("en-SG", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          return formatter.format(dateObj);
        }
      }

      // After getting all routines, create object to parse into RoutineBlock
      routinesFromFirebase.forEach((routine) => {
        routineList.push({
          routineNextId: routineNextAvailId,
          routineId: routine.routineId,
          routineCreator: routine.creatorName,
          routineName: routine.routineName,
          exerciseTypes: routine.exerciseTypes,
          routineDate: convertDateFormat(routine.routineDate.toDate()),
          updateBool: routine.updatedBool,
          lastUpdatedName: routine.lastUpdatedName,
          lastUpdatedTimestamp: convertDateFormat(
            routine.lastUpdatedTimestamp.toDate()
          ),
          activityNextId: routine.activityNextId,
          activities: routine.activities,
          routineComments: routine.routineComments,
        });
      });
      this.routineArr = routineList;
    },
    showRoutineViewModal(hiddenRoutineInfo) {
      // console.log(hiddenRoutineInfo);
      this.selectedRoutineInfo = hiddenRoutineInfo;
      this.routineViewModal = true;
      this.viewingAction = "Viewing";
      this.showUpdateInViewing = true;
    },
    showRoutineCreateModal() {
      this.selectedRoutineInfo = {};
      this.routineViewModal = true;
      this.viewingAction = "Creating";
      this.showUpdateInViewing = false;
    },
    reloadPage() {
      // console.log("Reloading...");
      // this.$router.go(0);
      this.fetchFireBaseData();
    },
    comparatorForRoutine(routineOne, routineTwo) {
      const dateOne = new Date(
        `${routineOne.routineDate.split("/")[1]}/${
          routineOne.routineDate.split("/")[0]
        }/${routineOne.routineDate.split("/")[2]}`
      );
      const dateTwo = new Date(
        `${routineTwo.routineDate.split("/")[1]}/${
          routineTwo.routineDate.split("/")[0]
        }/${routineTwo.routineDate.split("/")[2]}`
      );
      return dateTwo - dateOne;
    },
  },
  props: {
    email: {
      type: String,
      required: true,
    },
    userFullName: String,
  },
  components: {
    RoutineViewModal,
    RoutineBlock,
  },
  watch: {
    email(newEmail) {
      // console.log("watch:", newEmail);
      this.fetchFireBaseData();
    },
    userFullName(newFullName) {
      // console.log("watch:", newFullName);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");

/* .routine-content-area {
  background-color: #d9d9d9;
  margin: 0vw 10vw;
  border-radius: 25px;
  padding: 30px 60px;
  margin-top: 22px;
  max-height: 59vh;
  overflow-y: auto;
} */

.pill-button:hover {
  animation-name: pill-button-highlight;
  animation-duration: 0.15s;
  animation-fill-mode: forwards;
  box-sizing: border-box;
}

@keyframes pill-button-highlight {
  from {
    border: 0px white solid;
  }
  to {
    border: 2px white solid;
  }
}
.pill-button {
  width: 200px;
  height: 50px;
  border-radius: 25px; /* half of height */
  background-color: rgb(237, 31, 36);
  border: none;
  outline: none;
  cursor: pointer;
  margin: 5px;
  font-size: 1.5rem;
  text-align: center;
  box-sizing: border-box;
  color: white;
}

.interactive-top-area {
  padding-bottom: 1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.item-container-header {
  display: flex;
  flex-direction: row;
  padding: 5px 20px 0px 20px;
  font-size: 28px;
  text-decoration: underline;
}

.routinecreator-header {
  flex: 2;
  margin-right: 5px;
}

.routinename-header {
  flex: 5;
  margin-right: 5px;
}

.exercisetypes-header {
  flex: 3.8;
  margin-right: 5px;
}

.routinedate-header {
  flex: 1.4;
  margin-right: 5px;
}

.update-icon-header {
  flex: 0.5;
}

#new-routine {
  border-radius: 25px;
  background-color: #ed1f24;
  color: white;
  font-size: 24px;
  padding: 5px 10px;
  border: none;
}

th {
  font-weight: bold;
}

#empty-routines {
  font-size: 28px;
  text-align: center;
  margin-top: 20px;
}
</style>