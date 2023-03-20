<template>
    <nav>
      <div class="navbar-brand">
        <a href="/clients">
          <img src="gymmbuddy.png" alt="Logo" />
        </a>
      </div>
      <div class="row">
        <div class="col">
          <router-link
            class="nav-link"
            to="/clients"
            exact-active-class="active-nav-link"
          >
            <p>CLIENTS</p>
          </router-link>
        </div>
        <div class="col">
          <router-link
            class="nav-link"
            to="/trainer-calendar"
            exact-active-class="active-nav-link"
          >
            <p>CALENDAR</p>
          </router-link>
        </div>
        <div class="col">
          <CDropdown class="d-flex" variant="nav-item" :popper="false">
              <CDropdownToggle color="secondary">
                <img
                  src="/abstract-user-flat-4.svg"
                  alt=""
                  width="22"
                  height="24"
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href="#">Edit Profile</CDropdownItem>
                <CDropdownItem @click="signOut">Sign Out</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
        </div>
      </div>
    </nav>
</template>
  
<script>
import {
    CNavbar,
    CNavItem,
    CDropdown,
    CNavbarNav,
    CNavbarToggler,
    CDropdownToggle,
    CContainer,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CNavLink,
  } from "@coreui/vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  import { computed } from "vue";
  import { auth } from "@/firebase.js";
  
  export default {
    name: "TrainerNavbar",
    setup() {
      const store = useStore();
      const router = useRouter();
      auth.onAuthStateChanged((user) => {
        store.dispatch("fetchUser", user);
      });
      console.log(store.state.user);
      const user = computed(() => {
        return store.getters.user;
      });
  
      return { user };
    },
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      async signOut() {
        await this.$store.dispatch("logOut");
        this.$router.push("/");
        sessionStorage.clear();
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
    border-bottom: 5px solid #ED1F24;
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
    font-weight: bold;
    text-transform: uppercase;
    padding: 0px 10px;
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
    top: 10px
  }
  
  .col {
    box-sizing: border-box;
    padding: 0px 10px;
  }
  </style>
