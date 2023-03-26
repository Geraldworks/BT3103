<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal" @click.stop>
        <!-- <img class="check" src="~/assets/check-icon.png" alt="" /> -->
        <div class="modal-title">
          {{ eventTitle }} on
          <span style="color: #ed1f24">{{ eventDate }}</span>
        </div>
        <div class="modal-content">
          <div class="modal-content-header">Event Details</div>
          <div class="modal-content-normal">
            Gym Time Start --
            <span style="color: #ed1f24">{{ eventStart }}</span>
          </div>
          <div class="modal-content-normal">
            Gym Time End -- <span style="color: #ed1f24">{{ eventEnd }}</span>
          </div>
          <div class="modal-content-normal">
            Workout Focus --
            <span style="color: #ed1f24">{{ eventExerciseType }}</span>
          </div>
        </div>
      </div>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="@/assets/images/cross-icon.png" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CalendarDetailModal",
  data() {
    return {};
  },
  props: {
    eventTitle: String,
    eventDate: String,
    eventStart: String,
    eventEnd: String,
    eventExerciseType: String,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");
.modal-overlay {
  position: fixed;
  z-index: 500;
  top: -10px;
  bottom: -10px;
  left: -10px;
  right: -10px;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  position: relative;
  /* justify-content: center;
  text-align: center; */
  background-color: #d9d9d9;
  height: 50%;
  width: 30%;
  margin-top: 10%;
  padding: 8vh 0 0 0;
  border-radius: 20px;
  max-width: 50%;
  max-height: 70%;
  min-width: 550px;
}

.modal-title {
  font-size: 3em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.modal-content {
  height: 100%;
  min-height: 300px;
}

.modal-content-header {
  font-size: 2.5em;
  margin-top: 0.09375em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.modal-content-normal {
  font-size: 1.5em;
  margin: 0.3125em;
}

.close {
  margin: 10% 0 0 5px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

/* .check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
} 

button {
  background-color: #ed1f24;
  width: 150px;
  height: 40px;
  color: white;
  font-family: "Teko", sans-serif;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
} */

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>