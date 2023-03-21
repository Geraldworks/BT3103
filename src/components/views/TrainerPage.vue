<template>
<div class="Trainer-Page">
    <div>
        <TrainerNavbar />
    </div>
    <h1 class="header1"> Your clients</h1>
    <hr>

    <div v-for="(item, key) in clientinfo" class = "box">
        <h3 class="Session">
            <span class="red-text">Session:</span> 
            <span class="white-text">{{ item[1] }}</span>
        </h3>

        <router-link :to='{ name: "ClientPerformancePage", params: { clientEmail: "key" } }'>
            <h3 class="Name">Name: {{ item[0] }}</h3>
        </router-link>
        <h3 class="Name">Name: {{ key }}</h3>
        
        <h3 class="Routine">
            <span class="red-text">Routine:</span> 
            <span class="white-text">{{ item[2] }}</span>
        </h3>
    </div>
</div>


</template>

<script>
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase.js";
import { useStore, mapGetters } from "vuex";
import TrainerNavbar from '../trainer/TrainerNavbar.vue';

export default {
    name: "TrainerComponent",
    components: {TrainerNavbar},
    data() {
        return {
            clients: null,
            bookings: null,
            clientemails: null,
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
            const clientInfo = {};

            const clientRef = collection(db, "client");
            const q2 = query(clientRef, where("email", "in", this.clients));
            const querySnapshot2 = await getDocs(q2);

            querySnapshot2.forEach((clientEmail) => {
                let documentData2 = clientEmail.data();
                let holder = [];
                holder.push(documentData2.fullName);
                holder.push(documentData2.emergencyContactNo); // push the session instead
                holder.push(documentData2.emergencyContactName); // push the rountine 
                clientInfo[documentData2.email] = holder;
            })
            // this.clientemails = clientEmails;
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
    background-color: black;
    overflow-y: hidden;
    min-width: 800px; 
    padding-bottom: 50px;
    min-height: 100vh;
}
hr {
    background-color: rgb(255, 255, 255);
    border: 3px solid rgb(255, 255, 255);

}
.header1 {
    color:white;
    margin-left:40px;
}
.box {
    flex: 2;
    background-color: #4b4a4a;
    border-radius: 25px;
    margin: 0px 20px 10px 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    z-index: 2;
}
.Session {
    text-align: right;
    margin-right: 70px;
    margin-top: 20px;
    font-size: 1.5rem;
}
.red-text {
    color:red;
}
.white-text {
    color:white;
}
.Name {
    margin-left: 30px;
    margin-top: 10px;
    font-size: 2.25rem;
    font-weight: bold;
    color:white;
}
.Routine {
    text-align: right;
    margin-right: 70px;
    margin-bottom: 20px;
    font-size: 1.5rem;
    color:white;
}
</style>