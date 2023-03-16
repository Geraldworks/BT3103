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
                <label for="fullName" class="col-md-4 col-form-label text-md-right"
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
                <label for="gymmboxxid" class="col-md-4 col-form-label text-md-right"
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
                <p v-if="errorMessage" class="alert alert-danger">
                  {{ errorMessage }}
                </p>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button
                    type="submit"
                    class="btn btn-primary mt-2"
                    @click="signUp"
                  >
                    Sign Up
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "SignUpComponent",
  setup() {
    const fullName = ref(""); // ref is to make it reactive
    const gymmboxxid = ref("");
    const contactNo = ref("");
    const emergencyContactName = ref("");
    const emergencyContactNo = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref("");

    const router = useRouter();
    const store = useStore();

    const SignUp = async () => {
      try {
        await store.dispatch("signUp", {
          gymmboxxid: gymmboxxid.value,
          contactNo: contactNo.value,
          emergencyContactName: emergencyContactName.value,
          emergencyContactNo: emergencyContactNo.value,
          fullName: fullName.value,
          email: email.value,
          password: password.value,
        });
        router.push("/signin");
      } catch (err) {
        error.value = err.message;
      }
    };

    return {
      SignUp,
      fullName,
      gymmboxxid,
      contactNo,
      emergencyContactName,
      emergencyContactNo,
      email,
      password,
      confirmPassword,
      errorMessage,
      router,
    };
  },
  methods: {
    validateForm() { // validate that passwords are the same
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match";
        return false;
      }
      this.errorMessage = "";
      return true;
    },
  },
};
</script>
