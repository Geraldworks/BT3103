<template>
<div>
    <NavBar />
</div>
<h1> Your clients</h1>
<h1>{ trainer }</h1>
<div>

</div>

</template>
<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    name: "TrainerComponent",
    setup() {
        const store = useStore();
        const user1 = computed(() => {
            return store.getters.user;
        });
    
        // const docRef1 = doc(db, "client", 'dbtest@gmail.com');
        // const docSnap = await getDoc(docRef1);
        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data().bookingIds);
        // } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        // }
        let trainer = await db.collection('trainer').get()
        return {trainer}
        return { user1 };

    } 
}
</script>