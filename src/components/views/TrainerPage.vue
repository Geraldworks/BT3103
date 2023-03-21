<template>
<div>
    <TrainerNavbar />
</div>
<h1> Your clients</h1>
<h2> {{ bookingIds }}</h2>
<button> fetch data </button>
<div>

</div>

</template>
<script>
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase.js";
import { useStore, mapGetters } from "vuex";
import TrainerNavbar from '../trainer/TrainerNavbar.vue';

export default {
    name: "TrainerComponent",
    data() {
        return {
            clients: null,
            bookings: null
        };
    },
    props: {
        email: String,
    },
    computed: {
        ...mapGetters(["user"]),
    },
    components: {
        TrainerNavbar,
    },
    mounted() {
        const store = useStore();
        auth.onAuthStateChanged((user) => {
        store.dispatch("fetchUser", user);
        });
    },
    async created() {
        try {
            const trainerRef = collection(db, "trainer");
            const q = query(trainerRef, where("email", "==", this.user.data.email));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                let documentData = doc.data();

                let clientIds = document.ClientsId;
                let bookingIds = document.bookingIds;

                this.clients = clientIds;
                this.bookings = bookingsIds;
            });
        } catch (error) {
            console.log(error);
            console.log("No email observed in database");
        }
    }
}
</script>
