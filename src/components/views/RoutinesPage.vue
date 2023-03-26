<template>
    <div class="routines-page">
      <div>
        <Navbar />
      </div>
      <RoutineHeader />
      <div class="content-container">
        <button @click="showRoutineModal()" id="new-routine">Create New Routine</button>
        <div style="padding-top: 2em;">
            <tr>
                <th style="padding-right: 5em; padding-left: 1em;">ROUTINE CREATOR</th>
                <th style="padding-right: 30em;">ROUTINE NAME</th>
                <th style="padding-right: 10em;">EXERCISE TYPE</th>
                <th>ROUTINE DATE</th>
            </tr>
            <!-- list for each routine -->
        </div>
        <div class="popup">
            <RoutineModal v-show="routineModal" @close-modal="routineModal = false" />
        </div>

      </div>
    </div>
</template>

<script>
import { mapGetters, useStore } from "vuex";
import {db, auth} from "../../firebase.js"
import RoutineHeader from "../client/RoutineHeader.vue";
import RoutineModal from "../client/RoutineModal.vue";

export default {
    name: "RoutinesPage",
    computed: {
    ...mapGetters(["user"]),
    },
    data() {
        return {
        email: "",
        routineModal: false
        };
    },
    mounted() {
        const store = useStore();
        auth.onAuthStateChanged((user) => {
        store.dispatch("fetchUser", user);
        }); // whenever page refreshes, the auth will have a short buffer from unknown to signed in / signed out
    },
    async created() {
        this.email = this.user.data.email; // setting and passing the prop down to allcharts
        // const docRef = doc(db, "client", this.user.data.email);
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //   console.log("Document data:", docSnap.data());
        // } else {
        //   // doc.data() will be undefined in this case
        //   console.log("No such document!");
        // }
    },
    components: {
        RoutineHeader,
        RoutineModal
    },
    watch: {
        email(newEmail) {
        console.log(newEmail);
        },
    },
    methods: {
    showRoutineModal() {
      this.routineModal = true;
    }
  },
}
</script>

<style scoped>
.routines-page {
  background-color: black;
  overflow-y: hidden;
  min-width: 800px; /* Or else the PerformanceBottom component will overflow into the side margin */
  padding-bottom: 50px;
}

.content-container {
  background-color: #d9d9d9;
  margin: 0vw 10vw;
  border-radius: 25px;
  padding: 30px 60px;
  margin-top: 22px;
}

#new-routine {
    border-radius: 25px;
    background-color: #ED1F24;
    color: white;
    padding: 0.5em 1em;
    border: none;
}

th {
    font-weight: bold;
}

body::-webkit-scrollbar {
  display: none;
}
</style>