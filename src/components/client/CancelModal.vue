<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal" @click.stop>
        <div style="font-size: 2.5rem; margin-bottom: 20px">
          Select your Bookings to Cancel
        </div>
        <select v-model="selected" style="padding: 0px 2px" multiple>
          <option
            style="padding: 0px 2px 5px 2px"
            v-for="booking in clientBookings.sort(this.comparatorForTime)"
            :value="booking"
          >
            {{ parseBookingObject(booking) }}
          </option>
        </select>
        <div>
          <button
            @click="confirmCancellation()"
            style="text-align: center"
            type="submit"
          >
            Confirm
          </button>
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
import { db, auth } from "../../firebase.js";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { mapGetters } from "vuex";

export default {
  name: "CancelModal",
  data() {
    return {
      selected: [],
      oldBookings: [],
    };
  },
  methods: {
    parseBookingObject(bookingObject) {
      let fromTime = bookingObject["from"];
      const month = fromTime.toLocaleString("default", { month: "long" });

      return `${month} ${fromTime.getDate()}, 
              ${this.createTimeString(fromTime.getHours())} - 
              ${this.createTimeString(fromTime.getHours() + 1)},
              ${bookingObject.focus}`;
    },
    confirmCancellation() {
      window.confirm("Confirm your Cancellations")
        ? this.cancelBookings()
        : window.alert("Please review your selections");
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
    async cancelBookings() {
      this.oldBookings = this.selected;
      let bookingsFromFirebase = [];

      const clientDoc = doc(db, "client", this.user.data.email);
      const clientSnap = await getDoc(clientDoc);

      bookingsFromFirebase = clientSnap.data().bookings;

      this.selected.forEach((x) => {
        bookingsFromFirebase = bookingsFromFirebase.filter((y) => {
          return x["from"].getTime() !== y.from.toDate().getTime();
        });
      });

      await updateDoc(clientDoc, { bookings: bookingsFromFirebase });
      let newClientBookings = bookingsFromFirebase;

      newClientBookings = newClientBookings.map((x) => {
        return {
          title: x.title,
          focus: x.focus,
          from: x.from.toDate(),
          to: x.to.toDate(),
        };
      });

      // console.log(newClientBookings)
      console.log(this.oldBookings)
      this.$emit("setNewClientBookings", newClientBookings);
      this.$emit("removeBookings", this.oldBookings);
      window.alert("Cancellations Done!");
      this.$emit("close-modal");

      this.oldBookings = [];
      this.selected = [];
    },
  },
  props: {
    clientBookings: Array,
    newBookings: Array,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.$store.dispatch("fetchUser", user);
    });
  },
  emits: ["close-modal", "removeBookings", "setNewClientBookings"],
  watch: {
    newBookings(newThings) {
      // console.log(newThings)
      newThings.forEach((x) => this.clientBookings.push(x));
      console.log(this.clientBookings);
      // this.newBookings = [];
      this.$forceUpdate();
      // might need to watch for the change in clientBookings
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
