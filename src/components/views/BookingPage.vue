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
        @close-modal="cancelModal = false"
        @updateCalendar="refreshCalendarData()"
        :clientBookings="clientBookings"
      />
    </div>
    <div class="popup">
      <BookModal
        v-show="bookModal"
        @updateCalendar="refreshCalendarData()"
        @close-modal="bookModal = false"
        :allBookedSessions="dateToBookMappings"
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
      allBookings: [],
      dateToBookMappings: {},
      cancelModal: false,
      bookModal: false,
      minDate: minDate,
      maxDate: maxDate,
      events: [
        {
          start: "2023-03-27 14:00",
          end: "2023-03-27 16:00",
          title: "Gym Session",
          client: "dbtest@gmail.com",
          routine: "Test Routine 1",
        },
      ],
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
  async created() {
    // a container to store all bookings of this client
    let clientBookings = [];
    // a container to store all bookings of this client's trainer
    let allClientBookings = [];
    // track query bookings from firebase
    let bookingsFromFirebase = [];
    // track all day -> session slots
    let dateToBookMappings = {};

    // retrieving this client bookings
    const clientRef = collection(db, "client");
    const thisClientQuery = query(
      clientRef,
      where("email", "==", this.user.data.email)
    );
    const clientQuerySnapshot = await getDocs(thisClientQuery);
    clientQuerySnapshot.forEach((doc) => {
      bookingsFromFirebase = doc.data().bookings;
      // getting the trainer email from this snapshot
      this.clientTrainer = doc.data().trainerEmail;
    });
    bookingsFromFirebase.forEach((booking) => {
      /* Quick fix to client cancellation of bookings */
      // let start = booking.from.toDate();
      // let end = booking.to.toDate();
      // let title = booking.title;
      // clientBookings.push({ start, end, title });
      clientBookings.push(booking);
    });
    this.clientBookings = clientBookings;
    // console.log(this.clientBookings);
    // end of client data

    // getting all trainer's clients emails
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

    // allOtherClients = allOtherClients.filter((email) => {
    //   return email !== this.user.data.email;
    // });

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
      // setting to the component
      this.dateToBookMappings = dateToBookMappings;
      this.events = allClientBookings;
    });
    // successfully created the necessary data
    // console.log(clientBookings);
    // console.log(dateToBookMappings);
    // console.log(allClientBookings);
  },
  methods: {
    showCancelModal() {
      this.cancelModal = true;
    },
    showBookModal() {
      this.bookModal = true;
    },
    async refreshCalendarData() {
      // a container to store all bookings of this client
      let clientBookings = [];
      // a container to store all bookings of this client's trainer
      let allClientBookings = [];
      // track query bookings from firebase
      let bookingsFromFirebase = [];
      // track all day -> session slots
      let dateToBookMappings = {};

      // retrieving this client bookings
      const clientRef = collection(db, "client");
      const thisClientQuery = query(
        clientRef,
        where("email", "==", this.user.data.email)
      );
      const clientQuerySnapshot = await getDocs(thisClientQuery);
      clientQuerySnapshot.forEach((doc) => {
        bookingsFromFirebase = doc.data().bookings;
        // getting the trainer email from this snapshot
        this.clientTrainer = doc.data().trainerEmail;
      });
      bookingsFromFirebase.forEach((booking) => {
        /* Quick fix to client cancellation for now */
        // let start = booking.from.toDate();
        // let end = booking.to.toDate();
        // let title = booking.title;
        // clientBookings.push({ start, end, title });
        clientBookings.push(booking)
      });
      this.clientBookings = clientBookings;
      // end of client data

      // getting all trainer's clients emails
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

      // allOtherClients = allOtherClients.filter((email) => {
      //   return email !== this.user.data.email;
      // });

      // getting all bookings for all clients
      const allClientQuery = query(clientRef, where("email", "in", allClients));
      const allClientQuerySnapshot = await getDocs(allClientQuery);
      allClientQuerySnapshot.forEach((client) => {
        client.data().bookings.forEach((doc) => {
          // each iteration gets one bookings from all the other clients
          let start = doc.from.toDate();
          let end = doc.to.toDate();
          let title = doc.title;
          if (client.data().email != this.user.data.email) {
            let obj = { start, end, title };
            obj["class"] = "otherClient";
            obj["title"] = "Other Clients";
            allClientBookings.push(obj);
          } else {
            allClientBookings.push({ start, end, title });
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
        // setting to the component
        this.dateToBookMappings = dateToBookMappings;
        this.events = allClientBookings;
      });
      // update the calendar
      this.key++;
    },
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
