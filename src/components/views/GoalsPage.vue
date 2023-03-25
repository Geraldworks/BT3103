<template>
  <Navbar />
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card background-color-change">
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
                  <button type="submit" class="btn btn-primary mt-2">
                    <div
                      v-if="isLoading"
                      class="spinner-border spinner-border-sm"
                    ></div>
                    Set
                  </button>
                </div>
              </div>
            </form>
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

export default {
  name: "GoalsPage",
  data() {
    return {
      muscleMassGoal: "",
      weightGoal: "",
      isLoading: false,
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.$store.dispatch("fetchUser", user);
    });

    const clientRef = doc(db, "client", this.user.data.email);
    getDoc(clientRef)
      .then((docSnap) => {
        const goals = docSnap.data().goals;
        this.muscleMassGoal = goals.muscleMassGoal;
        this.weightGoal = goals.weightGoal;
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
        this.errorMessage = "Please key in positive values only!"
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
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
