<template>
  <div class="profile-container">
    <!--Profile Picture-->
    <img
      class="profile-picture"
      src="../assets/images/test.jpeg"
      alt="an image"
    />
    <div class="your-profile">
      <div>YOUR PROFILE</div>
    </div>
  </div>
</template>

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

hr {
  background-color: rgb(255, 255, 255);
  border: 3px solid rgb(255, 255, 255);
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
