<template>
  <v-row justify="center" align="center" class="main-wrapper">
    <v-app-bar color="deep-purple lighten-2" dark app>
      <v-toolbar-title>Tumor-Detect</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-col cols="8" class="d-flex justify-center align-center"
      ><h1 class="heading">Automated Tumor Detection</h1></v-col
    >
    <v-col cols="8" class="d-flex justify-space-around align-center buttons"
      ><v-btn
        x-large
        outlined
        class="text-h4 font-weight-regular"
        style="
          background: #ff4742;
          margin-right: 4rem;
          border-radius: 0.5rem;
          border: solid black;
          padding: 3rem;
          font-size: 1.6rem;
          color: white;
        "
        @click="$router.push('/patient-register')"
        >Register</v-btn
      >
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            x-large
            outlined
            v-bind="attrs"
            v-on="on"
            class="button_login"
            style="
              background: #ff4742;
              margin-right: 4rem;
              border-radius: 0.5rem;
              border: solid black;
              padding: 3rem;
              font-size: 1.6rem;
              color: white;
            "
            >Login</v-btn
          >
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title link>
              <v-dialog v-model="dialog" persistent max-width="1000">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    depressed
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    Doctor
                  </v-btn>
                </template>
                <div style="display: flex">
                  <div><img src="../assets/DoctorLoginImage.jpg" /></div>
                  <div>
                    <v-card class="" style="text-align: center">
                      <v-card-title
                        class="doctor_title"
                        style="color: black; padding: 3.85rem; font-size: 2rem"
                        >Doctor Login
                      </v-card-title>
                      <v-card-text>
                        <v-text-field
                          label="Username"
                          type="text"
                          v-model="doctorUsername"
                        ></v-text-field>
                        <v-text-field
                          label="Password"
                          type="password"
                          v-model="doctorPassword"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions
                        class="center"
                        style="padding-bottom: 1rem; text-align: center"
                      >
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <div
                          style="
                            text-align: center;
                            padding: 3rem 6.3rem 3rem 6.5rem;
                            border: none;
                          "
                        >
                          <v-btn
                            color="white "
                            style="background: #ff4742; padding: 2rem"
                            text
                            @click="doctorLogin"
                          >
                            login
                          </v-btn>
                        </div>
                      </v-card-actions>
                    </v-card>
                  </div>
                </div>
              </v-dialog>
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="patientLogin">
            <v-list-item-title link>
              <v-dialog v-model="dialog1" persistent max-width="1000">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    depressed
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    Patient
                  </v-btn>
                </template>

                <div style="display: flex">
                  <div>
                    <img src="../assets/PatientLoginPage.jpeg" width="580" />
                  </div>
                  <div>
                    <v-card>
                      <v-card-title
                        class="text-h5"
                        style="color: black; padding: 3.8rem; font-size: 1.5rem"
                      >
                        Patient Login
                      </v-card-title>
                      <v-card-text>
                        <v-text-field
                          label="patientID"
                          type="text"
                          v-model="patientID"
                        ></v-text-field>
                        <v-text-field
                          label="password"
                          type="password"
                          v-model="patientPassword"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <div style="padding: 6rem 6rem 6rem 6rem">
                          <v-btn
                            color="white "
                            style="background: #ff4742; padding: 2rem"
                            text
                            @click="dialog1 = false"
                          >
                            Login
                          </v-btn>
                        </div>
                      </v-card-actions>
                    </v-card>
                  </div>
                </div>
              </v-dialog>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title link>
              <v-dialog v-model="dialog2" persistent max-width="590">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    depressed
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    Technician
                  </v-btn>
                </template>

                <div>
                  <div><img src="../assets/logo.png" /></div>
                  <div>
                    <v-card>
                      <v-card-title
                        class="text-h5"
                        style="color: black; padding: 2rem; font-size: 1.5rem"
                      >
                        Technician Login
                      </v-card-title>
                      <v-card-text>
                        <v-text-field
                          label="username"
                          type="text"
                          v-model="technicianUsername"
                        ></v-text-field>
                        <v-text-field
                          label="password"
                          type="password"
                          v-model="technicianPassword"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="white "
                          style="background: #ff4742; padding: 2rem"
                          text
                          @click="technicianLogin"
                        >
                          Login
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </div>
                </div>
              </v-dialog>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="adminLogin">
            <v-list-item-title link>
              <v-dialog v-model="dialog3" persistent max-width="590">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    depressed
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    Admin
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title
                    class="text-h5"
                    style="color: black; padding: 2rem; font-size: 1.5rem"
                  >
                    Admin Login
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      label="username"
                      type="text"
                      v-model="adminUsername"
                    ></v-text-field>
                    <v-text-field
                      label="password"
                      type="password"
                      v-model="adminPassword"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="white "
                      style="background: #ff4742; padding: 2rem"
                      text
                      @click="dialog3 = false"
                    >
                      Login
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
    <v-footer dark app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Team Cosmos</strong>
      </v-col>
    </v-footer>
  </v-row>
</template>
<script>
import { login } from "../firebase";
export default {
  name: "LandingPage",
  components: {},
  data: () => ({
    dialog: false,
    dialog1: false,
    dialog2: false,
    dialog3: false,
    doctorPassword: "",
    doctorUsername: "",
    patientPassword: "",
    patientID: "",
    technicianPassword: "",
    technicianUsername: "",
    adminPassword: "",
    adminUsername: "",
  }),
  methods: {
    doctorLogin() {
      console.log("hey");
      return login({
        doctorID: this.doctorUsername,
        password: this.doctorPassword,
        userType: "doctor",
      }).then(() => {
        this.$router.push("/doctor");
      });
    },
    async patientLogin() {},
    async adminLogin() {},
    technicianLogin() {
      this.$router.push("/technician");
    },
  },
};
</script>
<style scoped>
* {
  color: white;
}
.heading {
  font-size: 6rem;
  font-weight: 300;
  margin-top: 9rem;
}
.buttons {
  margin-top: -20rem;
}
.button_login:hover {
  color: #232344;
}
.main-wrapper {
  height: 100vh;
  background: black;
}
.doctor_title {
  color: black;
  padding: 1rem;
  text-align: center;
  font-size: 3rem;
}
.login-style {
  min-width: 500px;
}
</style>
