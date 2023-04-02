<template>
  <Navbar />
  <div class="routines-page">
    <div class="routine-page-header">Your Routines</div>

    <div class="content-container">
      <div class="interactive-top-area">
        <button @click="showRoutineCreateModal()" id="new-routine">
          Create New Routine
        </button>
        <!-- Include filter here if we decide to do it -->
      </div>

      <div class="routine-list">
        <RoutineBlock
          v-for="routine in routineArr"
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
          :action="viewingAction"
          :showUpdate="showUpdateInViewing"
          :routineInfo="selectedRoutineInfo"
          v-show="routineViewModal"
          @close-modal="routineViewModal = false"
          @reload-routines="reloadPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { mapGetters, useStore } from "vuex";
import { db, auth } from "../../firebase.js";
import RoutineViewModal from "../client/RoutineViewModal.vue";
import RoutineBlock from "../client/RoutineBlock.vue";

export default {
  name: "RoutinesPage",
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      email: "",
      viewingAction: "",
      showUpdateInViewing: true,
      routineArr: [],
      selectedRoutineInfo: {},
      routineViewModal: false,
    };
  },
  mounted() {
    const store = useStore();
    auth.onAuthStateChanged((user) => {
      store.dispatch("fetchUser", user);
    });
  },
  async created() {
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
      where("email", "==", this.user.data.email)
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
  components: {
    RoutineViewModal,
    RoutineBlock,
  },
  watch: {
    email(newEmail) {
      console.log(newEmail);
    },
  },
  methods: {
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
      // window.location.reload();
      this.$router.go(0);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");

.routine-page-header {
  color: white;
  border-bottom: 5px white solid;
  font-size: 3rem;
  text-transform: uppercase;
  width: 80%;
  margin: auto;
  padding-top: 20px;
}

.routines-page {
  background-color: black;
  overflow-y: hidden;
  min-width: 800px; /* Or else the PerformanceBottom component will overflow into the side margin */
  padding-bottom: 30px;
  min-height: 79vh;
  font-family: Teko;
}

.content-container {
  background-color: #d9d9d9;
  margin: 0vw 10vw;
  border-radius: 25px;
  padding: 30px 60px;
  margin-top: 22px;
  max-height: 59vh;
  overflow-y: auto;
}

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

body::-webkit-scrollbar {
  display: none;
}
</style>