<template>
  <div class="error-page">
    <img src="../../assets/images/gymmboxx_environment.jpg" alt="" />
    <div class="error-msg">
      <h1>Error 404</h1>
      <h2>Page not found.</h2>
      <a href="/">
        <button>Return to Home</button>
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

.error-msg button {
  width: 120px;
  height: 50px;
  border-radius: 25px; /* half of height */
  background-color: rgb(237, 31, 36);
  border: none;
  outline: none;
  cursor: pointer;
  margin: 5px;
  font-size: 1.5rem;
  text-align: center;
  box-sizing: content-box;
  padding-left: 10px;
  padding-right: 10px;
}

.error-msg button:hover {
    background-color: white;
}
</style>
