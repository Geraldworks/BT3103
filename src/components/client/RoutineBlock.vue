<template>
  <div class="content-area">
    <div class="item-container">
      <div class="item-text">{{ routineCreator }}</div>
      <div class="item-text">{{ routineName }}</div>
      <div class="item-text">{{ exerciseTypes }}</div>
      <div class="item-text">{{ routineDate }}</div>
      <div class="update-icon">
        <!-- Toggled when there is an update -->
        <img class="update-img" src="@/assets/images/alert-icon.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routineCreator: "John",
      routineName: "Run run run",
      exerciseTypes: "Cardio, Legs",
      routineDate: "13/4/2023",
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");
.content-area {
  font-family: "Teko", sans-serif;
  background-color: gray;
  padding: 10px;
  width: 100%;
  border-radius: 25px;
  margin-top: 1vh;
}

.item-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.update-img {
  width: 20px;
}
</style>