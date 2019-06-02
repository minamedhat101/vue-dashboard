<template>
  <div class="gmap_canvas">
    <h1>Add New Hospital</h1>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex md4 mx-2>
            <v-text-field label="Name" v-model="name" single-line></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <v-text-field label="Phone Number" v-model="phone" single-line></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <v-select
              v-model="departments"
              :items="states"
              item-text="name"
              item-value="_id"
              return-object
              label="Departments"
              multiple
              persistent-hint
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md6 mx-2>
            <iframe
              width="100%"
              height="200"
              id="gmap_canvas"
              :src="locationSrc"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
          </v-flex>
          <v-flex md6 mx-2>
            <v-text-field label="Location" v-model="locationModel" single-line></v-text-field>
            <v-btn @click="check">Check Location</v-btn>
            <v-btn @click="post">Done</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      name: "",
      phone: "",
      departments: [],
      locationModel: "",
      locationSrc: "",
      states: [],
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      // center: { lat: 45.508, lng: -73.587 },
      // markers: [],
      // places: [],
      // currentPlace: null
    };
  },

  created() {
    this.getDep();
    // this.geolocate();
  },

  methods: {
    check() {
      this.locationSrc =
        "https://maps.google.com/maps?q=" +
        this.locationModel +
        "&t=&z=13&ie=UTF8&iwloc=&output=embed";
    },
    getDep() {
      this.$http.get("/department").then(res => {
        const data = res.data;
        for (let k in data) {
          const state = {
            name: data[k].name,
            _id: data[k]._id,
            description: data[k].description
          };
          this.states.push(state);
        }
        console.log(this.states);
      });
    },
    post() {
      let data = {
        name: this.name,
        phoneNumber: this.phone,
        departments: this.departments
      };
      console.log(data);
      console.log(this.states);
      // this.$http.post('/hospital',)
    }
    // receives a place object via the autocomplete component
    // setPlace(place) {
    //   this.currentPlace = place;
    // },
    // addMarker() {
    //   if (this.currentPlace) {
    //     const marker = {
    //       lat: this.currentPlace.geometry.location.lat(),
    //       lng: this.currentPlace.geometry.location.lng()
    //     };
    //     this.markers.push({ position: marker });
    //     this.places.push(this.currentPlace);
    //     this.center = marker;
    //     this.currentPlace = null;
    //   }
    // },
    // geolocate: function() {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.center = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };
    //   });
    // }
  }
};
</script>