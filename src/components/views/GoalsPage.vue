<template>
  <div class="goals-page">
    <div>
      <Navbar />
    </div>

    <LoadingSpinner v-if="pageLoading" :pageLoading="pageLoading"/>

    <div v-else class="container">
      <div class="row display-words">
        <div>GOALS</div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card background-color-change border-0">
            <div class="card-body">
              <form action="#" @submit.prevent="update">
                <div class="form-group row py-2">
                  <label
                    for="muscleMassGoal"
                    class="col-md-4 col-form-label text-md-right"
                    >MUSCLE MASS GOAL:</label
                  >

                  <div class="col-md-6">
                    <input
                      id="muscleMassGoal"
                      type="text"
                      class="form-control"
                      name="muscleMassGoal"
                      value
                      required
                      autofocus
                      v-model="muscleMassGoal"
                    />
                  </div>
                </div>

                <div class="form-group row py-2">
                  <label
                    for="weightGoal"
                    class="col-md-4 col-form-label text-md-right"
                    >WEIGHT GOAL:</label
                  >

                  <div class="col-md-6">
                    <input
                      id="weightGoal"
                      type="text"
                      class="form-control"
                      name="weightGoal"
                      required
                      v-model="weightGoal"
                    />
                  </div>
                </div>

                <p v-if="errorMessage" class="alert alert-danger mt-3">
                  {{ errorMessage }}
                </p>

                <div class="form-group row mb-0">
                  <div class="button-div">
                    <button type="submit" class="btn btn-primary mt-6">
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

export default {
  name: "GoalsPage",
  data() {
    return {
      muscleMassGoal: "",
      weightGoal: "",
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

    const clientRef = doc(db, "client", this.user.data.email);
    getDoc(clientRef)
      .then((docSnap) => {
        const goals = docSnap.data().goals;
        this.muscleMassGoal = goals.muscleMassGoal;
        this.weightGoal = goals.weightGoal;
        this.pageLoading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    async update() {
      const clientRef = doc(db, "client", this.user.data.email);
      if (
        parseFloat(this.muscleMassGoal) < 0 ||
        parseFloat(this.weightGoal) < 0
      ) {
        this.errorMessage = "Please key in positive values only!";
      } else {
        this.isLoading = true;
        updateDoc(clientRef, {
          goals: {
            muscleMassGoal: parseFloat(this.muscleMassGoal),
            weightGoal: parseFloat(this.weightGoal),
          },
        })
          .then((response) => {
            // some sort of feedback to show that it's done here
            this.isLoading = false;
            this.errorMessage = "";
            location.reload();
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
.goals-page {
  background-color: black;
  overflow-y: hidden;
  min-width: 100vh;
  min-height: 100vh;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
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
  width: 300px;
}
</style>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
}
</style>
