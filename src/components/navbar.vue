<template>
  <v-container class="mx-auto" height="400">
    <v-app-bar color="deep-purple" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Tumor-Detect</v-toolbar-title>
      <v-spacer />
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar dense dark v-bind="attrs" v-on="on" color="grey">{{
            initials
          }}</v-avatar>
        </template>
        <v-list>
          <v-list-item :to="{ name: 'profile' }">
            <v-list-item-title> Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="signout">
            <v-list-item-title> logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
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
  </v-container>
</template>
<script>
import { logout } from "../firebase";
export default {
  name: "NavBar",
  data: () => ({
    initials: "PV",
    drawer: false,
    group: null,
  }),
  methods: {
    signout() {
      return logout();
    },
  },
};
</script>
