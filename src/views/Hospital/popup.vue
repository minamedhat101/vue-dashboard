<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500" >      

      <template v-slot:activator="{ on }">
        <v-btn flat icon color="pink"  @click="show"  v-on="on">
          <v-icon>map</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline info lighten-2" style="color:white" primary-title>
          <h3>Location</h3>
        </v-card-title>

        <v-card-text>
          <iframe
              width="400"
              height="300"
              id="gmap_canvas"
              :src="locationSrc"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="dialog = false">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    loc: ""
  },
  data() {
    return {
      dialog: false,
      locationSrc:"https://maps.google.com/maps?q=" +
        this.loc+
        "&t=&z=13&ie=UTF8&iwloc=&output=embed"
    };
  },
  methods: {
    show() {
      console.log(loc)
      // this.$store.dispatch("getUser", this.nid);
    }
  },created(){
    this.show()
  }
  // computed: {
  //   ...mapGetters({
  //     userData: "userDataShow"
  //   })
  // },
};
</script>
