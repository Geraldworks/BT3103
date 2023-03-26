<template>
<div>
  <!-- Whats left is that the type for the input has to be number and need to be required
  Front end has to be improved -->
<transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modal" @click.stop>
          <div style="font-size: 3rem"> <b style="color: white;">Upadting Stats for</b> <b style="color: #ED1F24;">{{ clientName }}</b></div>
          <hr>
          <div id="update-form">
            <form action="">
                <label for="">Fats percentage </label> 
                    <input @input="checkFatsInput(fats)" type="number" v-model="fats" id="fats" placeholder="Current Fats %">
                        <div v-if="showFatsError" class="error-message"> The number must be positive and not greater than 100.</div> 
                <br>
                <label for="">Weight </label> 
                    <input @input="checkWeightInput(weight)" type="number" v-model="weight" id="weight" placeholder="Current weight"> 
                        <div v-if="showWeightError" class="error-message"> The number must be positive.</div> 
                <br>
                <label for="">Muscle Mass </label> 
                    <input @input="checkMuscleInput(muscle)" type="number" v-model="muscle" id="muscle" placeholder="Current Muscle Mass"> 
                        <div v-if="showMuscleError" class="error-message"> The number must be positive and not greater than the weight.</div> 
                <br>
                <label for="">Date</label> 
                    <input type="text" v-model="date" id="date" placeholder="Fats %"> 
                <br>
            </form>

          </div>
        <div>
          <button @click="updateDataBase()" style="text-align: center" type="submit">
            Submit
          </button>
        </div>
      </div>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="@/assets/images/cross-icon.png" alt="" />
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "@firebase/firestore";

export default {
  name: "UpdateForm",
  data() {
    return {
      fats:"",
      weight: "",
      muscle: "",
      date: "",
      isLoading: false,
      showFatsError: false,
      showWeightError: false,
      showMuscleError: false,
    }
  },
  props: {
    "clientName" :"",
    "clientEmail":""
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.$store.dispatch("fetchUser", user);
    });
  },
  methods: {
    async updateDataBase() {
      this.loading = true;
      const clientRef = doc(db, "client", this.clientEmail);
      const querySnapshot = await getDoc(clientRef);
      // Retrieve the client information
      const clientData = querySnapshot.data();
      let clientFatPercentage = clientData.fatPercentage;
      let clientWeight = clientData.weight;
      let clientMuscleMass = clientData.muscleMass;
      let clientDate = clientData.datetime;
      console.log(this.fats);
      //pushing the form data into the array before updating the database
      clientFatPercentage.push(this.fats);
      clientWeight.push(this.weight);
      clientMuscleMass.push(this.muscle);
      clientDate.push(this.date)
      //Updating the database
    //   updateDoc(clientRef, {
    //     fatPercentage: clientFatPercentage,
    //     weight: clientWeight,
    //     muscleMass: clientMuscleMass,
    //     date: clientDate,
    //   }).then((response) => {
    //     this.isLoading =false;
    //     location.reload();
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    },
    checkFatsInput(value) {
      this.showFatsError = value > 100 || value < 0;
    },
    checkWeightInput(value) {
        this.showWeightError = value < 0;
    },
    checkMuscleInput(value) {
        this.showMuscleError = this.weight < value || value < 0;
    }
  }
}
</script>

<style scope>
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
  background-color: black;
  font-family: Teko;
  height: 90%;
  width: 90%;
  margin-top: 6%;
  border-radius: 25px;
  border-style: solid;
  border-color: #ED1F24;
  border-width: 0.2em;
  max-width: 50%;
  max-height: 70%;
  font-size: 28px;
  padding: 30px 50px;
  text-align: center;
}
.modal::-webkit-scrollbar {
  display: none;
}
#update-form {
    background-color: white;
    border-radius: 25px;
    padding: 1em 2em;
}
input {
    border-radius: 25px;
    margin: 0.2em 1em;
    padding: 0em 0.5em;
}
label {
    color: black
}
.close {
  margin: 6% 0 0 10px;
  cursor: pointer;
}
.close-img {
  width: 25px;
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
  margin-top: 30px;
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
hr {
    border: none;
    height: 4px;
    background-color: white;
    opacity: 1;
}
.error-message {
  color: red;
  font-weight: bold;
}
</style>