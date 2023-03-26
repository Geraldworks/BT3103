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
          @close-modal="showModal = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import CalendarDetailModal from "../client/CalendarDetailModal.vue";
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
      events: [
        {
          start: "2023-03-27 14:00",
          end: "2023-03-27 15:00",
          title: "Gym Session",
          exerciseType: "Legs",
        },
        {
          start: "2023-03-29 10:00",
          end: "2023-03-29 11:00",
          title: "Gym Session",
          exerciseType: "Legs, Arms",
        },
        {
          start: "2023-03-15 13:00",
          end: "2023-03-15 14:00",
          title: "Gym Session",
          exerciseType: "Cardio",
        },
        {
          start: "2023-03-15 14:00",
          end: "2023-03-15 15:00",
          title: "Gym Session",
          exerciseType: "Back, Shoulders",
        },
      ],
    };
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

.vuecal__cell-events-count {
  /* Remove the event count number in month view */
  display: none;
}
</style>
