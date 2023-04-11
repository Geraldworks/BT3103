<template>
  <div class="Trainer-Page">
    <TrainerNavbar v-if="!user.displayRoutines && !user.clientEmail" />
    <!-- v-if is used to render client information or trainer information selectively on the same page -->
    <!-- if the trainer clicks on a specific client, we update clientEmailToRender and refresh the page with 
         the client information with the email pass to clientEmailToRender -->
    <!-- Displaying the client's routine page if the trainer clicks on the Routine button -->
    <div v-if="user.displayRoutines && user.clientEmail">
      <ClientRoutine
        :email="user.clientEmail"
        :userFullName="trainerFullName"
        :profilePicURL="user.clientInfo[clientEmail][1]"
        @returnToHome="removeEmailToRender()"
        @routeToPerformance="renderPerformance()"
      />
    </div>
    <!-- Displaying the specific client performance page -->
    <div v-else-if="user.clientEmail">
      <!-- ClientPerformance listens for the returnToHome event
             when this occurs, we remove the current client email that is rendered 
             we then render everything again using the :key attribute -->
      <ClientPerformance
        :clientEmail="user.clientEmail"
        :profilePicURL="user.clientInfo[clientEmail][1]"
        :key="refreshCount"
        @returnToHome="removeEmailToRender()"
        @routeToRoutine="setDisplayRoutine()"
      />
    </div>
    <!-- Displaying the original client selection screen -->
    <div v-else>
      <div v-if="isLoading">
        <LoadingSpinner :pageLoading="isLoading"></LoadingSpinner>
      </div>
      <div v-else>
        <div class="header1">YOUR CLIENTS</div>
        <div class="client-cards-container">
          <div
            v-for="(clientInfo, clientEmail) in clientInfo"
            class="box"
            :key="refreshCount"
            @click="setEmailToRender(clientEmail)"
          >
            <div class="client-card">
              <div class="image-name">
                <div class="profile-pic">
                  <img :src="user.clientInfo[clientEmail][1]" alt="DP" />
                </div>
                <div class="Name">
                  {{ clientInfo[0].split(" ")[0] }}
                </div>
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
                      {{
                        clientInfo[2][0]
                          ? formatDate(clientInfo[2][0]["from"])
                          : "No Upcoming Session"
                      }}
                    </div>
                    <div class="white-text lower">
                      {{
                        clientInfo[2][0]
                          ? clientInfo[2][0]["focus"]
                          : "No Upcoming Routine"
                      }}
                    </div>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import ClientRoutine from "../trainer/ClientRoutine.vue";
import defaultPic from "../../assets/images/default_dp.svg";
import LoadingSpinner from "../LoadingSpinner.vue";

