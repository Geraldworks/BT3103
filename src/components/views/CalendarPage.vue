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
      <div class="popup">
        <SmallModal
          v-show="showModal"
          :bodyContent="modalBodyContent"
          :buttonContent="modalButtonContent"
          @close-modal="showModal = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import SmallModal from "../client/SmallModal.vue";
import "vue-cal/dist/vuecal.css";

export default {
  name: "CalendarPage",
  components: { VueCal, SmallModal },
  data() {
    return {
      // selectedEvent: {},
      showModal: false,
      modalBodyContent: "Content Text",
      modalButtonContent: "This Button Does Nothing",
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
          start: "2023-03-15 12:00",
          end: "2023-03-15 14:00",
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
      // this.selectedEvent = event;
      this.showModal = true;

      e.stopPropagation();
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
  background-color: rgba(169, 169, 169, 0.7);
  border: solid rgba(0, 0, 0, 0.3);
  border-width: 0 0 2px 0;
  box-sizing: border-box;
  padding: 5px;
  cursor: pointer;
}

.vuecal__cell--has-events {
  background-color: #fffacd;
}

.vuecal__cell-events-count {
  display: none;
}
</style>
