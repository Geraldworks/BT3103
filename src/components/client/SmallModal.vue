<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal" @click.stop>
        <!-- <img class="check" src="~/assets/check-icon.png" alt="" /> -->
        <div>{{ bodyContent }}</div>
        <button>{{ buttonContent }}</button>
      </div>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="@/assets/images/cross-icon.png" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SmallModal",
  data() {
    return {};
  },
  props: {
    bodyContent: String,
    buttonContent: String,
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
  background-color: white;
  height: 90%;
  width: 90%;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
  max-width: 50%;
  max-height: 70%;
}
.close {
  margin: 10% 0 0 16px;
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
} */

button {
  background-color: #ed1f24;
  width: 150px;
  height: 40px;
  color: white;
  font-family: "Teko", sans-serif;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>