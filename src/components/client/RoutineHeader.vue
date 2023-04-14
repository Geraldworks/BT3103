<template>
    <div class="profile-container">
      <!--Profile Picture-->
      <img
        class="profile-picture"
        :src="displayPicture"
        alt="an image"
      />
      <div class="your-profile">
        <div>YOUR ROUTINES</div>
      </div>
    </div>
  </template>
  
  <script>
  import defaultPic from "../../assets/images/default_dp.svg";
  import { mapGetters } from "vuex";
  import { getStorage, list, ref, getDownloadURL } from "@firebase/storage";
  import { auth } from "../../firebase";
  
  export default {
    data() {
      return {
        displayPicture: null,
      }
    },
    computed: {
      ...mapGetters(["user"]),
    },
    mounted() {
      auth.onAuthStateChanged((user) => {
        this.$store.dispatch("fetchUser", user);
      });
      // retrieving the display picture
      const storage = getStorage();
      const listRef = ref(storage);
  
      list(listRef).then((res) => {
        res.items.forEach((imageRef) => {
          if (imageRef._location.path == this.user.data.email) {
            getDownloadURL(imageRef).then((url) => {
              this.displayPicture = url;
            });
          }
        });
      });
  
      if (!this.displayPicture) {
        this.displayPicture = defaultPic;
      }
    },
  }
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");
  
  .profile-container {
    padding: 20px 10vw;
    display: flex;
    justify-content: flex-start;
    font-family: Teko;
    background-color: black;
    color: white;
    background-image: url("@/assets/images/profile_bg.jpg");
    background-size:contain;
  }
  
  .profile-picture {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    border: 2px solid white;
  }
  
  .your-profile {
    font-size: 3rem;
    padding-left: 30px;
    width: 1000px;
    flex: 2;
  }
  
  .your-profile > div {
      border-bottom: 5px solid white;
  }
  </style>
  