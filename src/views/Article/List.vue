<template>
  <div>
    <v-text-field v-model="filter" prepend-icon="search" label="Filter Search" solo></v-text-field>

    <v-layout row wrap>
      <v-flex xs12 pa-2 sm6 md6 v-for="(x,i) in filterData" :key="x._id">
        <v-card>
          <v-img :src="x.img" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h1 class="mb-0">{{x.title}}</h1>
              <div>{{ x.text }}</div>
              <br>
              <h4 class="mb-0">Author : {{x.author}}</h4>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <popup :id="x._id"/>
            <v-btn @click="getDelete(x,i)" icon>
              <v-icon>delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import popup from "./popup";
export default {
  components:{
    popup
  },
  data() {
    return {
      data: [],
      filter: ""
    };
  },
  created() {
    this.getArticals();
  },
  methods: {
    getArticals() {
      this.$http.get("/article").then(res => {
        const data = res.data;
        for (let k in data) {
          const row = data[k];
          this.data.push({
            _id: row._id,
            text: row.text,
            title: row.title,
            author: row.author.fristName + " " + row.author.lastName,
            img: "https://healthapi.herokuapp.com/uploads/" + row.picture
          });
        }
      });
    },
    getDelete(x, i) {
      this.$http
        .delete(`/article/${x._id}`)
        .then(res => {
          console.log(res);
        })
        .then(() => {
          this.data.splice(i, 1);
        });
    }
  },
  computed: {
    filterData() {
      return this.data.filter(element => {
        return element.title.match(this.filter);
      });
    }
  }
};
</script>
