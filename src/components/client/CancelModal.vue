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
            v-if="this.selected.length !== 0"
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
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export default {
  name: "CancelModal",
  data() {
    return {
      selected: [],
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
      Swal.fire({
        title: "Confirm Your Cancellations",
        html: this.displayCancellations(this.selected),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#ed1f24",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          this.cancelBookings();
          Toast.fire({
            icon: "success",
            title: "Cancellations successful",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "bookings cancelled",
          });
        }
      });
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
      // retrieving the document to update to
      const clientDoc = doc(db, "client", this.user.data.email);
      const clientSnap = await getDoc(clientDoc);

      // retrieving the current set of bookings from firebase
      let bookingsFromFirebase = [];
      bookingsFromFirebase = clientSnap.data().bookings;

      // filtering down the bookings to keep
      this.selected.forEach((x) => {
        bookingsFromFirebase = bookingsFromFirebase.filter((y) => {
          return x["from"].getTime() !== y.from.toDate().getTime();
        });
      });


      // update the new set of bookings to firebase
      await updateDoc(clientDoc, { bookings: bookingsFromFirebase });

      // creating a new array of bookings to be set to the client's new set of bookings
      let newClientBookings = bookingsFromFirebase;
      newClientBookings = newClientBookings.map((x) => {
        return {
          title: x.title,
          focus: x.focus,
          from: x.from.toDate(),
          to: x.to.toDate(),
        };
      });

      // emitting the event to parent component to set it for cancel modal
      this.$emit("setNewClientBookings", newClientBookings);
      // emit the set of made cancellations to book modal to open up the slot again
      this.$emit("removeBookings", this.selected);
      this.$emit("close-modal");

      // resetting the bookings that have been selected
      this.selected = [];
    },
    displayCancellations(cancellations) {
      let output = "";
      cancellations.forEach((cancel) => {
        output += "<div>";
        output += this.parseBookingObject(cancel);
        output += "</div>";
      });
      return output;
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
    // if there are new bookings, we must add it to the client's set of bookings
    newBookings(newThings) {
      newThings.forEach((x) => this.clientBookings.push(x));
      this.$forceUpdate();
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
</style>
