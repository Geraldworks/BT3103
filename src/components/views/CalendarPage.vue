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
        :time="false"
        active-view="month"
        :disable-views="['years', 'year', 'week']"
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
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");
.calendar-page {
  background-color: black;
  min-height:100vh;
}

.calendar {
  background-color: white;
  font-family: Teko;
  font-size: 1.2rem;
}

</style>
