<template>
  <v-card class="fnt">
    <!-- <v-text-field v-model="filter" prepend-icon="search" type="number" label="Filter Search" solo></v-text-field> -->
    <!-- <p>{{filter}}</p> -->
    <!-- <p>{{testFun}}</p> -->
    <v-layout row wrap>
      <v-flex xs3 md3 class="pa-3">
        <div class="caption grey--text">Name</div>
      </v-flex>
      <v-flex xs3 md3 class="pa-3">
        <div class="caption grey--text">Department</div>
      </v-flex>
      <v-flex xs3 md3 class="pa-3">
        <div class="caption grey--text">Phone Number</div>
      </v-flex>
      <v-flex xs3 md3 class="pa-3">
        <div class="caption grey--text">Tools</div>
      </v-flex>
    </v-layout>

    <v-layout class="hover" row wrap v-for="(x,i) in hospitalData" :key="i" style="cursor : pointer">
      <v-flex xs3 md3 class="pa-3" @click="getLi(x)" >
        <div  >
          {{ x.name }}
        </div>
      </v-flex>
      <v-flex xs3 md3 class="pa-3">
        <div  @click="getLi(x)">{{ x.departments }}</div>
      </v-flex>
      <v-flex xs3 md3 class="pa-3">
        <div >{{ x.phoneNumber }}</div>
      </v-flex>
      <v-flex xs1 md2>
        <v-layout row wrap>
          <v-flex xs3 md3>
            <v-btn flat icon color="pink" @click="getEdit(x)">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs3 md3>
            <v-btn flat icon color="pink" @click="getDelete(x,i)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs3 md3>
            <popup :loc="x.name"/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>

</template>

<script>
import popup from "./popup"
export default {
  components:{
    popup
  },
  data() {
    return {
      expand: false,
      dep: "",
      states: [],
      headers: [
        {
          text: "Name ",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Phone", value: "phone" },
        { text: "Departments", value: "dep" }
      ],
      hospitalData: []
    };
  },
  methods: {
    getDep() {
      this.$http.get("/department").then(res => {
        const data = res.data;
        for (let k in data) {
          const state = {
            state: data[k].name,
            value: data[k]._id
          };
          this.states.push(state);
        }

        console.log(this.states);
      });
    },
    getHospitalData() {
      this.$http
        .get("hospital")
        .then(res => {
          const data = res.data;
          for (let k in data) {
            let field = {
              _id: data[k]._id,
              name: data[k].name,
              phoneNumber: data[k].phoneNumber,
              departments: []
            };
            for (let n in data[k].departments) {
              field.departments.push(data[k].departments[n].name);
            }
            this.hospitalData.push(field);
          }
          // console.log(res)
        })
        .then(data => {
          console.log(22);
          console.log(this.hospitalData);
        });
    },getDelete(x, i) {
      console.log(x)
      this.$http
        .delete(`/hospital/${x._id}`)
        .then(res => {
          console.log(res);
        })
        .then(() => {
          this.hospitalData.splice(i,1)
        });
    },
    aa(des) {
      console.log(des);
    }
  },
  created() {
    this.getDep(), this.getHospitalData();
  }
};
</script>

<style scoped>
</style>
