<template>
  <Navbar />
  <div class="booking-page">
    <div class="booking-page-header">
      Current Bookings
      <button @click="showCancelModal()">Cancel Booking</button>
      <button @click="showBookModal()">Make Booking</button>
    </div>
    <div class="popup">
      <CancelModal
        v-show="cancelModal"
        @removeBookings="updateBookModal"
        @setNewClientBookings="updateClientBookings"
        @close-modal="cancelModal = false"
        :clientBookings="clientBookings"
        :newBookings="newBookingsFromBookModal"
      />
    </div>
    <div class="popup">
      <BookModal
        v-show="bookModal"
        @addBookings="updateCancelModal"
        @close-modal="bookModal = false"
        :allBookedSessions="dateToBookMappings"
        :cancelledBookings="cancelledBookingsFromCancelModal"
      />
    </div>
    <div
      style="
        height: 800px;
        width: 85%;
        margin: auto;
        padding: 50px;
        text-align: center;
      "
    >
      <vue-cal
        :key="key"
        class="calendar"
        active-view="month"
        :disable-views="['years', 'year', 'day']"
        :time-from="9 * 60"
        :time-to="20 * 60"
        :time-step="60"
        :events="events"
        :editable-events="{
          title: false,
          drag: false,
          resize: false,
          delete: false,
          create: false,
        }"
        :snap-to-time="60"
        :timeCellHeight="70"
        :min-date="minDate"
        :max-date="maxDate"
        events-count-on-year-view
      >
      </vue-cal>
    </div>
  </div>
</template>

<script>
import VueCal from "vue-cal";
import BookModal from "../client/BookModal.vue";
import CancelModal from "../client/CancelModal.vue";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase.js";
import { mapGetters } from "vuex";
import "vue-cal/dist/vuecal.css";

const minDate = new Date();
let maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 3);

export default {
  name: "BookingPage",
  data() {
    return {
      key: 0,
      clientTrainer: "",
      clientBookings: [],
      newBookingsFromBookModal: [],
      cancelledBookingsFromCancelModal: [],
      allBookings: [],
      dateToBookMappings: {},
      cancelModal: false,
      bookModal: false,
      minDate: minDate,
      maxDate: maxDate,
      events: [],
    };
  },
  components: {
    VueCal,
    BookModal,
    CancelModal,
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
  // first fetch of information
  async created() {
    // a container to store all bookings of this client
    let clientBookings = [];
    // a container to store all bookings of this client's trainer
    let allClientBookings = [];
    // track query bookings from firebase
    let bookingsFromFirebase = [];
    // track all day -> session slots
    let dateToBookMappings = {};

    // retrieving this client's bookings
    const clientRef = collection(db, "client");
    const thisClientQuery = query(
      clientRef,
      where("email", "==", this.user.data.email)
    );
    const clientQuerySnapshot = await getDocs(thisClientQuery);
    clientQuerySnapshot.forEach((doc) => {
      // get the bookings field from this client
      bookingsFromFirebase = doc.data().bookings;
      // get the trainer email to get all client emails
      this.clientTrainer = doc.data().trainerEmail;
    });
    // after getting all bookings of this client, modify it to be used by cancel modal
    bookingsFromFirebase.forEach((booking) => {
      clientBookings.push({
        title: booking.title,
        focus: booking.focus,
        from: booking.from.toDate(),
        to: booking.from.toDate(),
      });
    });
    this.clientBookings = clientBookings;

    // getting all client emails associated with the current trainer
    const trainerRef = collection(db, "trainer");
    const trainerQuery = query(
      trainerRef,
      where("email", "==", this.clientTrainer)
    );

    // a storage for all client emails
    let allClients = [];
    const trainerQuerySnapshot = await getDocs(trainerQuery);
    trainerQuerySnapshot.forEach((doc) => {
      allClients = doc.data().ClientsId;
    });

    // getting all bookings for all clients
    const allClientQuery = query(clientRef, where("email", "in", allClients));
    const allClientQuerySnapshot = await getDocs(allClientQuery);
    allClientQuerySnapshot.forEach((client) => {
      client.data().bookings.forEach((doc) => {
        // each iteration gets one bookings from all the other clients
        let start = doc.from.toDate();
        let end = doc.to.toDate();
        let title = doc.title;
        let obj = { start, end, title };
        // setting the class attribute for each booking
        if (client.data().email != this.user.data.email) {
          obj["class"] = "otherClient unclickable";
          obj["title"] = "Other Clients";
          allClientBookings.push(obj);
        } else {
          obj["class"] = "unclickable";
          allClientBookings.push(obj);
        }

        // data pivoting on each booking
        let month = start.getMonth();
        let day = start.getDate();
        let startHour = start.getHours();

        if (dateToBookMappings.hasOwnProperty(`${day}, ${month}`)) {
          dateToBookMappings[`${day}, ${month}`].push(startHour);
        } else {
          dateToBookMappings[`${day}, ${month}`] = [startHour];
        }
      });
      // this is the initial set of bookings when the booking component is rendered
      this.dateToBookMappings = dateToBookMappings;
      this.events = allClientBookings;
    });
  },
  watch: {
    // if new bookings are made, i will display more information on the calendar
    newBookingsFromBookModal(newBookings) {
      newBookings.forEach((x) => {
        this.events.push({
          start: x.from,
          end: x.to,
          title: x.title,
          class: "unclickable",
        });
      });
      this.key++;
    },
    // if bookings are cancelled, i will remove these events from the calendar
    cancelledBookingsFromCancelModal(cancelledBookings) {
      cancelledBookings.forEach((x) => {
        this.events = this.events.filter((y) => {
          return (x["from"].getTime() !== y["start"].getTime());
        });
      });
      this.key++;
    },
  },
  methods: {
    showCancelModal() {
      this.cancelModal = true;
    },
    showBookModal() {
      this.bookModal = true;
    },
    // pass the new bookings over to cancel modal to be able to cancel more bookings
    updateCancelModal(newBookings) {
      this.newBookingsFromBookModal = newBookings;
    },
    // pass the cancel bookings over to book modal to be able to make more bookings
    updateBookModal(cancelledBookings) {
      this.cancelledBookingsFromCancelModal = cancelledBookings;
    },
    // pass the client bookings over to cancel modal to be able to make more bookings
    updateClientBookings(newClientBookings) {
      this.clientBookings = newClientBookings;
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");

.booking-page-header {
  color: white;
  border-bottom: 5px white solid;
  font-size: 3rem;
  text-transform: uppercase;
  width: 80%;
  margin: auto;
  padding-top: 20px;
}
.booking-page {
  background-color: black;
  min-height: 100vh;
  font-family: Teko;
  min-width: 1100px;
}

.calendar {
  background-color: white;
  font-family: Teko;
  font-size: 1.2rem;
}
</style>
