<template>
  <div class="profile-container">
    <!--Profile Picture-->
    <img
      class="profile-picture"
      src="@/assets/images/test.jpeg"
      alt="profile picture"
    />
    <div class="your-profile">
      <div class="trainer-options">
        <div>
          Viewing <span style="color: #ed1f24">{{ clientName }}</span>
        </div>
        <!-- If we detect that the trainer wants to return, we will emit "refresh" to 
           go back to the page with all the client cards-->
        <div class="right-side-items" @click="returnBackToTrainerHomePage()">
          Return
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase.js";

export default {
  name: "TrainerPerformanceHeader",
  data() {
    return {
      clientName: null,
    };
  },
  props: {
    email: String,
  },
  methods: {
    returnBackToTrainerHomePage() {
      this.$emit("returnToHome");
    },
  },
  emits: ["returnToHome"],
  async created() {
    try {
      const clientRef = collection(db, "client");
      const q = query(clientRef, where("email", "==", this.email));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        let documentData = doc.data();
        let clientName = documentData.fullName;
        this.clientName = clientName;
      });
    } catch (error) {
      console.log(error);
      console.log("No email observed in database");
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");

.profile-container {
  padding: 20px 10vw;
  display: flex;
  justify-content: flex-start;
  font-family: Teko;
  background-color: black;
  color: white;
  background-image: url("@/assets/images/profile_bg.jpg");
  background-size: contain;
}

.profile-picture {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  border: 2px solid white;
}

.your-profile {
  font-size: 3rem;
  padding-left: 30px;
  width: 1000px;
  flex: 2;
  text-transform: uppercase;
}

.your-profile > div {
  border-bottom: 5px solid white;
}

.trainer-options {
  display: flex;
}
.right-side-items {
  margin-left: auto;
  font-size: 32px;
  margin-top: 16px;
}

.right-side-items:hover {
  display: inline;
  cursor: pointer;
  animation: turn-red;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
}

@keyframes turn-red {
  from {
    color: white;
  }
  to {
    color: #ed1f24;
  }
}
</style>
