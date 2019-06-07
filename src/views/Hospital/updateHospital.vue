<template>
  <div>
    <h1>Update Hospital</h1>
    <br>
    <hr>
    <br>
    <v-layout row class="mt-4">
      <v-flex xs6 md6>
        <v-text-field class="mr-2" v-model="data.name" label="Name" type="name"></v-text-field>
      </v-flex>
      <v-flex xs6 md6>
        <v-text-field class="ml-2" v-model="data.phoneNumber" label="Phone" type="number"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-4">
      <v-flex xs6 md6>
        <v-select
          label="Departments"
          v-model="data.departments"
          :items="states"
          item-value="_id"
          item-text="name"
          return-object
          multiple
        ></v-select>
      </v-flex>
    </v-layout>
    <v-btn @click="back" right>Back</v-btn>
    <v-btn @click="update" right>Update</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // data: "",
      data: {
        name: "",
        phoneNumber: "",
        departments: []
      },
      states: []
    };
  },
  created() {
    // (this.data = this.$route.params.idHospital),
    console.log(this.$route.params.idHospital);
    this.getDep(), this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get(`hospital/${this.$route.params.idHospital}`)
        .then(res => {
          this.data.name = res.data.name;
          this.data.phoneNumber = res.data.phoneNumber;
          // this.data.deparstments = res.data.departments
          for (let n in res.data.departments) {
            this.data.departments.push({
              name: res.data.departments[n].name,
              _id: res.data.departments[n]._id,
              description: res.data.departments[n].description
            });
          }
        })
        .catch(err => console.log(err));
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
      });
    },
    update() {
      this.$http
        .patch(`hospital/${this.$route.params.idHospital}`,this.data)
        .then(res => {
          console.log(res);
          this.$router.push("/hospital");
        });
    },
    back() {
      this.$router.push("/hospital");
    }
  }
};
</script>

