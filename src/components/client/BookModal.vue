<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal" @click.stop>
        <!-- <img class="check" src="~/assets/check-icon.png" alt="" /> -->
        <div style="font-size: 3rem">Select a Date</div>
        <div>
          <Datepicker
            v-model="date"
            :enable-time-picker="enableTime"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </div>
        <div style="font-size: 3rem; margin-top: 10px">Available Slots</div>
        <select v-if="date" v-model="selected" multiple>
          <!--
          <input :id="session" type="checkbox" style="margin-right: 10px" />
          <label :for="session"
            >{{ createTimeString(session) }} -
            {{ createTimeString(session + 1) }}</label
          > -->
          <option v-for="session in availableSessions" :value="session">
            {{ createTimeString(session) }} -
            {{ createTimeString(session + 1) }}
          </option>
        </select>
        <div>
          <button
            v-if="availableSessions.length > 0 && this.date"
            @click="submitBooking()"
            style="text-align: center"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="@/assets/images/cross-icon.png" alt="" />
        <!--can change this part-->
      </div>
    </div>
  </transition>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const gymStartingTimes = [9, 11, 13, 15, 17, 19];
const minDate = new Date();
let maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 3);

export default {
  name: "SmallModal",
  data() {
    return {
      date: null,
      enableTime: false,
      selected: null,
      availableSessions: [],
      minDate: minDate,
      maxDate: maxDate,
    };
  },
  methods: {
    submitBooking() {
      console.log(this.selected);
      // need to work out what to do after submitting
      // need to refresh calendar as well
    },
    listOfPossibleBookings(stringDate) {
      let output = [];
      let bookedSessions = this.allBookedSessions[stringDate];
      console.log(bookedSessions);
      if (!bookedSessions) {
        return gymStartingTimes;
      }
      for (let i = 0; i < gymStartingTimes.length; i++) {
        if (!bookedSessions.includes(gymStartingTimes[i])) {
          output.push(gymStartingTimes[i]);
        }
      }
      return output;
    },
    createTimeString(time) {
      let pm = false;
      if (time >= 12) {
        pm = true;
      }
      return pm
        ? String(time === 12 ? 12 : time % 12) + "pm"
        : String(time) + "am";
    },
  },
  components: {
    Datepicker,
  },
  props: {
    allBookedSessions: Object,
  },
  emits: ["close-modal"],
  watch: {
    date(newDate) {
      if (!newDate) {
        return;
      }
      let day = newDate.getDate();
      let month = newDate.getMonth();
      let newAvailability = this.listOfPossibleBookings(`${day}, ${month}`);
      this.availableSessions = newAvailability;
      console.log(this.availableSessions);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");
.modal-overlay {
  position: fixed;
  z-index: 500;
  top: -10px;
  bottom: -10px;
  left: -10px;
  right: -10px;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  position: relative;
  /* justify-content: center;
  text-align: center; */
  background-color: #d9d9d9;
  height: 90%;
  width: 90%;
  margin-top: 6%;
  border-radius: 20px;
  max-width: 50%;
  max-height: 70%;
  font-size: 28px;
  padding: 30px 50px;
  text-align: center;
  min-width: 550px;
}

.modal::-webkit-scrollbar {
  display: none;
}
.close {
  margin: 6% 0 0 10px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

button {
  width: 120px;
  height: 50px;
  border-radius: 25px; /* half of height */
  background-color: rgb(237, 31, 36);
  border: none;
  outline: none;
  cursor: pointer;
  margin: 5px;
  margin-top: 30px;
  font-size: 1.5rem;
  text-align: center;
  box-sizing: border-box;
  color: white;
}

button:hover {
  animation-name: pill-button-highlight;
  animation-duration: 0.15s;
  animation-fill-mode: forwards;
  box-sizing: border-box;
}

select {
  height: 200px;
  border: 0.5px solid black;
  padding: 0px 3px;
  text-align: center;
}

@keyframes pill-button-highlight {
  from {
    border: 0px white solid;
  }
  to {
    border: 2.5px black solid;
  }
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
