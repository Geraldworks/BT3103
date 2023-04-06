<template>
  <div class="calendar-page">
    <TrainerNavbar />
    <div class="booking-page-header">
      <div>current bookings</div>
    </div>
    <div
      style="
        height: 800px;
        width: 85%;
        margin: auto;
        padding: 50px;
        text-align: center;
      "
    >
      <vue-cal
        class="calendar"
        active-view="month"
        :disable-views="['years', 'year', 'day']"
        :time-from="9 * 60"
        :time-to="20 * 60"
        :time-step="60"
        :events="events"
        :on-event-click="onEventClick"
        :editable-events="{
          title: false,
          drag: false,
          resize: false,
          delete: false,
          create: false,
        }"
        :timeCellHeight="70"
      />
      <div class="popup">
        <TrainerCalendarDetailModal
          v-show="showModal"
          :eventTitle="eventTitle"
          :eventDate="eventDate"
          :eventStart="eventStart"
          :eventEnd="eventEnd"
          :eventExerciseType="eventExerciseType"
          :eventClient="eventClient"
          @close-modal="showModal = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TrainerNavbar from "../trainer/TrainerNavbar.vue";
import TrainerCalendarDetailModal from "../trainer/TrainerCalendarDetailModal.vue";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase.js";
import { mapGetters } from "vuex";

export default {
  name: "TrainerCalendarPage",
  components: { TrainerNavbar, VueCal, TrainerCalendarDetailModal },
  data() {
    return {
      showModal: false,
      eventTitle: null,
      eventDate: null,
      eventStart: null,
      eventEnd: null,
      eventExerciseType: null,
      eventClient: null,
      events: [],
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.$store.dispatch("fetchUser", user);
    });
  },
  async created() {
    // a container to store all bookings of this client's trainer
    let allClientBookings = [];

    // retrieve this trainer's bookings
    const trainerRef = collection(db, "trainer");
    const thisTrainerQuery = query(
      trainerRef,
      where("email", "==", this.user.data.email)
    );

    // Function to capitalize first letter
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // a storage for all client emails
    let allClients = [];
    const trainerQuerySnapshot = await getDocs(thisTrainerQuery);
    trainerQuerySnapshot.forEach((doc) => {
      allClients = doc.data().ClientsId;
    });

    // create reference to clients collection
    const clientRef = collection(db, "client");

    // getting all bookings for all clients
    const allClientQuery = query(clientRef, where("email", "in", allClients));
    const allClientQuerySnapshot = await getDocs(allClientQuery);

    allClientQuerySnapshot.forEach((clientDoc) => {
      let client = clientDoc.data().fullName;
      clientDoc.data().bookings.forEach((doc) => {
        // each iteration gets one bookings from all the other clients
        let start = doc.from.toDate();
        let end = doc.to.toDate();
        let title = doc.title;
        let exerciseType = doc.focus;

        let obj = { start, end, title, exerciseType, client };
        obj["class"] = "thisTrainer";

        allClientBookings.push(obj);
      });
    });
    this.events = allClientBookings;
  },
  methods: {
    onEventClick(event, e) {
      console.log("Clicked the event");
      this.eventTitle = event.title;
      // Convert to Date object for now because not connected to FS yet
      this.eventDate = new Date(event.start).toLocaleDateString();
      this.eventStart = new Date(event.start).toLocaleTimeString();
      this.eventEnd = new Date(event.end).toLocaleTimeString();
      this.eventExerciseType = event.exerciseType;
      this.eventClient = event.client;
      this.showModal = true;

      e.stopPropagation();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");
.booking-page-header {
  color: white;
  border-bottom: 5px white solid;
  font-size: 3rem;
  text-transform: uppercase;
  width: 80%;
  margin: auto;
  padding-top: 20px;
}

.calendar-page {
  background-color: black;
  min-height: 100vh;
  font-family: Teko;
  min-width: 1100px;
}

.calendar {
  background-color: white;
  font-family: "Source Sans Pro", "sans-serif";
  font-size: 1.2rem;
}

@media screen and (max-width: 800px) {
  .calendar-page {
    padding-bottom: calc(600px - 10vh);
  }
}

@media screen and (max-width: 550px) {
  .calendar-page {
    padding-bottom: calc(850px - 10vh);
  }
}

@media screen and (max-width: 400px) {
  .calendar-page {
    padding-bottom: calc(1200px - 10vh);
  }
}
</style>

<style>
.thisTrainer {
  background: #000; /* #ed1f24 */
  color: #fff;
  border: 1px solid transparent;
}

.thisTrainer:hover {
  border: 1px white solid;
}
</style>
