<template>
    <transition name="modal-fade">
      <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="modal" @click.stop>
          <!-- <img class="check" src="~/assets/check-icon.png" alt="" /> -->
          <div style="font-size: 3rem"> <b style="color: white;">CREATING</b> <b style="color: #ED1F24;">ROUTINE</b></div>
          <div id="routine-form">
            <form action="">
                <label for="">ROUTINE NAME</label> <input type="text" name="rname" id="rname" placeholder="Monday Chest Ripper"> <br>
                <label for="">ROUTINE DATE</label> <input type="text" name="rname" id="rname" placeholder="DD/MM/YYYY"> <button style="margin-left: 25em;">Add Activity</button> <br>
                <hr>
                <!-- list for each activity-->
                <!-- workout comments-->
            </form>

          </div>
        </div>
        <div>

        </div>
        <div class="close" @click="$emit('close-modal')">
          <img class="close-img" src="@/assets/images/cross-icon.png" alt="" />
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  
  export default {
    name: "RoutineModal",
    data() {
      return {
      };
    },
    methods: {
    },
    components: {
    },
    props: {
    },
    emits: ["close-modal"],
    watch: {
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
    border-color: #ED1F24;
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

  #routine-form {
    background-color: white;
    border-radius: 25px;
    padding: 1em 2em;
  }
  
  input {
    border-radius: 25px;
    margin: 0.2em 1em;
    padding: 0em 0.5em;
  }

  button {
    width: 120px;
    height: 50px;
    border-radius: 25px; /* half of height */
    background-color: rgb(237, 31, 36);
    border: none;
    outline: none;
    cursor: pointer;
    margin: 5px;
    font-size: 1.5rem;
    text-align: center;
    box-sizing: border-box;
    color: white;
  }
  
  button:hover {
    animation-name: pill-button-highlight;
    animation-duration: 0.15s;
    animation-fill-mode: forwards;
    box-sizing: border-box;
  }
  
  select {
    height: 200px; 
    border: 0.5px solid black; 
    padding: 0px 3px; 
    text-align: center;
  }

  hr {
    border: none;
    height: 3px;
    background-color: #ED1F24;
    opacity: 1;
}
  
  @keyframes pill-button-highlight {
    from {
      border: 0px white solid;
    }
    to {
      border: 2.5px black solid;
    }
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
  