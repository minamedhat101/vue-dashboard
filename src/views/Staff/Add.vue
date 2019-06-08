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
          <v-flex md4 mx-2>
            <v-select
              v-model="userType"
              :items="userTypeItems"
              offset-y
              item-text="name"
              item-value="_id"
              label="User Type"
              return-object
              single-line
            ></v-select>
          </v-flex>
          <v-flex md4 mx-2>
            <v-select
              v-model="hospital"
              :items="hospitalItems"
              offset-y
              item-text="name"
              item-value="_id"
              label="Hospital"
              return-object
              single-line
            ></v-select>
          </v-flex>
          <v-flex md4 mx-2>
            <v-select
              v-model="departments"
              :items="states"
              item-text="name"
              item-value="_id"
              return-object
              label="Departments"
              persistent-hint
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md2 mx-2>
            <v-text-field label="Street" v-model="street" single-line></v-text-field>
          </v-flex>
          <v-flex md2>
            <v-text-field label="State" v-model="state" single-line></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <v-text-field label="City" v-model="city" single-line></v-text-field>
          </v-flex>
          <v-flex md4 mx-2>
            <v-select
              v-model="qualification"
              :items="qualificationItems"
              label="Qualifications"
              multiple
              persistent-hint
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md6>
            <input type="file" @change="onFileSelected">
          </v-flex>
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
      userType: { name: "", _id: "" },
      userTypeItems: [],
      hospital: { name: "", _id: "" },
      hospitalItems: [],
      departments: [],
      states: [],
      qualification: [],
      qualificationItems: ["Phd", "Master Degree"],
      fname: "",
      lname: "",
      nID: "",
      email: "",
      password: "",
      conpassword: "",
      phoneNumber: "",
      street: "",
      city: "",
      state: "",
      selectedFile: null
    };
  },
  created() {
    this.getDep(), this.getHospital(), this.getUserType();
  },
  methods: {
    getDep() {
      this.$http.get("/department").then(res => {
        const data = res.data;
        for (let k in data) {
          let state = {
            name: data[k].name,
            _id: data[k]._id,
            description: data[k].description
          };
          this.states.push(state);
        }
      });
    },
    getHospital() {
      this.$http.get("/hospital").then(res => {
        const data = res.data;
        for (let k in data) {
          let state = {
            name: data[k].name,
            _id: data[k]._id
          };
          this.hospitalItems.push(state);
        }
      });
    },
    getUserType() {
      this.$http.get("/userType").then(res => {
        const data = res.data;
        for (let k in data) {
          let state = {
            name: data[k].name,
            _id: data[k]._id
          };
          this.userTypeItems.push(state);
        }
      });
    },
    post() {
      const fd = new FormData();
      fd.append("myImage", this.selectedFile);
      fd.append("street", this.street);
      fd.append("city", this.city);
      fd.append("state", this.state);
      for (let k in this.qualification) {
        fd.append("qulaifications", this.qualification[k]);
      }
      fd.append("email", this.email);
      fd.append("password", this.password);
      fd.append("gender", this.gender.value);
      fd.append("fristName", this.fname);
      fd.append("lastName", this.lname);
      fd.append("dateOfBirth", "1997-03-01T11:30:33.000Z");
      fd.append("phoneNumber", this.phoneNumber);
      fd.append("nationalID", this.nID);
      fd.append("userType", this.userType._id);
      fd.append("hospital", this.hospital._id);
      fd.append("department", this.departments._id);
      if (this.password == this.conpassword) {
        this.$http
          .post("employee/signup", fd)
          .then(res => {
            console.log(res);
            this.$router.push("/staff");
          })
          .catch(err => console.log(err));
      } else {
        console.log("El password ya3m");
      }
    },
    back() {
      this.$router.push("/staff");
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
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
