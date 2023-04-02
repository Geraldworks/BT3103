<template>
<div>
  <!-- Whats left is that the type for the input has to be number and need to be required
  Front end has to be improved -->

  <CModalHeader class="testing">
    <CModalTitle>Update stats {{ clientName }}</CModalTitle>
  </CModalHeader>
  <CModalBody class="testing">
    <CRow class="mb-3">
      <CFormLabel type="number"  class="testing">Fats percentage</CFormLabel>
      <div class="col-sm-10">
        <CFormInput type="text" id="fats" v-model.number= "fats"/>
      </div>
    </CRow>
    <CRow class="mb-3">
      <CFormLabel type="number" class="testing">Weight</CFormLabel>
      <div class="col-sm-10">
        <CFormInput type="text" id="weight" v-model= "weight"/>
      </div>
    </CRow>
    <CRow class="mb-3">
      <CFormLabel type="number" class="testing">Muscle Mass</CFormLabel>
      <div class="col-sm-10">
        <CFormInput type="text" id="muscle" v-model= "muscle"/>
      </div>
    </CRow>
    <CRow class="mb-3">
      <CFormLabel type="text"  class="testing">Date</CFormLabel>
      <div class="col-sm-10">
        <CFormInput type="text" id="date" v-model= "date"/>
      </div>
    </CRow>            
      <button @click="updateDataBase">Submit
        <div v-if="isLoading" class="spinner-border spinner-border-sm">
        </div>
      </button>
  </CModalBody>
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
      updateDoc(clientRef, {
        fatPercentage: clientFatPercentage,
        weight: clientWeight,
        muscleMass: clientMuscleMass,
        date: clientDate,
      }).then((response) => {
        this.isLoading =false;
        location.reload();
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
.testing {
  color: white;
}
</style>