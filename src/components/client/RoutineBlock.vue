<template>
  <div class="content-area" @click="showRoutineViewModal">
    <div class="item-container">
      <div class="item-text routinecreator-text">{{ routineCreator }}</div>
      <div class="item-text routinename-text">{{ routineName }}</div>
      <div class="item-text exercisetypes-text">{{ exerciseTypes }}</div>
      <div class="item-text routinedate-text">{{ routineDate }}</div>
      <div class="update-icon">
        <!-- Toggled when there is an update -->
        <img
          class="update-img"
          src="@/assets/images/alert-icon.png"
          alt=""
          v-show="updateBool"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    routineCreator: String,
    routineName: String,
    exerciseTypes: String,
    routineDate: String,
    updateBool: Boolean,
  },
  methods: {
    showRoutineViewModal() {
      this.$emit("show-routine-view-modal");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");
.content-area {
  font-family: "Teko", sans-serif;
  font-size: 24px;
  font-weight: 600;
  background-color: gray;
  padding: 10px;
  width: 100%;
  border-radius: 25px;
  margin-top: 1vh;
}

.item-container {
  display: flex;
  flex-direction: row;
  padding: 5px 20px;
}

.routinecreator-text {
  flex: 2;
  margin-right: 5px;
}

.routinename-text {
  flex: 5;
  margin-right: 5px;
}

.exercisetypes-text {
  flex: 4;
  margin-right: 5px;
}

.routinedate-text {
  flex: 1;
  margin-right: 5px;
}

.update-icon {
  flex: 0.5;
}

.update-img {
  width: 25px;
}
</style>