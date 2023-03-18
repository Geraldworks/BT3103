<template>
  <div class="bottom-container">
    <Records class="records-section" />
    <ProgressSection class="progress-section" />
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
}

.records-section {
  width: 33%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 25px;
}

.progress-section {
  width: 67%;
  margin-left: 10px;
}
</style>