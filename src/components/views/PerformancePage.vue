<template>
  <div class="performance-page">
    <div>
      <Navbar />
    </div>
    <PerformanceHeader />
    <div class="content-container">
      <AllCharts :email="email" />
      <PerformanceBottom class="bottom" :email="email" />
    </div>
  </div>
</template>

<script>
import { mapGetters, useStore } from "vuex";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import AllCharts from "../AllCharts.vue";
import PerformanceBottom from "./PerformanceBottom.vue";
import PerformanceHeader from "../PerformanceHeader.vue";

export default {
  name: "PerformancePage",
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      email: "",
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
    AllCharts,
    PerformanceBottom,
    PerformanceHeader,
  },
  watch: {
    email(newEmail) {
      console.log(newEmail);
    },
  },
};
</script>

<style scoped>
.performance-page {
  background-color: black;
  overflow-y: hidden;
  min-width: 800px; /* Or else the PerformanceBottom component will overflow into the side margin */
  padding-bottom: 50px;
}

.content-container {
  background-color: #d9d9d9;
  margin: 0vw 10vw;
  border-radius: 25px;
  padding-bottom: 30px;
  margin-top: 22px;
}

body::-webkit-scrollbar {
  display: none;
}
</style>
