<template>
  <div class="booking-page">
    <Navbar />
    <div
      style="
        height: 700px;
        width: 75%;
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
        :time-to="23 * 60"
        :time-step="60"
        :events="events"
        :on-event-click="onEventClick"
        :on-event-create="onEventCreate"
        :editable-events="{
          title: true,
          drag: true,
          resize: false,
          delete: false,
          create: true,
        }"
        :snap-to-time="60"
      />
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
export default {
  name: "BookingPage",
  components: {
    VueCal,
  },
  data() {
    return {
      events: [
        {
          start: "2023-03-27 14:00",
          end: "2023-03-27 16:00",
          title: "Gym Session",
          client: "dbtest@gmail.com",
          routine: "Test Routine 1",
        },
        {
          start: "2023-03-29 16:00",
          end: "2023-03-29 18:00",
          title: "Gym Session",
          client: "gtest@gmail.com",
          routine: "Test Routine 2",
        },
        {
          start: "2023-03-15 10:00",
          end: "2023-03-15 12:00",
          title: "Gym Session",
          client: "gtest@gmail.com",
          routine: "Test Routine 3",
        },
        {
          start: "2023-03-15 14:00",
          end: "2023-03-15 16:00",
          title: "Gym Session",
          client: "dbtest@gmail.com",
          routine: "Test Routine 4",
        },
      ],
    };
  },
  methods: {
    onEventClick(event, e) {
      console.log("Clicked the event");
    },
    onEventCreate(event, deleteEventFunction) {
      console.log("Created Event");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");
.booking-page {
  background-color: black;
  min-height: 100vh;
}

.calendar {
  background-color: white;
  font-family: Teko;
  font-size: 1.2rem;
}
</style>

<style>
.vuecal__event {
  background-color: darkgray;
  border-color: black;
  box-sizing: border-box;
  padding: 5px;
}

.vuecal__cell--has-events {
  background-color: #fffacd;
}
</style>