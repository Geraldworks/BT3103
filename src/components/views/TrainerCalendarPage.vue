<template>
  <TrainerNavbar />
  <div class="calendar-page">
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
      events: [
        // {
        //   start: "2023-03-27 14:00",
        //   end: "2023-03-27 15:00",
        //   title: "Gym Session",
        //   exerciseType: "Legs",
        //   client: "James Mak",
        // },
        // {
        //   start: "2023-03-29 10:00",
        //   end: "2023-03-29 11:00",
        //   title: "Gym Session",
        //   exerciseType: "Legs, Arms",
        //   client: "Bryan Wong",
        // },
        // {
        //   start: "2023-03-15 13:00",
        //   end: "2023-03-15 14:00",
        //   title: "Gym Session",
        //   exerciseType: "Cardio",
        //   client: "Gerald Ho",
        // },
        // {
        //   start: "2023-03-15 14:00",
        //   end: "2023-03-15 15:00",
        //   title: "Gym Session",
        //   exerciseType: "Back, Shoulders",
        //   client: "Luther Tan",
        // },
      ],
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
        allClientBookings.push({ start, end, title, exerciseType, client });
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
.calendar-page-header {
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
  font-family: Teko;
  font-size: 1.2rem;
}
</style>