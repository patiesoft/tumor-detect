<template>
  <v-row justify="center" align="center">
    <v-col cols="8">Add Doctor</v-col>
    <v-col cols="8" class="d-flex flex-column">
      <v-form ref="form" v-model="valid" lazy-validation class="form-style">
        <v-text-field
          v-model="username"
          :rules="nameRules"
          label="UserName"
          required
        ></v-text-field>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="surname"
          :rules="nameRules"
          label="Surname"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="phone"
          :rules="nameRules"
          label="Phone Number"
          required
        ></v-text-field>

        <v-text-field
          v-model="specialization"
          :rules="specializationRules"
          label="Specialization"
          required
        ></v-text-field>

        <v-text-field
          v-model="experience"
          :rules="experienceRules"
          label="Experience"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-btn color="success" class="mr-4" @click="register"> Register </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
import { registerDoctor } from "../../firebase";
export default {
  name: "AddDoctor",
  data: () => ({
    username: "",
    name: "",
    surname: "",
    email: "",
    experience: "",
    specialization: "",
    phone: "",
    password: "",

    phoneRules: [],
    usernameRules: [],
    nameRules: [],
    surnameRules: [],
    emailRules: [],
    experienceRules: [],
    specializationRules: [],
    passwordRules: [],
  }),
  methods: {
    reset() {
      this.username = "";
      this.name = "";
      this.surname = "";
      this.email = "";
      this.experience = "";
      this.specialization = "";
      this.phone = "";
      this.password = "";
    },
    register() {
      if (
        !this.username ||
        !this.name ||
        !this.surname ||
        !this.specialization ||
        !this.experience ||
        !this.email ||
        !this.password ||
        !this.phone
      )
        return;
      registerDoctor({
        username: this.username,
        name: this.name,
        surname: this.surname,
        specialization: this.specialization,
        experience: this.experience,
        email: this.email,
        password: this.password,
        phone: this.phone,
      }).then(() => {
        this.reset();
        alert("Doctor Added!");
      });
    },
  },
};
</script>
<style>
.form-style {
  max-width: 1400px;
}
</style>
