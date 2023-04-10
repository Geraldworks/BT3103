<template>
  <nav>
    <!-- GymmBuddy Logo -->
    <div class="navbar-brand">
      <router-link
        to="/clients"
        exact-active-class="active-nav-link"
        @click="removeStore"
      >
        <img src="/gymmbuddy.png" alt="Logo" />
      </router-link>
    </div>
    <!-- Navbar Links -->
    <div class="row">
      <!-- Clients Tab -->
      <div class="col">
        <router-link
          class="nav-link"
          to="/clients"
          exact-active-class="active-nav-link"
          @click="removeStore"
        >
          <p>CLIENTS</p>
        </router-link>
      </div>
      <!-- Calendar Tab -->
      <div class="col">
        <router-link
          class="nav-link"
          to="/trainer-calendar"
          exact-active-class="active-nav-link"
        >
          <p>CALENDAR</p>
        </router-link>
      </div>
      <!-- Dropdown -->
      <div class="col">
        <CDropdown class="d-flex" variant="nav-item" :popper="false">
          <!-- Dropdown Toggle -->
          <CDropdownToggle color="secondary">
            <img
              src="/abstract-user-flat-4.svg"
              alt=""
              width="22"
              height="24"
            />
          </CDropdownToggle>
          <!-- Dropdown Menu -->
          <CDropdownMenu>
            <CDropdownItem style="cursor: pointer" @click="removeStore(); signOut()"
              >Sign Out</CDropdownItem
            >
          </CDropdownMenu>
        </CDropdown>
      </div>
    </div>
  </nav>
</template>

<script>
import {
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from "@coreui/vue";
import { mapGetters } from "vuex";
import { auth } from "@/firebase.js";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export default {
  name: "TrainerNavbar",
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.$store.dispatch("fetchUser", user);
    });
  },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    // Sign out function
    async signOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/");
      Toast.fire({
        icon: "success",
        title: "Signed Out",
      });
      sessionStorage.clear();
    },
    // Function that resets client email and display routines status
    removeStore() {
      this.$store.dispatch("setClientEmail", null);
      this.$store.dispatch("setDisplayRoutinesStatus", false);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Source Sans Pro");

nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: #fff;
  height: 200px;
  font-family: "Source Sans Pro", "sans-serif";
  font-size: larger;
  border-bottom: 5px solid #ed1f24;
  box-sizing: border-box;
}

.navbar-brand img {
  position: relative;
  top: 5px;
  height: 100px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  padding: 0px 5px;
  box-sizing: border-box;
  border-radius: 8px;
}

.nav-link:hover {
  background-color: #555;
}

.active-nav-link p {
  color: rgb(237, 31, 36);
}

.row {
  position: relative;
  top: 10px;
}

.col {
  box-sizing: border-box;
  padding: 0px 10px;
}
</style>
