<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal" @click.stop>
        <!-- <img class="check" src="~/assets/check-icon.png" alt="" /> -->
        <div style="font-size: 2.5rem">Select a Date to Book</div>
        <div>
          <Datepicker
            v-model="date"
            :enable-time-picker="enableTime"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </div>
        <div v-if="date" style="font-size: 2.5rem; margin-top: 10px">
          Available Slots
        </div>
        <select
          class="slots"
          name="slots"
          v-if="date"
          v-model="selected"
          multiple
        >
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
        <!-- ADD routine options here -->
        <div
          style="font-size: 2.5rem; margin-top: 10px"
          v-if="date && selected.length > 0"
        >
          Select 1 - 2 Routines
        </div>
        <select
          style="font-size: 1.5rem; text-align: center; margin-bottom: 10px"
          v-if="date && selected.length > 0"
          v-model="routineOne"
        >
          <option
            style="font-size: 1rem"
            v-for="routine in routineOptions"
            :value="routine"
          >
            {{ routine }}
          </option>
        </select>
        <select
          style="font-size: 1.5rem; text-align: center"
          v-if="date && routineOne.length != 0"
          v-model="routineTwo"
        >
          <option
            style="font-size: 1rem"
            v-for="routine in routineOptions.filter(
              (routine) => routine !== routineOne
            )"
            :value="routine"
          >
            {{ routine }}
          </option>
        </select>
        <div>
          <button
            v-if="availableSessions.length > 0 && this.date && routineOne"
            @click="confirmBooking()"
            style="text-align: center"
            type="submit"
          >
            Book
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
import { db, auth } from "../../firebase.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { mapGetters } from "vuex";
import "@vuepic/vue-datepicker/dist/main.css";

const gymStartingTimes = [9, 11, 13, 15, 17, 19];
const routineOptions = [
  "", // in case a user misclicks
  "Chest",
  "Arms",
  "Shoulders",
  "Back",
  "Abs",
  "Legs",
  "Cardio",
];
const minDate = new Date();
let maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 3);

export default {
  name: "BookModal",
  data() {
    return {
      date: null,
      enableTime: false,
      selected: [],
      availableSessions: [],
      routineOptions: routineOptions,
      routineOne: "",
      routineTwo: "",
      minDate: minDate,
      maxDate: maxDate,
    };
  },
  methods: {
    confirmBooking() {
      window.confirm("Confirm your booking")
        ? this.submitBooking()
        : window.alert("Booking Not Done!");
    },
    async submitBooking() {
      // get the focus (routineParser)
      // get the title (gym session)
      // get the start time (selected)
      // get the end time (selected + 1)
      // refresh calendar after submitting
      const clientRef = doc(db, "client", this.user.data.email);

      // get focus
      let focus = this.parseRoutines(this.routineOne, this.routineTwo);
      // get title
      let title = "Gym Session";

      this.selected.forEach(async (startTime) => {
        // get start time
        let from = new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          this.date.getDate(),
          startTime
        );
        let to = new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          this.date.getDate(),
          startTime + 1
        );
        let newBooking = { focus, from, title, to };
        console.log(newBooking);
        await updateDoc(clientRef, {
          bookings: arrayUnion(newBooking),
        });
      });
      // refresh page
      this.$emit("updateCalendar");
      window.alert("Booking Done!");
      this.$emit("close-modal");
      // cleaning up the components
      this.date = null;
      this.selected = [];
      this.routineOne = ""
      this.routineTwo = ""
    },
    listOfPossibleBookings(stringDate) {
      let output = [];
      let bookedSessions = this.allBookedSessions[stringDate];
      // console.log(bookedSessions);
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
    parseRoutines(routineOne, routineTwo) {
      return routineTwo === "" ? routineOne : `${routineOne}, ${routineTwo}`;
    },
  },
  components: {
    Datepicker,
  },
  props: {
    allBookedSessions: Object,
  },
  emits: ["close-modal", "updateCalendar"],
  watch: {
    date(newDate) {
      if (!newDate) {
        return;
      }
      let day = newDate.getDate();
      let month = newDate.getMonth();
      let newAvailability = this.listOfPossibleBookings(`${day}, ${month}`);
      this.availableSessions = newAvailability;
    },
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
  max-height: 75%;
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
  margin-top: 20px;
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

.slots {
  min-height: 200px;
  border: 0.1px solid black;
  padding: 0px 3px;
  text-align: center;
}

@keyframes pill-button-highlight {
  from {
    border: 0px white solid;
  }
  to {
    border: 2px white solid;
    background-color: #5041e0;
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
