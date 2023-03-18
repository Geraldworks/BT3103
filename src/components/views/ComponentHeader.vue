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
.header-container {
  display: flex;
  align-items: baseline;
}
.blackPart {
  color: #000;
  font-family: Teko;
  font-weight: SemiBold;
  font-size: 51.2px;
  margin-right: 10px;
}
.redPart {
  color: #ed1f24;
  font-family: Teko;
  font-weight: SemiBold;
  font-size: 51.2px;
}
</style>