<template>
  <div class="performance-page">
    <div>
      <Navbar />
    </div>
    <PerformanceHeader />
    <div class="content-container">
      <AllCharts :email="email" />
      <PerformanceBottom />
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div v-if="user.loggedIn" class="alert alert-success" role="alert">
            Welcome, {{ user.data.email }} <br /><br />
            You are logged in!
          </div>
          <div v-else class="alert alert-danger" role="alert">
            You are not logged in!
          </div>
        </div>
      </div>
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
  async updated() {
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
};
</script>

<style scoped>
.performance-page {
  background-color: black;
  overflow-y: hidden;
  min-width: 800px; /* Or else the PerformanceBottom component will overflow into the side margin */
}

.content-container {
  background-color: #d9d9d9;
  margin: 0vw 10vw;
  border-radius: 25px;
}

body::-webkit-scrollbar {
  display: none;
}
</style>
