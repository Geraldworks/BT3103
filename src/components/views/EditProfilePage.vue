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
                  <button type="submit" class="btn btn-primary mt-2">
                    <div
                      v-if="isLoading"
                      class="spinner-border spinner-border-sm"
                    ></div>
                    Submit Changes
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
  name: "EditProfilePage",
  data() {
    return {
      fullName: "",
      contactNo: "",
      emergencyContactName: "",
      emergencyContactNo: "",
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
        const data = docSnap.data();
        this.fullName = data.fullName;
        this.contactNo = data.contactNo;
        this.emergencyContactName = data.emergencyContactName;
        this.emergencyContactNo = data.emergencyContactNo;
      })
      .catch((err) => {
        console.log(err);
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
        }).then((response) => {
            // some sort of feedback to show that it's done here
            this.isLoading = false;
        }).catch((err) => {
            console.log(err);
        });
    }
  }
};
</script>
