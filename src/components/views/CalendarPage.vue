<template>
  <Navbar />
  <div class="calendar-page">
    <div class="calendar-page-header">Your Schedule</div>
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
        <CalendarDetailModal
          v-show="showModal"
          :eventTitle="eventTitle"
          :eventDate="eventDate"
          :eventStart="eventStart"
          :eventEnd="eventEnd"
          :eventExerciseType="eventExerciseType"
          :eventTrainer="eventTrainer"
          @close-modal="showModal = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import CalendarDetailModal from "../client/CalendarDetailModal.vue";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase.js";
import { mapGetters } from "vuex";
import "vue-cal/dist/vuecal.css";

export default {
  name: "CalendarPage",
  components: { VueCal, CalendarDetailModal },
  data() {
    return {
      showModal: false,
      eventTitle: null,
      eventDate: null,
      eventStart: null,
      eventEnd: null,
      eventExerciseType: null,
      eventTrainer: null,
      events: [
        // {
        //   start: "2023-03-27 14:00",
        //   end: "2023-03-27 15:00",
        //   title: "Gym Session",
        //   exerciseType: "Legs",
        // },
        // {
        //   start: "2023-03-29 10:00",
        //   end: "2023-03-29 11:00",
        //   title: "Gym Session",
        //   exerciseType: "Legs, Arms",
        // },
        // {
        //   start: "2023-03-15 13:00",
        //   end: "2023-03-15 14:00",
        //   title: "Gym Session",
        //   exerciseType: "Cardio",
        // },
        // {
        //   start: "2023-03-15 14:00",
        //   end: "2023-03-15 15:00",
        //   title: "Gym Session",
        //   exerciseType: "Back, Shoulders",
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
    //console.log(this.user.data.email)
  },
  async created() {
    // a container to store all bookings of this client
    let clientBookings = [];
    // track query bookings from firebase
    let bookingsFromFirebase = [];

    // retrieving this client bookings
    const clientRef = collection(db, "client");
    const thisClientQuery = query(
      clientRef,
      where("email", "==", this.user.data.email)
    );
    const clientQuerySnapshot = await getDocs(thisClientQuery);

    // Function to capitalize first letter
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    clientQuerySnapshot.forEach((doc) => {
      bookingsFromFirebase = doc.data().bookings;

      // Get Trainer Name from trainerEmail field & assign to data()
      let eventTrainerEmail = doc.data().trainerEmail;
      this.eventTrainer = capitalizeFirstLetter(
        eventTrainerEmail.substring(0, eventTrainerEmail.lastIndexOf("@"))
      );
    });

    // Retrieve the relevant information about booking from FS
    // Create events Object to link to events property in vue-cal
    bookingsFromFirebase.forEach((booking) => {
      let start = booking.from.toDate();
      let end = booking.to.toDate();
      let title = booking.title;
      let exerciseType = booking.focus;
      clientBookings.push({ start, end, title, exerciseType });
    });

    // Link vue-cal events property to created events Object
    this.events = clientBookings;
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

<style>
.vuecal__event {
  background-color: rgba(169, 169, 169, 0.7);
  border: solid rgba(0, 0, 0, 0.3);
  border-width: 0 0 2px 0;
  box-sizing: border-box;
  padding: 5px;
  cursor: pointer;
}
.unclickable {
  cursor: default;
}

.vuecal__event-title {
  font-size: 1.1em;
  font-weight: bold;
}

.vuecal__event-time {
  font-size: 0.9em;
}

.vuecal__cell--has-events {
  /* Add background color to cells with events */
  background-color: #fffacd;
}

/* Styles for Min and Max Range vue-cal */
.vuecal__cell--disabled {
  text-decoration: line-through;
}

.vuecal__cell--after-max {
  color: #a8a2a2;
}

.otherClient {
  background: black;
  color: #fff;
}

/* Other styles */
.vuecal__menu,
.vuecal__cell-events-count {
  background-color: #ed1f24;
}

.vuecal__title-bar {
  background-color: #ff8082;
}

.vuecal__cell--today,
.vuecal__cell--current {
  background-color: #ffd6d7;
}

.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: #ff8082;
}

.vuecal__cell--selected:before {
  border-color: black;
}

/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
  background-color: rgba(195, 255, 225, 0.5);
}

.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
  background-color: rgba(136, 236, 191, 0.25);
}
</style>
