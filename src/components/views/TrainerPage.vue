<template>
  <div class="Trainer-Page">
    <div>
      <TrainerNavbar />
    </div>
    <!-- v-if is used to render client information or trainer information selectively on the same page -->
    <!-- if the trainer clicks on a specific client, we update clientEmailToRender and refresh the page with 
         the client information with the email pass to clientEmailToRender -->
    <div v-if="!user.clientEmail" class="header1">YOUR CLIENTS</div>
    <div v-if="!user.clientEmail" class="client-cards-container">
      <div
        v-for="(clientInfo, clientEmail) in clientInfo"
        class="box"
        :key="refreshCount"
      >
        <div class="client-card" @click="setEmailToRender(clientEmail)">
          <div class="profile-pic">
            <img :src="clientInfo[3]" alt="DP" />
          </div>
          <div class="Name">
            {{ clientInfo[0] }}
          </div>
          <div class="session-routine">
            <div>
              <h3 class="Session">
                <div class="red-text upper">Next Session:</div>
                <div class="red-text lower">Routine:</div>
              </h3>
            </div>
            <div class="filler">
              <div>_</div>
              <div>_</div>
            </div>
            <div>
              <h3 class="Routine">
                <div class="white-text upper">
                  {{ clientInfo[1] ? clientInfo[1] : "No Upcoming Session" }}
                </div>
                <div class="white-text lower">
                  {{ clientInfo[2] ? clientInfo[2] : "No Upcoming Routine" }}
                </div>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="user.clientEmail">
      <!-- ClientPerformance listens for the returnToHome event
             when this occurs, we remove the current client email that is rendered 
             we then render everything again using the :key attribute -->
      <ClientPerformance
        :clientEmail="user.clientEmail"
        :key="refreshCount"
        @returnToHome="removeEmailToRender()"
      />
    </div>
  </div>
</template>

<script>
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase.js";
import { mapGetters } from "vuex";
import { ref, getStorage, getDownloadURL, list } from "@firebase/storage";
import TrainerNavbar from "../trainer/TrainerNavbar.vue";
import ClientPerformance from "../trainer/ClientPerformance.vue";
import defaultPic from "../../assets/images/default_dp.svg";

export default {
  name: "TrainerComponent",
  components: {
    TrainerNavbar,
    ClientPerformance,
  },
  data() {
    return {
      clients: null,
      clientInfo: null,
      refreshCount: 0, // helps to update components when there are state changes
    };
  },
  methods: {
    // this method helps to render components
    refreshPage() {
      this.refreshCount++;
    },
    // this method helps to set the specific client information to render
    setEmailToRender(email) {
      this.$store.dispatch("setClientEmail", email);
      this.refreshPage();
    },
    // this method helps to remove the specific client information to render when the trainer clicks back
    removeEmailToRender() {
      this.$store.dispatch("setClientEmail", null);
      this.refreshPage();
    },
  },
  props: {
    email: String,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.$store.dispatch("fetchUser", user);
    });
  },
  async created() {
    try {
      // Gets the trainer collection
      const trainerRef = collection(db, "trainer");
      const q = query(trainerRef, where("email", "==", this.user.data.email));
      const querySnapshot = await getDocs(q);
      // Retrieve the client emails associated with this trainer
      querySnapshot.forEach((doc) => {
        let documentData = doc.data();
        let clientIds = documentData.ClientsId;
        this.clients = clientIds;
      });

      const clientInfo = {};

      // Gets the client collection
      const clientRef = collection(db, "client");
      // Retreive only client documents that are under this trainer
      const q2 = query(clientRef, where("email", "in", this.clients));
      const querySnapshot2 = await getDocs(q2);
      // querying for the client information from the client table
      querySnapshot2.forEach((clientEmail) => {
        let documentData2 = clientEmail.data();
        // array to store required client information
        let currClient = [];
        currClient.push(documentData2.fullName);
        currClient.push(documentData2.emergencyContactNo);
        currClient.push(documentData2.emergencyContactName);
        currClient.push(defaultPic);
        // putting current client info into the clientInfo object
        clientInfo[documentData2.email] = currClient;
      });

      // Storing image URLs
      const storage = getStorage();
      const listRef = ref(storage);

      list(listRef).then((res) => {
        res.items.forEach((imageRef) => {
          const email = imageRef._location.path;
          if (clientInfo[email]) {
            getDownloadURL(imageRef).then((url) => {
              clientInfo[email][3] = url;
            });
          }
        });
      });

      // assign all client information to the variable clientInfo
      this.clientInfo = clientInfo;
    } catch (error) {
      // error handling
      console.log(error);
      console.log("No email observed in database");
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@600&display=swap");

.Trainer-Page {
  background-color: black;
  overflow-y: hidden;
  min-width: 800px;
  padding-bottom: 50px;
  min-height: 100vh;
  font-family: Teko;
}
.header1 {
  color: white;
  margin: 40px 200px 20px 200px;
  border-bottom: 5px solid white;
  font-size: 3.5rem;
}

.filler {
  color: transparent;
}
.client-card {
  display: flex;
  justify-content: space-between;
  margin: 40px;
}

.client-cards-container {
  height: calc(100vh - 400px);
  overflow: auto;
  box-sizing: border-box;
}

.client-cards-container::-webkit-scrollbar {
  display: none;
}
.box {
  flex: 2;
  background-color: #4b4a4a;
  border-radius: 25px;
  margin: 20px 200px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 3px solid transparent;
  z-index: 2;
  animation-fill-mode: forwards;
}

.box:hover {
  animation-name: client-highlighting;
  animation-duration: 0.2s;
  box-sizing: border-box;
  cursor: pointer;
}

.Session {
  text-align: right;
  font-size: 1.5rem;
}

.upper {
  padding-bottom: 20px;
}
.session-routine {
  font-family: "Source Sanr Pro", sans-serif;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 50px;
  width: 400px;
}
.red-text {
  color: red;
}
.white-text {
  color: white;
}
.Name {
  margin-left: 50px;
  font-size: 55px;
  font-weight: bold;
  color: white;
}
.Routine {
  text-align: left;
  font-size: 1.5rem;
  color: white;
  margin-left: auto;
}

.profile-pic img {
  width: auto;
  height: 120px;
  border-radius: 50%;
}

@keyframes client-highlighting {
  from {
    border: 3px solid transparent;
  }
  to {
    border: 3px solid white;
  }
}
</style>
