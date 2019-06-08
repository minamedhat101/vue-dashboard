<template>
  <div class="gmap_canvas">
    <h1>Add New Hospital</h1>
    <br>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex md4 mx-2>
            <v-text-field label="Name" v-model="name" single-line></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <v-text-field label="Phone Number" v-model="phone" type="number" single-line></v-text-field>
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
            <input type="file" @change="onFileSelected">
            <v-btn @click="post">Done</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      phone: "",
      departments: [],
      locationModel: "Cairo",
      locationSrc: "",
      states: [],
      selectedFile: null,
      coordinates:[30.1223159, 31.3676931]
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      // center: { lat: 45.508, lng: -73.587 },
      // markers: [],
      // places: [],
      // currentPlace: null
    };
  },

  created() {
    this.getDep(), this.check();

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
      const fd = new FormData();
      fd.append("name", this.name);
      fd.append("phoneNumber", this.phone);
      fd.append("coordinates", this.coordinates[0]);
      fd.append("coordinates", this.coordinates[1]);
      fd.append("myImage", this.selectedFile);
      for(let k in this.departments){
        console.log(this.departments[k])
        fd.append("departments", this.departments[k]._id);
      }
      this.$http
        .post("hospital", fd )
        .then(res =>{
          console.log(res)
          this.$router.push("/hospital");
        } )
        .catch(err => console.log(err));
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
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