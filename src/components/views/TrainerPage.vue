<template>
<div class="Trainer-Page">
    <div>
        <TrainerNavbar />
    </div>
    <h1> Your clients</h1>

    <div v-for="(item, key) in clientinfo" class = "trying">
        <h3 class="Name">Name: {{ key }}</h3>
        <h3 class="Routine">Emergency contact Name: {{ item[1] }}</h3>
        <h3 class="Session">Emergency contact number: {{ item[0] }}</h3>
    </div>
</div>


</template>

<script>
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase.js";
import { useStore, mapGetters } from "vuex";
import TrainerNavbar from './TrainerNavbar.vue';

export default {
    name: "TrainerComponent",
    components: {TrainerNavbar},
    data() {
        return {
            clients: null,
            bookings: null,
            clientNames: null,
            clientinfo: null
        };
    },
    props: {
        email: String,
    },
    computed: {
        ...mapGetters(["user"]),
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

                let clientIds = documentData.ClientsId;
                let BookingIds = documentData.bookingIds;

                this.clients = clientIds;
                this.bookings = BookingIds;
            });
            const clientList = [];
            const clientInfo = {};
            const clientRef = collection(db, "client");
            const q2 = query(clientRef, where("email", "in", this.clients));
            const querySnapshot2 = await getDocs(q2);

            querySnapshot2.forEach((clientEmail) => {
                let documentData2 = clientEmail.data();
                let holder = [];
                clientList.push(documentData2.fullName);
                holder.push(documentData2.emergencyContactNo);
                holder.push(documentData2.emergencyContactName);
                clientInfo[documentData2.fullName] = holder;
            })
            this.clientNames = clientList;
            this.clientinfo = clientInfo;
        } catch (error) {
            console.log(error);
            console.log("No email observed in database");
        }
    }
}
</script>
<style scoped>
.Trainer-Page {

}

.trying {
    flex: 2;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 25px;
    margin: 0px 20px 10px 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}
.Name {
    margin-left: 20px;
}
.Routine {
    text-align: right;
    margin-right: 20px;
}

.Session {
    text-align: right;
    margin-right: 20px;
}
</style>