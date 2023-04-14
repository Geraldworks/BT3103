<template>
  <div class="bottom-container">
    <!-- Create the Records Section -->
    <div class="records-section">
      <Records :email="email" />
    </div>
    <!-- Create the Progress Section -->
    <div class="progress-section">
      <ProgressSection :email="email" />
    </div>
  </div>
</template>

<script>
import Records from "./Records.vue";
import ProgressSection from "./ProgressSection.vue";

export default {
  // a component to create the bottom section of the performance page
  name: "PerformanceBottom",
  props: {
    email: String,
  },
  // uses Records and ProgressSection as the child components
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
  flex: 2;
  /* height: 40vh; */
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  margin: 0px 20px 10px 20px;
  overflow: auto;
}

.progress-section {
  flex: 3;
  /* height: 40vh; */
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  margin: 0px 20px 10px 20px;
}

@media screen and (max-width: 1350px) {
  .bottom-container {
    flex-direction: column;
  }
}
</style>
