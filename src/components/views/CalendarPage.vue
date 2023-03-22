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
        :disable-views="['years', 'year', 'week']"
        events-on-month-view="true"
        :time-from="9 * 60"
        :time-to="23 * 60"
        :events="events"
        :on-event-click="onEventClick"
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
          start: "2023-03-15 10:00",
          end: "2023-03-15 12:00",
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

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-box {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 600px;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.dialog-header h2 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
}

.dialog-body {
  margin-bottom: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.dialog-footer button {
  margin-left: 10px;
}
</style>

<style>
.vuecal__event {
  background-color: red;
  box-sizing: border-box;
  padding: 5px;
}
</style>
