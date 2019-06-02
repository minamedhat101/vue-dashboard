<template>
  <v-app class="body">
    <Navigation></Navigation>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Navigation from "./components/Navigation";

export default {
  name: "App",
  components: {
    HelloWorld,
    Navigation
  },
  data() {
    return {
      token: false,
    };
  },
 
};
</script>


<style scoped>
.body{
  background: #fafafa;
}
</style>
