<template>
  <div>
    <h1>Personal Records</h1>
    <br />
    <h3 class="prTitle">Deadlift: {{ deadliftData }}kg</h3>
    <h3 class="prTitle">Bench Press: {{ benchPressData }}kg</h3>
    <h3 class="prTitle">Squat: {{ squatData }}kg</h3>
  </div>
</template>

<script>
export default {
  name: "Records",
  data() {
    return {
      deadliftData: 50,
      benchPressData: 50,
      squatData: 50,
    };
  },
};
</script>

<style scoped>
.prTitle {
  /* width: 136px;
  color: rgba(255,255,255,1);
  position: absolute;
  top: 12px;
  left: 12px; */
  font-family: Teko;
  font-weight: SemiBold;
  font-size: 24px;
  opacity: 1;
  text-align: middle;
}
</style>