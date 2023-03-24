<template>
  <div class="calendar-page">
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
        :editable-events="{
          title: false,
          drag: false,
          resize: false,
          delete: false,
          create: false,
        }"
      />
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "CalendarPage",
  components: { VueCal },
  data() {
    return {
      events: [
        {
          start: "2023-03-27 14:00",
          end: "2023-03-27 16:00",
          title: "Gym Session",
        },
        {
          start: "2023-03-29 10:00",
          end: "2023-03-29 12:00",
          title: "Gym Session",
        },
        {
          start: "2023-03-15 10:00",
          end: "2023-03-15 12:00",
          title: "Gym Session",
        },
        {
          start: "2023-03-15 14:00",
          end: "2023-03-15 16:00",
          title: "Gym Session",
        },
      ],
    };
  },
  methods: {
    onEventClick(event, e) {
      console.log("Clicked the event");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");
.calendar-page {
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