export default {
  name: "TrainerComponent",
  components: {
    TrainerNavbar,
    ClientPerformance,
    ClientRoutine,
    LoadingSpinner,
  },
  data() {
    return {
      clients: null,
      clientInfo: null,
      refreshCount: 0, // helps to update components when there are state changes,
      trainerFullName: null,
      emailToRender: "", // client email to render for the routines
      isLoading: true,
      // clientEmailToRender: false, // helps to know which page to render
      // isDisplayRoutines: false, // helps to know which page to render
    };
  },
  watch: {
    clientInfo(newClientInfo) {
      console.log("NEW CLIENT INFO")
      console.log(newClientInfo);
    }
  },
  methods: {
    // this method helps to render components
    refreshPage() {
      this.refreshCount++;
    },
    // this method helps to set the specific client information to render
    setEmailToRender(email) {
      this.$store.dispatch("setClientEmail", email);
      //this.clientEmailToRender = true;
      this.refreshPage();
    },
    // this method helps to remove the specific client information to render when the trainer clicks back
    removeEmailToRender() {
      this.$store.dispatch("setClientEmail", null);
      this.$store.dispatch("setDisplayRoutinesStatus", false);
      //this.isDisplayRoutines = false;
      //this.clientEmailToRender = false;
      this.refreshPage();
    },
    setDisplayRoutine() {
      this.$store.dispatch("setDisplayRoutinesStatus", true);
      this.refreshPage();
      //this.isDisplayRoutines = true;
    },
    renderPerformance() {
      //this.isDisplayRoutines = false;
      this.$store.dispatch("setDisplayRoutinesStatus", false);
      this.refreshPage();
    },
    // this comparator method helps to compare the date for the bookings
    comparatorForTime(bookingOne, bookingTwo) {
      if (bookingOne.from < bookingTwo.from) {
        return -1;
      } else if (bookingOne.from > bookingTwo.from) {
        return 1;
      }
      return 0;
    },
    formatDate(timestamp) {
      const date = timestamp.toDate();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      };
      return date.toLocaleString("en-US", options);
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
        let trainerName = documentData.fullName;
        this.trainerFullName = trainerName;
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
        //searching for the next session
        const bookings = documentData2.bookings;
        const sortedBookings = bookings.sort(this.comparatorForTime);

        // pushing the information into the list to store
        currClient.push(documentData2.fullName);
        currClient.push(defaultPic);
        currClient.push(sortedBookings);
        currClient.push(documentData2.email);
        // putting current client info into the clientInfo object
        clientInfo[documentData2.email] = currClient;
      });

      // Storing image URLs
      const storage = getStorage();
      const listRef = ref(storage);

      list(listRef)
        .then((res) => {
          res.items.forEach((imageRef) => {
            const email = imageRef._location.path.slice(0, -4);
            if (clientInfo[email]) {
              getDownloadURL(imageRef).then((url) => {
                clientInfo[email][1] = url;
              });
            }
          });
        })
        .then(() => {
          // assign all client information to the variable clientInfo
          if (this.user.clientInfo == null) {
            this.$store.dispatch("setClientInfo", clientInfo);
          }
          // console.log(this.user);
          this.clientInfo = clientInfo;
          this.isLoading = false;
        });
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
  min-width: 100vw;
  padding-bottom: 50px;
  min-height: 100vh;
  font-family: Teko;
}
.header1 {
  color: white;
  border-bottom: 5px white solid;
  font-size: 3rem;
  text-transform: uppercase;
  width: 70vw;
  margin: auto;
  padding-top: 20px;
  margin-bottom: 20px;
}
.image-name {
  display: flex;
  align-items: center;
  justify-content: center;
}

.filler {
  color: transparent;
}
.client-card {
  display: flex;
  justify-content: space-between;
  margin: 40px;
  flex-wrap: wrap;
}

.client-cards-container {
  overflow: auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  max-height: 55vh;
}

@media screen and (max-width: 1200px) {
  .image-name {
    margin-bottom: 15px;
  }
  .client-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .session-routine {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .Session {
    text-align: center;
  }

  .Routine {
    text-align: center;
  }
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
  width: 70vw;
}

.box:hover {
  animation-name: client-highlighting;
  animation-duration: 0.2s;
  box-sizing: border-box;
  cursor: pointer;
}

.Session {
  text-align: right;
  font-size: 100%;
  font-size: 1.2rem;
}

.upper {
  padding-bottom: 30px;
}
.session-routine {
  font-family: "Source Sanr Pro", sans-serif;
  display: flex;
  align-items: center;
  margin-right: 40px;
}
.red-text {
  color: red;
}
.white-text {
  color: white;
}
.Name {
  margin-left: 50px;
  font-size: 3.2rem;
  font-weight: bold;
  color: white;
}
.Routine {
  text-align: left;
  font-size: 1.2rem;
  color: white;
  margin-left: auto;
}

.profile-pic img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px white solid;
  object-fit: cover;
}

@keyframes client-highlighting {
  from {
    border: 3px solid transparent;
  }
  to {
    border: 3px solid white;
  }
}
@media (max-width: 600px) {
  .profile-pic {
    display: none;
  }

  .Name {
    margin: 0px;
    padding: 0px;
    position: relative;
    font-size: 2.5rem;
  }

  .session-routine {
    padding: 0px;
    margin: 0px;
  }
  .red-text,
  .white-text {
    font-size: 12px;
  }

  .client-card {
    margin: 20px;
  }
}
</style>
