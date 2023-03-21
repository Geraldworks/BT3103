<template>
  <TrainerNavbar />
  <div style="height: 600px; width: 80%; margin: auto; padding: 1%;text-align: center;">
    <vue-cal :time="false" active-view="month" :disable-views="['years', 'year', 'week']" />
  </div>
</template>

<script>
import TrainerNavbar from '../trainer/TrainerNavbar.vue';
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  name: "TrainerCalendarPage",
  components: { TrainerNavbar, VueCal }
};
</script>

<style>
.vuecal__menu, .vuecal__cell-events-count {background-color: #ED1F24;}
.vuecal__title-bar {background-color: #ff8082;}
.vuecal__cell--today, .vuecal__cell--current {background-color: #ffd6d7;}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: #ff8082;}
.vuecal__cell--selected:before {border-color: black;}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {background-color: rgba(195, 255, 225, 0.5);}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {background-color: rgba(136, 236, 191, 0.25);}
</style>