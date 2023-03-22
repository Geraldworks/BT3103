<template>
  <nav>
    <div class="navbar-brand">
      <a href="/performance">
        <img src="gymmbuddy.png" alt="Logo" />
      </a>
    </div>
    <div class="row">
      <div class="col">
        <router-link
          class="nav-link"
          to="/performance"
          exact-active-class="active-nav-link"
        >
          <p>PERFORMANCE</p>
        </router-link>
      </div>
      <div class="col">
        <router-link
          class="nav-link"
          to="/booking"
          exact-active-class="active-nav-link"
        >
          <p>BOOKING</p>
        </router-link>
      </div>
      <div class="col">
        <router-link
          class="nav-link"
          to="/calendar"
          exact-active-class="active-nav-link"
        >
          <p>CALENDAR</p>
        </router-link>
      </div>
      <div class="col">
        <router-link
          class="nav-link"
          to="/routines"
          exact-active-class="active-nav-link"
        >
          <p>ROUTINES</p>
        </router-link>
      </div>
      <div class="col signOut">
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
import { mapGetters } from "vuex";
import { auth } from "@/firebase.js";

export default {
  name: "Navbar",
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.$store.dispatch("fetchUser", user);
    });
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapGetters(['user'])
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

<!-- <template>
  <div class="navbar-brand">
    <img src="gymmbuddy.png" alt="Logo" />
  </div>
  <CNavbar expand="lg" class="bg-black">
    <CContainer fluid>
      <CNavbarToggler
        aria-label="Toggle navigation"
        aria-expanded="{visible}"
        @click="visible = !visible"
      />
      <CCollapse class="navbar-collapse" :visible="visible">
        <CNavbarNav>
          <CNavItem>
            <CNavLink href="/performance" active> Performance </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/booking" active> Booking </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/calendar" active> Calendar </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/routines" active> Routines </CNavLink>
          </CNavItem>
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
              <CButton @click="signOut">Sign Out</CButton>
            </CDropdownMenu>
          </CDropdown>
        </CNavbarNav>
      </CCollapse>
    </CContainer>
  </CNavbar>
</template> -->
