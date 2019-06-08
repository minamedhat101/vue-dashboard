<template>
  <div>
    <v-text-field v-model="filter" prepend-icon="search" type="number" label="Filter Search" solo></v-text-field>
    <v-card class="fnt">
      <!-- <p>{{filter}}</p> -->
      <!-- <p>{{testFun}}</p> -->
      <v-layout row wrap>
        <v-flex xs3 md4 class="pa-3">
          <div class="caption grey--text">Name</div>
        </v-flex>
        <v-flex xs3 md4 class="pa-3">
          <div class="caption grey--text">Email Address</div>
        </v-flex>
        <v-flex xs3 md3 class="pa-3">
          <div class="caption grey--text">Phone Number</div>
        </v-flex>
        <v-flex xs3 md1 class="pa-3">
          <div class="caption grey--text">Tools</div>
        </v-flex>
      </v-layout>

      <v-layout
        class="hover"
        row
        wrap
        v-for="(x,i) in filterData"
        :key="i"
        style="cursor : pointer"
      >
        <v-flex xs3 md4 class="pa-3" @click="getLi(x)">
          <div>{{ x.fristName }} {{x.lastName}}</div>
        </v-flex>
        <v-flex xs3 md4 class="pa-3">
          <div @click="getLi(x)">{{ x.email }}</div>
        </v-flex>
        <v-flex xs3 md3 class="pa-3">
          <div>{{ x.phoneNumber }}</div>
        </v-flex>
        <v-flex xs1 md1>
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
              <popup :id="x._id" @click="ss(x._id)"/>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import popup from "./popup";
export default {
  components: {
    popup
  },
  data() {
    return {
      userData: [],
      counter: "",
      filter: ""
    };
  },
  methods: {
    ss(s) {
      console.log(s);
    },
    //For View Profile
    getLi(x) {
      // this.$router.push(`/clients/view/${x.nationalID}`);
    },
    //For Edit(Update) Component
    getEdit(x) {
      this.$router.push(`/user/updateUser/${x._id}`);
    },
    //For Delete This User
    getDelete(x, i) {
      this.$http
        .delete(`/user/${x._id}`)
        .then(res => {
          console.log(res);
        })
        .then(() => {
          this.userData.splice(i, 1);
        });
    }
  },
  created() {
    this.$http.get("/user").then(res => {
      const data = res.data.result;
      for (let k in data) {
        const user = data[k];
        this.userData.push(user);
      }
      console.log(this.userData)
    });
  },
  computed: {
    filterData() {
      return this.userData.filter(element => {
        return element.phoneNumber.match(this.filter);
      });
    }
  }
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.hover:hover {
  color: rgb(255, 123, 0);
}
</style>
