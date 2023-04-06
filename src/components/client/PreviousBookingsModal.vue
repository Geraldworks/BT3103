<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal" @click.stop>
        <div style="font-size: 2.5rem; margin-bottom: 20px">
          Previous Bookings
        </div>
        <div class="previous">
            <div
              v-for="booking in this.previousBookings.sort(
                this.comparatorForTime
              )"
            >
              {{ this.parseBookingObject(booking) }}
          </div>
        </div>
        <!-- Parse the array information from the prop-->
      </div>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="@/assets/images/cross-icon.png" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
import { auth } from "../../firebase.js";
import { mapGetters } from "vuex";

export default {
  name: "PreviousBookingsModal",
  methods: {
    parseBookingObject(bookingObject) {
      let fromTime = bookingObject["from"];
      const month = fromTime.toLocaleString("default", { month: "long" });

      return `${month} ${fromTime.getDate()}, 
              ${this.createTimeString(fromTime.getHours())} - 
              ${this.createTimeString(fromTime.getHours() + 1)},
              ${bookingObject.focus}`;
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
    comparatorForTime(bookingOne, bookingTwo) {
      if (bookingOne.from < bookingTwo.from) {
        return -1;
      } else if (bookingOne.from > bookingTwo.from) {
        return 1;
      }
      return 0;
    },
  },
  props: {
    previousBookings: Array,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.$store.dispatch("fetchUser", user);
    });
  },
  emits: ["close-modal"],
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
  width: 90%;
  margin-top: 6%;
  border-radius: 20px;
  max-width: 50%;
  max-height: 50%;
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
  border: 2px solid white;
}

select {
  min-height: 200px;
}

.slots {
  min-height: 200px;
  border: 0.5px solid black;
  padding: 0px 3px;
  text-align: center;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.previous {
  background-color: white;
  border: 1px solid black;
}
</style>
