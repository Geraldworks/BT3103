<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");
.button-div {
  text-align: center;
}

button {
  width: 120px;
  height: 50px;
  border-radius: 25px; /* half of height */
  background-color: rgb(237, 12, 16);
  border: none;
  outline: none;
  cursor: pointer;
  margin: 30px;
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

.signIn-page {
  min-width: 100vw;
  min-height: 100vh;
  background-color: #d9d9d9;
  position: relative;
  overflow: auto;
}

.background-color-change {
  background-color: #d9d9d9;
  padding: 10px 20px 10px 20px;
  box-shadow: 0px 0px 3px grey;
  margin-bottom: 50px;
}

.no-account {
  position: relative;
  top: 20px;
  text-align: center;
  text-decoration: underline;
  font-family: "Source Sans Pro", sans-serif;
}

.no-account:hover {
  cursor: pointer;
}

form {
  font-family: "Source Sans Pro", sans-serif;
  font-size: larger;
}
</style>

<template>
  <div class="signIn-page">
    <SignUpHeader headerWords="sign in to account" />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <div class="card background-color-change">
            <div class="card-body">
              <form action="#" @submit.prevent="SignIn">
                <div class="form-group row py-2">
                  <label
                    for="email"
                    class="col-md-4 col-form-label text-md-right"
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
                  <div class="button-div">
                    <button type="submit">
                      <div
                        v-if="isLoading"
                        class="spinner-border spinner-border-sm"
                      ></div>
                      Sign In
                    </button>
                  </div>
                  <div v-if="error" class="alert alert-danger mt-4">
                    {{ error }}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-account">
      <div @click="goToSignUp()">Don't have an account? Create one</div>
    </div>
    <!-- Make this a push to the sign up page -->
  </div>
</template>

<script>
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import SignUpHeader from "../SignUpHeader.vue";
import Swal from "sweetalert2";

// cool alert
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

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
  components: {
    SignUpHeader,
  },
  methods: {
    goToSignUp() {
      this.$router.push("/signup");
    },
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
                  Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                  }
                  )
                }
              })
              .catch((err) => {
                // CLIENT ACCOUNT
                console.log("CLIENT ACCOUNT");

                this.$router.push("/performance");
                Toast.fire({
                  icon: "success",
                  title: "Signed in successfully",
                });
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
