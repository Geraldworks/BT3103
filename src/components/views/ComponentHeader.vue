<template>
  <div class="header-container">
    <h1 class="blackPart">{{ blackHeader }}</h1>
    <h1 class="redPart">{{ redHeader }}</h1>
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
  margin-left: 20px;
  /* flex: 0 0 auto; */
  /* align-items: baseline; */
}
.blackPart {
  color: #000;
  font-family: "Teko", sans-serif;
  font-weight: 600;
  font-size: 2.67vw;
  line-height: 73px;
  text-transform: uppercase;
  margin-right: 10px;
}
.redPart {
  color: #ed1f24;
  font-family: "Teko", sans-serif;
  font-weight: 600;
  font-size: 2.67vw;
  line-height: 73px;
  text-transform: uppercase;
}
</style>