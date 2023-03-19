<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header text-center">
            <h3>SIGN IN TO ACCOUNT</h3>
          </div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
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
                  <button
                    type="submit"
                    class="btn btn-primary mt-2"
                    @click="fetchFromDb"
                  >
                    Sign In
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "SignInComponent",
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref(null);

    const store = useStore();
    const router = useRouter();

    const SignIn = async () => {
      try {
        await store.dispatch("signIn", {
          email: email.value,
          password: password.value,
        });
          router.push("/performance");
      } catch (err) {
        error.value = err.message;
      }
    };

    return { SignIn, email, password, error };
  }
};
</script>
