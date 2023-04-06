<template>
    <div v-if="pageLoading" class="loading">
      <div class="spinner-border mx-auto" style="width: 5rem; height: 5rem;" role="status"></div>
    </div>
</template>

<script>
export default {
    name: "LoadingSpinner",
    props: {
        pageLoading: Boolean,
    }
}
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
}
</style>