<template>
  <v-row>
    <v-app-bar color="deep-purple" dark app>
      <v-toolbar-title class="font-weight-black">Tumor-Detect</v-toolbar-title>
      <v-spacer />
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar dense dark v-bind="attrs" v-on="on" color="grey">{{
            initials
          }}</v-avatar>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title> Profile</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title> logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app permanent>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="$router.push('/doctor/review')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>In Review</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push('/doctor/patient-history')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Patients</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-book</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Reports</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <router-view class="ma-4" />
  </v-row>
</template>

<script>
export default {
  name: "DoctorDashboard",
  data: () => ({
    initials: "PV",
    drawer: false,
    group: null,
  }),
};
</script>
