<template>
  <v-container>
    <NavBar />
    <h1 class="text-h3 font-weight-black">Technician</h1>
    <router-view> </router-view>
  </v-container>
</template>
<script>
import NavBar from "../../components/navbar.vue";
export default {
  name: "TechnicianDashboard",
  components: { NavBar },
};
</script>
