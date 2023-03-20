<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header text-center">
            <h3>SIGN IN TO ACCOUNT</h3>
          </div>
          <div class="card-body">
            <form action="#" @submit.prevent="SignIn">
              <div class="form-group row py-2">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >EMAIL:</label
                >

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="email"
                  />
                </div>
              </div>

              <div class="form-group row py-2">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-right"
                  >PASSWORD:</label
                >

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary mt-2">
                    <div
                      v-if="isLoading"
                      class="spinner-border spinner-border-sm"
                    ></div>
                    Sign In
                  </button>
                </div>
                <div v-if="error" class="alert alert-danger mt-2">
                  {{ error }}
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
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../firebase";

export default {
  name: "SignInComponent",
  data() {
    return {
      isLoading: false,
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async SignIn() {
      this.isLoading = true;
      try {
        await this.$store
          .dispatch("signIn", {
            email: email.value,
            password: password.value,
          })
          .then((response) => {
            // Fetch data to check if trainer
            const docRef = doc(db, "trainer", this.email);
            console.log(this.email);
            getDoc(docRef)
              .then((docSnap) => {
                const id = docSnap.data().gymmboxxid;
                if (id.includes("T")) {
                  // TRAINER ACCOUNT
                  console.log("TRAINER ACCOUNT");

                  // SET AS TRAINER
                  this.$store.dispatch("fetchTrainer"); 

                  this.$router.push("/clients");
                } 
              })
              .catch((err) => {
                // CLIENT ACCOUNT
                console.log("CLIENT ACCOUNT");
                
                this.$router.push("/performance");
              });
          });
      } catch (err) {
        this.isLoading = false;
        if (err.code === "auth/wrong-password") {
          this.error = "Incorrect password, please try again.";
        } else if (err.code === "auth/user-not-found") {
          this.error = "User not registered, please sign up with us.";
        } else {
          this.error = err.message;
        }
      }
    },
  },
};
</script>
