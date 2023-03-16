<template>
  <body>
    <div id="logo">
      <img src="/logo.png" alt="" />
    </div>
    <div id="slogan">
      <div class="container">
        <div class="row">
          <div class="col" id="tagline">
            <h1>Fitness Made Easy</h1>
            <h4>
              An all-in-one platform that caters to you and your fitness trainer
            </h4>
            <router-link to="/signup">
              <button class="pill-button">SIGN-UP</button>
            </router-link>
            <router-link to="/signin">
              <button class="pill-button">SIGN-IN</button>
            </router-link>
          </div>
          <div class="col" id="women-exercising">
            <img src="/women-exercising.jpg" alt="" width="380" height="400" />
          </div>
        </div>
      </div>
    </div>

    <div id="about">
      <div class="container">
        <h2 style="color: red">ABOUT GYMMBUDDY</h2>
        <h5>
          Established in October 2010, GYMMBOXX started as a single gym situated
          at the top of a multi-storey car park in Singapore (Bedok Reservoir).
          Over the years, GYMMBOXX has made its mark as Singapore’s affordable
          premium gym brand, serving the residential neighbourhoods and
          heartlands. With a total of 8 gyms island-wide currently, GYMMBOXX
          will continue to expand and bring quality gym facilities and service
          to the rest of Singapore and beyond.
        </h5>
      </div>
    </div>

    <div id="reasons">
      <div class="container">
        <h2 style="color: red; margin-bottom: 20px">WHY GYMMBUDDY</h2>
        <div class="row">
          <div class="col">
            <img src="/checklist.png" alt="" />
            <h4>TRACKING</h4>
          </div>
          <div class="col">
            <img src="/dumbbell.png" alt="" />
            <h4>PERSONALISED TRAINING</h4>
          </div>
          <div class="col">
            <img src="/thumb.png" alt="" />
            <h4>SIMPLE TO USE</h4>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style scoped>
body {
  background-color: black;
  margin: 0px;
  padding: 0px;
}

#women-exercising {
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#tagline {
  margin: 100px;
}

#logo {
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}

#slogan {
  background-color: grey;
  color: white;
  margin-bottom: 50px;
}

#about {
  background-color: #2a2a2a;
  color: white;
  margin-bottom: 50px;
  padding: 20px;
  text-align: center;
}

#reasons {
  text-align: center;
  color: white;
  padding: 10px;
}
.btn {
  background-color: rgb(237, 31, 36);
  margin: 4px;
}
.pill-button {
  width: 120px;
  height: 40px;
  border-radius: 25px; /* half of height */
  background-color: rgb(237, 31, 36);
  border: none;
  outline: none;
  cursor: pointer;
  margin: 5px;
  margin-top: 30px;
}
</style>
