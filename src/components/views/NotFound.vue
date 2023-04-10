<template>
  <div class="error-page">
    <img src="../../assets/images/gymmboxx_environment.jpg" alt="" />
    <div class="error-msg" style="color: white">
      <h1>Error 404</h1>
      <h2>Page not found.</h2>
      <a href="/">
        <button class="pill-button">Return to Home</button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.error-page img {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.5;
  height: 100%;
  width: 100%;
}

.error-msg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-family: "Teko";
  text-align: center;
}

.pill-button {
  width: 150px;
  height: 50px;
  border-radius: 25px; /* half of height */
  background-color: rgb(237, 12, 16);
  border: none;
  outline: none;
  cursor: pointer;
  margin: 30px;
  font-size: 1.5rem;
  text-align: center;
  box-sizing: border-box;
  color: white;
  font-family: Teko;
}

.pill-button:hover {
  animation-name: pill-button-highlight;
  animation-duration: 0.15s;
  animation-fill-mode: forwards;
  box-sizing: border-box;
}

@keyframes pill-button-highlight {
  from {
    border: 0px white solid;
  }
  to {
    border: 2px white solid;
  }
}
</style>
