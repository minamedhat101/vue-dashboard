<template>
  <div class="gmap_canvas">
    <h1>Update User</h1>
    <br>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex md4 mx-2>
            <v-text-field label="First Name" v-model="fname" type="text"></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <v-text-field label="Last Name" v-model="lname"></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <v-text-field label="Phone Number" v-model="phoneNumber" type="number"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md4 mx-2>
            <v-text-field label="Email" v-model="email"></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <v-select
              v-model="gender"
              :items="genderItem"
              offset-y
              item-text="state"
              item-value="value"
              label="Gender"
              return-object
            ></v-select>
          </v-flex>
          <v-flex md4 mx-2>
            <v-select v-model="blood" :items="bloodItems" offset-y label="Blood Type"></v-select>
          </v-flex>
        </v-layout>
        
        <v-layout>
          <v-flex md6>
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
          <v-flex md6 pt-3 mx-2>
            <v-btn class="btn" color="success" @click="post">Done</v-btn>
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
      email: "",
      password: "",
      conpassword: "",
      phoneNumber: ""
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$http.get(`/patient/${this.$route.params.idPatient}`).then(res => {
        const data = res.data;
        this.fname = data.fristName;
        this.lname = data.lastName;
        this.email = data.email;
        this.date = data.dateOfBirth;
        this.phoneNumber = data.phoneNumber;
        this.blood = data.bloodType;
        this.gender = {
          value: data.gender
        };
      });
    },
    post() {
      const fd = {
        email: this.email,
        password: this.password,
        gender: this.gender.value,
        fristName: this.fname,
        lastName: this.lname,
        dateOfBirth: "1997-03-01T11:30:33.000Z",
        phoneNumber: this.phoneNumber,
        bloodType: this.blood
      };
      this.$http
        .patch(`patient/${this.$route.params.idPatient}`, fd)
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
