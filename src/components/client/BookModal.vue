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
          key="key"
          class="slots"
          name="slots"
          v-if="date"
          v-model="selected"
          multiple
        >
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
import Swal from "sweetalert2";
import { db, auth } from "../../firebase.js";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { mapGetters } from "vuex";
import "@vuepic/vue-datepicker/dist/main.css";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

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

let minDate = new Date();
let maxDate = new Date();
minDate.setDate(minDate.getDate() + 1);
maxDate.setMonth(minDate.getMonth() + 3);

export default {
  name: "BookModal",
  data() {
    return {
      key: 0,
      date: null,
      enableTime: false,
      newBookings: [],
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
      Swal.fire({
        title: "Confirm Your Bookings",
        html: this.displayBookings(this.selected),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#ed1f24",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          this.submitBooking();
          Toast.fire({
            icon: "success",
            title: "Bookings successful",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Bookings cancelled",
          });
        }
      });
    },
    async submitBooking() {
      // get the document we need to update the bookings for
      const clientRef = doc(db, "client", this.user.data.email);
      // get focus
      let focus = this.parseRoutines(this.routineOne, this.routineTwo);
      // get title
      let title = "Gym Session";

      // for every selected timeslot, we will create an object to be updated into firebase
      this.selected.forEach(async (startTime) => {
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
        // bookings to be passed to cancel modal and booking page
        this.newBookings.push(newBooking);
        // adding to the booked session for this component
        this.addBookedSession(newBooking);
        // updating the bookings field on firebase with a new booking
        await updateDoc(clientRef, {
          bookings: arrayUnion(newBooking),
        });
      });
      // pass the set of new bookings to the parent component
      this.$emit("addBookings", this.newBookings);
      // emit booking done and close the modal
      // window.alert("Booking Done!");
      this.$emit("close-modal");

      // cleaning up the components
      this.date = null;
      this.newBookings = [];
      this.selected = [];
      this.routineOne = "";
      this.routineTwo = "";
    },
    listOfPossibleBookings(stringDate) {
      let output = [];
      let bookedSessions = this.allBookedSessions[stringDate];
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
    addBookedSession(booking) {
      // helps to add the new booking to the current set of all booked sessions
      let month = booking.from.getMonth();
      let day = booking.from.getDate();
      let startHour = booking.from.getHours();

      if (this.allBookedSessions.hasOwnProperty(`${day}, ${month}`)) {
        this.allBookedSessions[`${day}, ${month}`].push(startHour);
      } else {
        this.allBookedSessions[`${day}, ${month}`] = [startHour];
      }
    },
    displayBookings(bookings) {
      let output = `
      ${this.date.getDate()} 
      ${this.date.toLocaleString("default", { month: "long" })}, 
      ${this.parseRoutines(this.routineOne, this.routineTwo)}`;
      bookings.forEach((startTime) => {
        output += "<div>";
        output += this.createTimeString(startTime);
        output += " - ";
        output += this.createTimeString(startTime + 1);
        output += "</div>";
      });
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
    cancelledBookings: Array,
  },
  emits: ["close-modal", "addBookings"],
  watch: {
    // if the date has been selected, we will need to show all the available session that can be booked on this day
    date(newDate) {
      if (!newDate) {
        return;
      }
      let day = newDate.getDate();
      let month = newDate.getMonth();
      let newAvailability = this.listOfPossibleBookings(`${day}, ${month}`);
      this.availableSessions = newAvailability;
    },
    // if there are bookings that have been cancelled, we will need to remove it from the set of all booked sessions
    cancelledBookings(cancelled) {
      cancelled.forEach((x) => {
        let startTime = x["from"];
        let startHour = startTime.getHours();
        let day = startTime.getDate();
        let month = startTime.getMonth();
        this.allBookedSessions[`${day}, ${month}`] = this.allBookedSessions[
          `${day}, ${month}`
        ].filter((y) => {
          return y !== startHour;
        });
      });
      if (this.date) {
        let newAvailability = this.listOfPossibleBookings(
          `${this.date.getDate()}, ${this.date.getMonth()}`
        );
        this.availableSessions = newAvailability;
      }
      this.key++;
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
  border: 2px solid white;
}

.slots {
  min-height: 200px;
  border: 0.1px solid black;
  padding: 0px 3px;
  text-align: center;
}

.list-styling {
  list-style-type: none;
}

/* @keyframes pill-button-highlight {
  from {
    border: 0px white solid;
  }
  to {
    border: 2px white solid;
    background-color: #5041e0;
  }
} */

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>

<style>
.swal2-popup {
  font-size: 1.1rem !important;
  font-family: Teko !important;
  width: auto !important;
  padding: 10px !important;
}
</style>

<!-- Global styling for popups is here -->
