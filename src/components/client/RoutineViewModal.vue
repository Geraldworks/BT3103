<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <ComponentHeader :blackHeader="blackHeader" :redHeader="redHeader" />
        </div>
        <div class="close" @click="$emit('close-modal')">
          <img class="close-img" src="@/assets/images/cross-icon.png" alt="" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ComponentHeader from "./ComponentHeader.vue";

export default {
  name: "RoutineViewModal",
  data() {
    return {
      blackHeader: "Viewing",
      redHeader: "Routine",
    };
  },
  components: {
    ComponentHeader,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk&family=Teko:wght@500;600&display=swap");
.modal-overlay {
  position: fixed;
  z-index: 500;
  top: -3em;
  bottom: -10px;
  left: -40em;
  right: -40em;
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
  background-color: black;
  font-family: Teko;
  height: 90%;
  width: 90%;
  margin-top: 6%;
  border-radius: 25px;
  border-style: solid;
  border-width: 0.2em;
  border-color: #ed1f24;
  max-width: 50%;
  max-height: 70%;
  font-size: 28px;
  padding: 1em 3em;
}

.modal::-webkit-scrollbar {
  display: none;
}
.close {
  margin: 6% 0 0 10px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.close {
  margin: 10% 0 0 5px;
  cursor: pointer;
}

.close-img {
  width: 25px;
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
