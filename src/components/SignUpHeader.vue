<template>
  <!-- Sign Up / Sign In Header Component -->
  <div class="top-content">
    <a href="/">
      <!-- Gymmbuddy Logo -->
      <img
        src="/gymmbuddy.png"
        alt="gymmbuddy logo"
        height="100"
        class="logo"
      />
    </a>
    <!-- Words to be displayed on component -->
    <div class="display-words">{{ headerWords }}</div>
  </div>
</template>

<script>
export default {
  props: {
    headerWords: String,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");

.logo {
  margin-top: 30px;
  margin-bottom: 10px;
}
.top-content {
  padding: 20px auto;
  text-align: center;
}

.display-words {
  text-align: center;
  text-transform: uppercase;
  font-size: 60px;
  font-family: Teko;
  color: black;
}
</style>
