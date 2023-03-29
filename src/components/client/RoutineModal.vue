<template>
    <transition name="modal-fade">
      <div class="modal-overlay" @click="$emit('close-modal')">
        <div class="modal" @click.stop>
          <!-- <img class="check" src="~/assets/check-icon.png" alt="" /> -->
          <div style="font-size: 3rem"> <b style="color: white;">CREATING</b> <b style="color: #ED1F24;">ROUTINE</b></div>
          <div id="routine-form">
            <form action="" class="routine">
                <label for="">ROUTINE NAME</label> <input type="text" name="rname" id="rname" placeholder="Monday Chest Ripper"> <br>
                <label for="">ROUTINE DATE</label> <input type="text" name="rname" id="rname" placeholder="DD/MM/YYYY"> <button style="margin-left: 25em;">Add Activity</button> <br>
                <hr>
            </form>
            <!-- list for each activity ui -->

            <div class="activity">
              <table>
                <tr>
                  <th class="amuscle">Muscle</th>
                  <th class="adesc">Description</th>
                  <th>Set</th>
                  <th>Kg</th>
                  <th>Reps</th>
                  <th>Done?</th>
                </tr>
                <tr>
                  <td class="ath">Chest</td>
                  <td class="adesc">Description of chest activity</td>
                  <td>1</td>
                  <td>16</td>
                  <td>12</td>
                  <td><input type="radio"></td>
                </tr>
              </table>
            </div>

            <!-- add activity form ui-->
            <div class="add-activity">
              <form action="" style="display: flex;">
                <div class="activity-left">
                  <label for="">ACTIVITY TYPE</label> <input type="text" name="" id=""> <br>
                  <label for="">ACTIVITY NAME</label> <input type="text" name="" id=""> <br>
                  <label for="">SETS</label> <input type="text" name="" id=""> <br>
                  <div class="activity-set">
                    <label for="">SET 1 DETAILS</label> <input type="text" name="" id="">KG <input type="text" name="" id="">REPS <br>
                    <label for="">SET 2 DETAILS</label> <input type="text" name="" id="">KG <input type="text" name="" id="">REPS <br>
                    <label for="">SET 3 DETAILS</label> <input type="text" name="" id="">KG <input type="text" name="" id="">REPS
                  </div>
                </div>
                <div class="activity-right" style="margin-left: 1em;">
                  <label for="">DESCRIPTION</label> <br>
                  <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
              </form>
            </div>
            <!-- add activity form -->
            
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
    top: -8em;
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
    max-height: 80%;
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

.activity {
  border-style: solid;
    border-radius: 25px;
    border-color: grey;
    border-width: 0.1em;
    padding: 0.4em;
    margin-bottom: 1em;
}

.amuscle {
  width: 5em;
  text-decoration: underline;
  text-align: left;
}

.adesc {
  width: 20em;
  text-align: left;
}

th, td {
  width: 3em;
  padding-right: 0.5em;
  text-align: center;
}
  .add-activity {
    border-style: solid;
    border-radius: 25px;
    border-color: #ED1F24;
    border-width: 0.1em;
    padding: 0.4em;
  }

  .activity-left input {
    width: 8em ;
  }

  .activity-left label, .routine label{
    display: inline-block;
    text-align: right;
    width: 5em;
    margin-left: 0em;
  }
  
  input{
    border-radius: 25px;
    margin: 0.2em;
    margin-left: 1em;
    padding: 0em 0.5em;
    height: 1em;
  }

  textarea {
    border-width: 0.075em;
    border-radius: 25px;
    width: 15em;
    height: 8em;
    padding: 0.25em;
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
    height: 2px;
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
  