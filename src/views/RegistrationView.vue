<template>
<div >
  <v-row
    justify="center"
    align="center"
    class="register-height gradient-background-color"
    
  >
 
    <v-col cols="12" style="margin-bottom:-8rem">
      <h1 class="text-center text-h3 font-weight-black"  style="color:black" >Patient Registration</h1>
    </v-col>

    <v-progress-circular
      :size="50"
      color="black"
      indeterminate
      v-if="showLoader"
      >Signing In</v-progress-circular
    >
    <v-card elevation="2" min-width="30vw" class="py-2" v-else style="background:white ;padding-left:1.5rem;padding-right:1.5rem ; border-radius:1rem">
      <v-row class="mx-1 my">
        <v-col style="margin-top:2rem">
          <v-text-field label="Name" outlined v-model="name" ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-1 my">
        <v-col>
          <v-text-field
            label="Surname"
            outlined
            v-model="surname"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-1 my">
        <v-col>
          <v-text-field
            label="PinCode"
            outlined
            v-model="pinCode"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-radio-group v-model="gender" row label="Gender" >
            <v-radio label="Male" value="male"></v-radio>
            <v-radio label="Female" value="female"></v-radio>
            <v-radio label="Other" value="other"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row class="mx-1">
        <v-col>
          <v-text-field label="Age" outlined v-model="age"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Phone Number"
            outlined
            v-model="phoneNumber"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mx-1">
        <v-col>
          <v-text-field
            label="Email"
            outlined
            v-model="email"
            type="email"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mx-1">
        <v-col>
          <v-text-field
            label="Password"
            outlined
            v-model="password"
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-divider />
      <v-row class="mt-1 mb-2" justify="center">
        <v-col class="d-flex justify-center">
          <v-btn
            x-large
            outlined
            curved
            color="red"
            class="font-weight-bold mr-4"
            @click="$router.go(-1)"
            ><v-icon> mdi-arrow-left </v-icon>Back</v-btn
          >
          <v-btn
          style="background:#ff4742"
            x-large
            outlined
            curved
            color="white"
            class="font-weight-bold"
            @click="register"
            ><v-icon> mdi-lead-pencil </v-icon>Register</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-row>
  </div>
</template>
<script>
//import FooterComponent from "../components/FooterComponent.vue";
import { registerPatient} from "../firebase/auth.js";
export default {
  name: "RegistrationView",
  data: () => ({
    showLoader: false,
    registrationType: "Passenger",
    name: "",
    surname: "",
    gender: "",
    phoneNumber: "",
    pinCode: "",
    password: "",
    age: "",
    email: "",
  }),
  computed: {
    canRegister() {
      return (
        this.name !== "" &&
        this.surname !== "" &&
        this.gender !== "" &&
        this.phoneNumber !== "" &&
        this.password !== "" &&
        this.age !== "" &&
        this.email !== "" &&
        this.pinCode !== ""
      );
    },
  },

  /* mounted() { */
  /*   console.log("checking set email"); */
  /*   if (!this.$store.getters.getSetEmail) this.$router.push("/"); */
  /* }, */
  methods: {
    register() {
      if (this.canRegister) {
        console.log("Can Register");
                  return registerPatient({
            name: this.name,
            surname: this.surname,
            gender: this.gender,
            phone: this.phoneNumber,
            password: this.password,
            age: this.age,
            email: this.email,
            pinCode: this.pinCode,
          }).then(() => {
            this.$router.push("/patient");
          });
       
      }
      alert("Cannot Register, Missing Fields");
    },
  },
};
</script>
<style>
.register-height {
  height: 100vh;
}
</style>
