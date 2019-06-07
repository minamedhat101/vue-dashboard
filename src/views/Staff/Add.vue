<template>
  <div class="gmap_canvas">
    <h1>Add New Staff</h1>
    <br>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex md4 mx-2>
            <v-text-field label="First Name" v-model="fname" single-line></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <v-text-field label="Last Name" v-model="lname" type="text" single-line></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <v-text-field label="National ID" v-model="nID" type="number" single-line></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md4 mx-2>
            <v-text-field label="Email" v-model="email" single-line></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <v-text-field
              label="Password"
              v-model="password"
              @click:append="show = !show"
              :append-icon="show ? 'visibility' : 'visibility_off'"
              :type="show ? 'text' : 'password'"
            ></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <v-text-field
              label="Confirm Password"
              v-model="conpassword"
              @click:append="show2 = !show2"
              :append-icon="show2 ? 'visibility' : 'visibility_off'"
              :type="show2 ? 'text' : 'password'"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md4 mx-2>
            <v-text-field label="Phone Number" v-model="phoneNumber" type="number" single-line></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <!-- gender -->
            <v-select
              v-model="gender"
              :items="genderItem"
              offset-y
              item-text="state"
              item-value="value"
              label="Gender"
              return-object
              single-line
            ></v-select>
          </v-flex>
          <v-flex md4 mx-2>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Picker without buttons"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md4 mx-2>
            <v-text-field label="Phone" v-model="phoneNumber" type="number" single-line></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <!-- gender -->
            
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
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      show: false,
      show2: false,
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      gender: { state: "", value: "" },
      genderItem: [
        { state: "Male", value: "male" },
        { state: "Female", value: "female" }
      ],

      name: "",
      phone: "",
      departments: [],
      locationModel: "Cairo",
      locationSrc: "",
      states: [],
      selectedFile: null,
      coordinates: [30.1223159, 31.3676931]
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
      for (let k in this.departments) {
        console.log(this.departments[k]);
        fd.append("departments", this.departments[k]._id);
      }
      this.$http
        .post("hospital", fd)
        .then(res => {
          console.log(res);
          this.$router.push("/hospital");
        })
        .catch(err => console.log(err));
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    }
  }
};
</script>