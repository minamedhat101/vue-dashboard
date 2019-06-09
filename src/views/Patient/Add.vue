<template>
  <div class="gmap_canvas">
    <h1>Add New Patient</h1>
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
            <v-select v-model="blood" :items="bloodItems" label="Blood Type" persistent-hint></v-select>
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
                  label="Birth Date"
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
          <v-flex md3 mx-2>
            <v-text-field label="Phone Number" v-model="phoneNumber" type="number" single-line></v-text-field>
          </v-flex>
          <v-flex md3 mx-2>
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
          <v-flex md6 mx-2>
            <v-layout>
              <v-flex md3 mx-2>
                <v-text-field label="Street" v-model="street" single-line></v-text-field>
              </v-flex>
              <v-flex md3>
                <v-text-field label="State" v-model="state" single-line></v-text-field>
              </v-flex>
              <v-flex md6 mx-2>
                <v-text-field label="City" v-model="city" single-line></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex md6></v-flex>
          <v-flex md6 mx-2>
            <v-btn class="btn" @click="post">Done</v-btn>
            <v-btn class="btn" @click="back">Back</v-btn>
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
      show: false,
      show2: false,
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      gender: { state: "", value: "" },
      genderItem: [
        { state: "Male", value: "male" },
        { state: "Female", value: "female" }
      ],
      blood: "",
      bloodItems: ["A-Negative", "B-Negative"],
      fname: "",
      lname: "",
      nID: "",
      email: "",
      phoneNumber: "",
      street: "",
      city: "",
      state: ""
    };
  },
  methods: {
    post() {
      const fd = {
        street:this.street,
        city: this.city,
        state:this.state,
        bloodType:this.blood,
        email:this.email,
        gender:this.gender.value,
        fristName: this.fname,
        lastName: this.lname,
        dateOfBirth: "1997-03-01T11:30:33.000Z",
        phoneNumber: this.phoneNumber,
        nationalID: this.nID
      }
      this.$http
        .post("/patient", fd)
        .then(res => {
          console.log(res);
          this.$router.push("/patient");
        })
        .catch(err => console.log(err));
    },
    back() {
      this.$router.push("/patient");
    }
  }
};
</script>
<style  scoped>
.btn {
  padding: 0 50px;
  text-align: center;
  float: right;
}
</style>
