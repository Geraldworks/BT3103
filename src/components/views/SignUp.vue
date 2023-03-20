<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header text-center">
            <h3>SIGN UP FOR ACCOUNT</h3>
          </div>
          <div class="card-body">
            <form action="#" @submit.prevent="SignUp">
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
                  for="gymmboxxid"
                  class="col-md-4 col-form-label text-md-right"
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
                  >EMERGENCY CONTACT NUMBER:</label
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

              <div class="form-group row py-2">
                <label
                  for="confirmPassword"
                  class="col-md-4 col-form-label text-md-right"
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
                    @input="validateForm"
                  />
                </div>
                <p v-if="errorMessage" class="alert alert-danger mt-3">
                  {{ errorMessage }}
                </p>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button
                    type="submit"
                    class="btn btn-primary mt-2"
                  >
                    <div
                      v-if="isLoading"
                      class="spinner-border spinner-border-sm"
                    ></div>
                    Sign-Up
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
export default {
  name: "SignUpComponent",
  data() {
    return {
      isLoading: false,
      fullName: "",
      gymmboxxid: "",
      contactNo: "",
      emergencyContactName: "",
      emergencyContactNo: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: ""
    }
  },
  methods: {
    validateForm() {
      // validate that passwords are the same
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match.";
        return false;
      }
      this.errorMessage = "";
      return true;
    },
    async SignUp() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("signUp", {
          gymmboxxid: this.gymmboxxid,
          contactNo: this.contactNo,
          emergencyContactName: this.emergencyContactName,
          emergencyContactNo: this.emergencyContactNo,
          fullName: this.fullName,
          email: this.email,
          password: this.password,
        }).then((response) => {
          this.$router.push("/signin");
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
    }
  },
};
</script>
