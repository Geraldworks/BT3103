<template>
  <div class="header-container">
    <p class="blackPart">{{ blackHeader }}</p>
    <p class="redPart">{{ redHeader }}</p>
  </div>
</template>

<script>
export default {
  name: "ComponentHeader",
  props: {
    blackHeader: String,
    redHeader: String,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");

.header-container {
  display: flex;
  margin: 1vw;
  flex-wrap: wrap;
  /* flex: 0 0 auto; */
  /* align-items: baseline; */
}
.blackPart {
  color: #000;
  font-family: "Teko", sans-serif;
  font-weight: 600;
  font-size: 3.2em;
  line-height: 7vh;
  text-transform: uppercase;
  margin-right: 10px;
}
.redPart {
  color: #ed1f24;
  font-family: "Teko", sans-serif;
  font-weight: 600;
  font-size: 3.2em;
  line-height: 7vh;
  text-transform: uppercase;
}
</style>