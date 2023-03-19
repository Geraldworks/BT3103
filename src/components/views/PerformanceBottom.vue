<template>
  <div class="bottom-container">
    <div class="records-section">
      <Records />
    </div>
    <div class="progress-section">
      <ProgressSection />
    </div>
  </div>
</template>

<script>
import Records from "./Records.vue";
import ProgressSection from "./ProgressSection.vue";

export default {
  name: "PerformanceBottom",
  data() {
    return {};
  },
  components: {
    Records,
    ProgressSection,
  },
};
</script>

<style scoped>
.bottom-container {
  display: flex;
  flex-wrap: wrap;
}

.records-section {
  flex: 1;
  /* height: 40vh; */
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  margin: 5px;
}

.progress-section {
  flex: 2;
  /* height: 40vh; */
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  margin: 5px;
}

@media screen and (max-width: 1150px) {
  .bottom-container {
    flex-direction: column;
  }
}
</style>