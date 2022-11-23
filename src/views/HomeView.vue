<template>
  <v-row justify="center" align="center" class="main-wrapper">
    <v-app-bar color="deep-purple lighten-2" dark app>
      <v-toolbar-title>Tumor-Detect</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-col cols="8" class="d-flex justify-center align-center"
      ><h1 class="text-h2 font-weight-normal">Brain Tumor Detection</h1></v-col
    >
    <v-col cols="8" class="d-flex justify-space-around align-center"
      ><v-btn x-large outlined class="text-h4 font-weight-regular"
        >Register</v-btn
      >
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            x-large
            outlined
            v-bind="attrs"
            v-on="on"
            class="text-h4 font-weight-regular"
            >Login</v-btn
          >
        </template>
        <v-list>
          <v-list-item @click="doctorLogin">
            <v-list-item-title link>
              <v-dialog v-model="dialog" persistent max-width="590">
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
                <v-card class="">
                  <v-card-title class="text-h5">Doctor Login </v-card-title>
                  <v-card-text>
                    <v-text-field
                      label="username"
                      type="text"
                      v-model="doctorUsername"
                    ></v-text-field>
                    <v-text-field
                      label="password"
                      type="password"
                      v-model="doctorPassword"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      login
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="patientLogin">
            <v-list-item-title link>
              <v-dialog v-model="dialog1" persistent max-width="590">
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
                <v-card>
                  <v-card-title class="text-h5"> Patient Login </v-card-title>
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
                    <v-btn color="green darken-1" text @click="dialog1 = false">
                      Login
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="technicianLogin">
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
                <v-card>
                  <v-card-title class="text-h5">
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
                    <v-btn color="green darken-1" text @click="dialog2 = false">
                      Login
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="admin">
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
                  <v-card-title class="text-h5"> Admin Login </v-card-title>
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
                    <v-btn color="green darken-1" text @click="dialog3 = false">
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
};
</script>
<style>
.main-wrapper {
  height: 100vh;
}
.login-style {
  min-width: 500px;
}
</style>
