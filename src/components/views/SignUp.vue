<template>
  <div class="signUp-page">
    <SignUpHeader :headerWords="headerWords" />
    <div v-if="pageNo === 1" class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card background-color-change">
            <div class="card-body">
              <form action="#">
                <div class="form-group row py-2">
                  <label
                    for="fullName"
                    class="col-md-5 col-form-label text-md-right"
                    >FULL NAME:</label
                  >

                  <div class="col-md-6">
                    <input
                      id="fullName"
                      type="text"
                      class="form-control"
                      name="fullName"
                      value
                      required
                      autofocus
                      v-model="fullName"
                    />
                  </div>
                </div>

                <div class="form-group row py-2">
                  <label
                    for="gymmboxxid"
                    class="col-md-5 col-form-label text-md-right"
                    >GYMMBOXX ID:</label
                  >

                  <div class="col-md-6">
                    <input
                      id="gymmboxxid"
                      type="text"
                      class="form-control"
                      name="gymmboxxid"
                      required
                      v-model="gymmboxxid"
                    />
                  </div>
                </div>

                <div class="form-group row py-2">
                  <label
                    for="contactNo"
                    class="col-md-5 col-form-label text-md-right"
                    >CONTACT NUMBER:</label
                  >

                  <div class="col-md-6">
                    <input
                      id="contactNo"
                      type="text"
                      class="form-control"
                      name="contactNo"
                      required
                      v-model="contactNo"
                    />
                  </div>
                </div>

                <div class="form-group row py-2">
                  <label
                    for="emergencyContactName"
                    class="col-md-5 col-form-label text-md-right"
                    >EMERGENCY CONTACT:</label
                  >

                  <div class="col-md-6">
                    <input
                      id="emergencyContactName"
                      type="text"
                      class="form-control"
                      name="emergencyContactName"
                      required
                      v-model="emergencyContactName"
                    />
                  </div>
                </div>

                <div class="form-group row py-2">
                  <label
                    for="emergencyContactNo"
                    class="col-md-5 col-form-label text-md-right"
                    >EMERGENCY CONTACT NO:</label
                  >

                  <div class="col-md-6">
                    <input
                      id="emergencyContactNo"
                      type="text"
                      class="form-control"
                      name="emergencyContactNo"
                      required
                      v-model="emergencyContactNo"
                    />
                  </div>
                </div>

                <div class="form-group row py-2">
                  <label
                    for="email"
                    class="col-md-5 col-form-label text-md-right"
                    >EMAIL ADDRESS:</label
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
                    class="col-md-5 col-form-label text-md-right"
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

                <div class="form-group row py-2">
                  <label
                    for="confirmPassword"
                    class="col-md-5 col-form-label text-md-right"
                    >CONFIRM PASSWORD:</label
                  >

                  <div class="col-md-6">
                    <input
                      id="confirmPassword"
                      type="password"
                      class="form-control"
                      name="confirmPassword"
                      required
                      v-model="confirmPassword"
                    />
                  </div>
                  <p v-if="errorMessage.length" class="alert alert-danger mt-3">
                    <b>Please correct the following error(s):</b>
                    <ul>
                      <li v-for="error in errorMessage">{{ error }}</li>
                    </ul>
                  </p>
                </div>

                <div class="form-group row mb-0">
                  <div class="button-div">
                    <button v-if="pageNo === 1" type="button" @click="validateForm(); nextPage();">
                      Next
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card background-color-change">
            <div class="card-body d-flex flex-row justify-content-center">
              <div
                v-for="(trainerDetails, trainerEmail) in trainerInfo"
              >
                <div class="p-5 trainer-card">
                  <input :class="{active: trainerEmail === selectedTrainer, inactive: trainerEmail != selectedTrainer}" type="image" :src="trainerDetails[1]" alt="Trainer" @click="selectTrainer(trainerEmail)">
                  <div>{{ trainerDetails[0] }}</div>
                  <div>{{  trainerEmail }}</div>
                </div>
              </div>
            </div>
            <p v-if="errorMessage.length" class="alert alert-danger mt-3">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in errorMessage">{{ error }}</li>
              </ul>
            </p>
            <div class="row mb-0">
                <div class="button-div">
                  <button type="button" @click="previousPage">Back</button>
                  <button type="submit" @click="SignUp" :disabled="selectedTrainer == null">
                    <div
                      v-if="isLoading"
                      class="spinner-border spinner-border-sm"
                    ></div>
                    Sign-Up
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignUpHeader from "../SignUpHeader.vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";
import { ref, getStorage, getDownloadURL, list } from "@firebase/storage";
import defaultPic from "../../assets/images/default_dp.svg";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export default {
  name: "SignUpComponent",
  data() {
    return {
      headerWords: "Sign Up For Account",
      pageNo: 1,
      isLoading: false,
      fullName: "",
      gymmboxxid: "",
      contactNo: "",
      emergencyContactName: "",
      emergencyContactNo: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: [],
      selectedTrainer: null,
      trainerInfo: null,
    };
  },
  components: {
    SignUpHeader,
  },
  methods: {
    selectTrainer(trainerEmail) {
      this.selectedTrainer = trainerEmail;
    },
    previousPage() {
      this.pageNo -= 1;
      this.headerWords = "Sign Up For Account";
    },
    nextPage() {
      if (this.errorMessage.length == 0) {
        this.pageNo += 1;
        this.headerWords = "Select Your Trainer";
      }
    },
    validContact(contactNo) {
      return (contactNo.length == 8 && (contactNo.charAt(0) == "9" || contactNo.charAt(0) == "8"));
    },
    validId(id) {
      return (id.length == 6 && id.charAt(0) == "U");
    },
    validEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    highlightField(id) {
      document.getElementById(id).style.border = "1px red solid";
    },
    unhighlightField(id) {
      document.getElementById(id).style.border = null;
    },
    fieldsFilled() {
      var fields = [this.fullName, this.gymmboxxid, this.contactNo, this.emergencyContactName, this.emergencyContactNo, this.email, this.password, this.confirmPassword];
      var ids = ["fullName", "gymmboxxid", "contactNo", "emergencyContactName", "emergencyContactNo", "email", "password", "confirmPassword"];
      for (let i = 0; i < fields.length; i++) {
        if (fields[i] == "") {
          this.highlightField(ids[i]);
        } else {
          this.unhighlightField(ids[i]);
        }
      }
      return (this.fullName != "" && this.gymmboxxid != "" && this.contactNo != "" && this.emergencyContactName != "" && this.emergencyContactNo != "" && this.email != "" && this.password != "" && this.confirmPassword != "");
    },
    validPasswordLength() {
      return (this.password.length >= 6);
    },
    validateForm() {
      // validate that passwords are the same
      this.errorMessage = [];
        if (!this.fieldsFilled()) {
          // Only show this error if there are empty fields.
          this.errorMessage = [];
          this.errorMessage.push("Fields cannot be empty.")
        } else {
          if (!this.validId(this.gymmboxxid)) {
          this.errorMessage.push("Invalid Gymmboxx ID.");
          this.highlightField("gymmboxxid");
        } 
        if (!this.validContact(this.contactNo)) {
          this.errorMessage.push("Invalid Contact Number.");
          this.highlightField("contactNo");
        } 
        if (!this.validContact(this.emergencyContactNo)) {
          this.errorMessage.push("Invalid Emergency Contact Number.");
          this.highlightField("emergencyContactNo");
        } 
        if (!this.validEmail(this.email)) {
          this.errorMessage.push("Invalid Email");
          this.highlightField("email");
        } 
        if (!this.validPasswordLength(this.password)) {
          this.errorMessage.push("Password too short.");
          this.highlightField("password");
        } else if (this.password !== this.confirmPassword) {
          this.errorMessage.push("Passwords do not match.");
          this.highlightField("password");
          this.highlightField("confirmPassword");
        } 
      }
    },
    async SignUp() {
      this.isLoading = true;
      try {
        await this.$store
          .dispatch("signUp", {
            gymmboxxid: this.gymmboxxid,
            contactNo: this.contactNo,
            emergencyContactName: this.emergencyContactName,
            emergencyContactNo: this.emergencyContactNo,
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            trainerEmail: this.selectedTrainer,
          })
          .then((response) => {
            this.$router.push("/signin");
            Toast.fire({
              icon: "success",
              title: "Sign up successful"
            })
          });
      } catch (err) {
        this.isLoading = false;
        if (err.code === "auth/email-already-in-use") {
          // Rewrite the message
          this.errorMessage = "Email already in use.";
        } else {
          this.errorMessage = err.message;
        }
      }
    },
  },
  async created() {
    try {
      // Gets the trainer collection
      const trainerInfo = {};

      const querySnapshot = await getDocs(collection(db, "trainer"));
      // Retrieve the trainer emails
      querySnapshot.forEach((doc) => {
        let documentData = doc.data();
        let currTrainer = [];
        currTrainer.push(documentData.fullName);
        currTrainer.push(defaultPic);
        trainerInfo[documentData.email] = currTrainer;
      });

      // // Storing image URLs
      // const storage = getStorage();
      // const listRef = ref(storage);

      // list(listRef).then((res) => {
      //   res.items.forEach((imageRef) => {
      //     const email = imageRef._location.path.slice(0, -4);
      //     if (trainerInfo[email]) {
      //       getDownloadURL(imageRef).then((url) => {
      //         trainerInfo[email][1] = url;
      //       });
      //     }
      //   });
      // });

      // assign all client information to the variable clientInfo
      this.trainerInfo = trainerInfo;
    } catch (error) {
      // error handling
      console.log(error);
      console.log("No email observed in database");
    }
  },
};
</script>

<style scoped>
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

button:disabled {
  opacity: 50%;
}

button:hover:enabled {
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

.background-color-change {
  background-color: #d9d9d9;
  padding: 10px 20px 10px 20px;
  box-shadow: 0px 0px 3px grey;
  overflow: auto;
  margin-bottom: 50px;
}

.signUp-page {
  min-width: 100vw;
  min-height: 100vh;
  background-color: #d9d9d9;
  position: relative;
}

form {
  font-family: "Source Sans Pro", sans-serif;
  font-size: larger;
}

.trainer-card > input:hover {
  border: 2px solid red;
}

.trainer-card {
  text-align: center;
  font-family: "Source Sans Pro", sans-serif;
  font-size: larger;
}
.trainer-card > input {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.active {
  border: 2px solid red;
}

.inactive {
  border: 2px solid white;
}
</style>
