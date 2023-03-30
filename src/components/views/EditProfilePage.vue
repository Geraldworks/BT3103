<template>
  <div class="edit-page">
    <Navbar />
    <LoadingSpinner v-if="pageLoading" :pageLoading="pageLoading"/>

    <div v-else class="container">
      <div class="row display-words">
        <div>EDIT PROFILE</div>
      </div>
      <div class="row picture">
        <label for="file-input">
          <img :src="displayPicture" alt="Image" class="dp" />
          <div class="overlay">Change</div>
        </label>
        <input id="file-input" type="file" @change="onFileSelected" />
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card background-color-change border-0">
            <div class="card-body">
              <form
                action="#"
                @submit.prevent="
                  update();
                  onUpload();
                "
              >
                <div class="form-group row py-2">
                  <label
                    for="fullName"
                    class="col-md-4 col-form-label text-md-right"
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
                    for="contactNo"
                    class="col-md-4 col-form-label text-md-right"
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
                    class="col-md-4 col-form-label text-md-right"
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
                    class="col-md-4 col-form-label text-md-right"
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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  list,
  getDownloadURL,
} from "firebase/storage";
import defaultPic from "../../assets/images/default_dp.svg";
import LoadingSpinner from "../LoadingSpinner.vue";

export default {
    name: "EditProfilePage",
    data() {
        return {
            fullName: "",
            contactNo: "",
            emergencyContactName: "",
            emergencyContactNo: "",
            isLoading: false,
            errorMessage: "",
            displayPicture: null,
            profilePicture: null,
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
            const data = docSnap.data();
            this.fullName = data.fullName;
            this.contactNo = data.contactNo;
            this.emergencyContactName = data.emergencyContactName;
            this.emergencyContactNo = data.emergencyContactNo;
        })
            .catch((err) => {
            console.log(err);
        });
        const storage = getStorage();
        const listRef = ref(storage);
        list(listRef).then((res) => {
            res.items.forEach((imageRef) => {
              const email = imageRef._location.path.slice(0, -4);
                if (email == this.user.data.email) {
                    getDownloadURL(imageRef).then((url) => {
                        this.displayPicture = url;
                    });
                }
            });
        }).finally(() => {
            if (!this.displayPicture) {
              this.displayPicture = defaultPic;
            }
            this.pageLoading = false;
        });
    },
    methods: {
        async update() {
            const clientRef = doc(db, "client", this.user.data.email);
            this.isLoading = true;
            updateDoc(clientRef, {
                fullName: this.fullName,
                contactNo: this.contactNo,
                emergencyContactName: this.emergencyContactName,
                emergencyContactNo: this.emergencyContactNo,
            })
                .then((response) => {
                // some sort of feedback to show that it's done here
                this.isLoading = false;
                location.reload();
            })
                .catch((err) => {
                console.log(err);
            });
        },
        onFileSelected(event) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.displayPicture = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
            this.profilePicture = event.target.files[0];
        },
        onUpload() {
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            // Ensure that it only uploads the pic when a pic is selected
            if (this.profilePicture) {
                const storage = getStorage();
                const storageRef = ref(storage, `${this.user.data.email}.jpg`);
                const uploadTask = uploadBytesResumable(storageRef, this.profilePicture); // will replace old pic if already there
                uploadTask.on("state_changed", (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                }, (error) => {
                    // Handle unsuccessful uploads
                    console.log("Unsuccessful upload!");
                });
            }
        },
    }
};
</script>

<style scoped>
.dp {
  width: auto;
  height: 200px;
  border-radius: 50%;
}

.edit-page {
  background-color: black;
  overflow-y: hidden;
  min-width: 800px;
  padding-bottom: 1000px;
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

.picture {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.picture > label {
  width: auto;
  border-radius: 50%;
  cursor: pointer;
}

.picture .overlay {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.5); /* Black see-through */
  color: #f1f1f1;
  color: white;
  width: 15%;
  font-size: 20px;
  padding: 20px;
  text-align: center;
  font-family: "Source Sans Pro", sans-serif;
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
  box-sizing: border;
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

#file-input {
  display: none;
}
</style>
