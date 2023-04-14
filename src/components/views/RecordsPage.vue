<template>
  <div class="records-page">
    <div>
      <Navbar />
    </div>
    <!-- If page still loading -->
    <LoadingSpinner v-if="pageLoading" :pageLoading="pageLoading" />

    <!-- If page done loading -->
    <div v-else class="container">
      <div class="row display-words">
        <div>EDIT RECORDS</div>
      </div>
      <!-- Input fields to update personal records -->
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card background-color-change border-0">
            <div class="card-body">
              <form action="#" @submit.prevent="update">
                <!-- Bench Press Personal Best -->
                <div class="form-group row py-2">
                  <label
                    for="benchPress"
                    class="col-md-4 col-form-label text-md-right"
                    >BENCH PRESS:</label
                  >

                  <div class="col-md-6">
                    <input
                      id="benchPress"
                      type="text"
                      class="form-control"
                      name="benchPress"
                      value
                      required
                      autofocus
                      v-model="benchPress"
                    />
                  </div>
                </div>
                
                <!-- Deadlift Personal Best -->
                <div class="form-group row py-2">
                  <label
                    for="deadlift"
                    class="col-md-4 col-form-label text-md-right"
                    >DEADLIFT:</label
                  >

                  <div class="col-md-6">
                    <input
                      id="deadlift"
                      type="text"
                      class="form-control"
                      name="deadlift"
                      required
                      v-model="deadlift"
                    />
                  </div>
                </div>

                <!-- Squat Personal Best -->
                <div class="form-group row py-2">
                  <label
                    for="squat"
                    class="col-md-4 col-form-label text-md-right"
                    >SQUAT:</label
                  >

                  <div class="col-md-6">
                    <input
                      id="squat"
                      type="text"
                      class="form-control"
                      name="squat"
                      required
                      v-model="squat"
                    />
                  </div>
                </div>

                <!-- Error Message shown after validation -->
                <p v-if="errorMessage" class="alert alert-danger mt-3">
                  {{ errorMessage }}
                </p>

                <!-- Save Changes Button -->
                <div class="form-group row mb-0">
                  <div class="button-div">
                    <button type="submit">
                      <div
                        v-if="isLoading"
                        class="spinner-border spinner-border-sm"
                      ></div>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import LoadingSpinner from "../LoadingSpinner.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

// an object to create the alerts
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export default {
  name: "GoalsPage",
  data() {
    return {
      benchPress: "",
      deadlift: "",
      squat: "",
      isLoading: false,
      errorMessage: "",
      pageLoading: false,
    };
  },
  components: { LoadingSpinner },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.pageLoading = true;
    auth.onAuthStateChanged((user) => {
      this.$store.dispatch("fetchUser", user);
    });
    
    // Gets the current information
    const clientRef = doc(db, "client", this.user.data.email);
    getDoc(clientRef)
      .then((docSnap) => {
        const records = docSnap.data().records;
        // Sets the current information to data variables to be shown to user
        this.benchPress = records.benchPress;
        this.deadlift = records.deadlift;
        this.squat = records.squat;
        this.pageLoading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    // Function to push the updated information into firestore
    async update() {
      const clientRef = doc(db, "client", this.user.data.email);
      if (
        // Validate that the values are not negative
        parseFloat(this.benchPress) < 0 ||
        parseFloat(this.deadLift) < 0 ||
        parseFloat(this.squat) < 0
      ) {
        this.errorMessage = "Please key in positive values only!";
      } else {
        this.isLoading = true;
        updateDoc(clientRef, {
          records: {
            benchPress: parseFloat(this.benchPress),
            deadlift: parseFloat(this.deadlift),
            squat: parseFloat(this.squat),
          },
        })
          .then((response) => {
            this.isLoading = false;
            this.errorMessage = "";
            // Feedback when records are updated
            Toast.fire({
              icon: "success",
              title: "Records Saved",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@600&display=swap");
.records-page {
  background-color: black;
  overflow-y: hidden;
  min-width: 100vw;
  min-height: 100vh;
}

.display-words {
  padding: 20px 10vw;
  margin: 0;
  justify-content: flex-start;
  font-family: Teko;
  background-color: black;
  color: white;
  font-size: 3rem;
  width: auto;
  flex: 2;
}

.display-words > div {
  border-bottom: 5px solid white;
}

.button-div {
  text-align: center;
}

.card-body {
  background-color: black;
  color: white;
}

button {
  width: 120px;
  height: 50px;
  border-radius: 25px; /* half of height */
  background-color: rgb(237, 12, 16);
  border: none;
  outline: none;
  cursor: pointer;
  margin: 5px;
  margin-top: 30px;
  font-size: 1.5rem;
  text-align: center;
  box-sizing: border-box;
  color: white;
  font-family: Teko;
}

button:hover {
  animation-name: pill-button-highlight;
  animation-duration: 0.15s;
  animation-fill-mode: forwards;
  box-sizing: border-box;
}

@keyframes pill-button-highlight {
  from {
    border: 0px white solid;
  }
  to {
    border: 2px white solid;
  }
}

.container {
  font-family: "Source Sans Pro", sans-serif;
  font-size: larger;
}

input {
  border: none;
  background-color: #d9d9d9;
  border-radius: 10px;
  padding: 10px;
}
</style>

