<template>
  <div>
    <main>
      <router-view/>
    </main>
  </div>

</template>

<script>
import Navbar from './components/client/Navbar.vue';
import '@coreui/coreui/dist/css/coreui.min.css';

export default {
    name: "App",
};
</script>
<style>
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100%;
}
body {
  background-color: black;
}
</style>