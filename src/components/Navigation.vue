<template>
  <nav>
    <v-toolbar class=" darken-1 white--text" app flat >
      <v-toolbar-side-icon v-if="showNav" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title style="color:black">Health Care</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items v-if="showNav" class="hidden-sm-and-down">
        <v-btn flat>
          <span style="text-transform: capitalize" class="pr-1">{{getName}}</span>
          <v-avatar size="30">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
          </v-avatar>
        </v-btn>
        <v-btn flat @click="signOut">
          <span>Sign Out</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <NavigationDrawer :draw="drawer"></NavigationDrawer>
  </nav>
</template>

<script>
import NavigationDrawer from "./NavigationDrawer";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    NavigationDrawer
  },
  data() {
    return {
      dropdown_font: ["Arial", "Calibri", "Courier", "Verdana"],
      token: false,
      drawer: false
    };
  },
  computed: {
    ...mapGetters({
      showNav: "showNavBar",
      getName: "getName"
    })
  },methods: {
    signOut(){
      this.$store.dispatch('logOut')
      this.$router.push('/signin')
    }
  }
};
</script>


<style>
</style>
