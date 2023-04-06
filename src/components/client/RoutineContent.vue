<template>
  <div class="routine-content-area">
    <div class="interactive-top-area">
      <button @click="showRoutineCreateModal()" id="new-routine">
        Create New Routine
      </button>
      <!-- Include filter here if we decide to do it -->
    </div>

    <div class="routine-list">
      <!-- If no routines -->
      <div v-if="routineArr.length == 0" id="empty-routines">
        No routines currently... Create one now!
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
      console.log("====Fetching Firebase Data====");
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
      function convertDateFormat(dateString) {
        // Split the input string into date and time components, if applicable
        const dateComponents = dateString.split(",")[0].split("/");
        const timeComponents = dateString.split(",")[1];
        // Check whether a time component is present
        if (timeComponents) {
          // Format with time component: "mm/dd/yyyy, hh:mm:ss am" -> "dd/mm/yyyy, hh:mm:ss am"
          const [month, day, year] = dateComponents;
          return `${day}/${month}/${year}, ${timeComponents.trim()}`;
        } else {
          // Format without time component: "mm/dd/yyyy" -> "dd/mm/yyyy"
          const [month, day, year] = dateComponents;
          return `${day}/${month}/${year}`;
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
          routineDate: convertDateFormat(
            routine.routineDate.toDate().toLocaleDateString()
          ),
          updateBool: routine.updatedBool,
          lastUpdatedName: routine.lastUpdatedName,
          lastUpdatedTimestamp: convertDateFormat(
            routine.lastUpdatedTimestamp.toDate().toLocaleString()
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
      console.log("Reloading...");
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

.interactive-top-area {
  padding-bottom: 1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
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