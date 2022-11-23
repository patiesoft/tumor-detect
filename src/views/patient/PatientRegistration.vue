<template>
  <v-row align="center" justify="center" :style="registerStyle">
    <v-col class="d-flex justify-center align-center">
      <v-text-field label="First Name" class="mr-4"></v-text-field>
      <v-text-field label="Last Name" class="ml-4"></v-text-field>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "PatientRegister",
  data: () => ({
    registerStyle: {
      "max-width": "560px",
    },
  }),
};
</script>
