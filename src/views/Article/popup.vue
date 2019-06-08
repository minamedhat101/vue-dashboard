<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" persistent width="700">
      <template v-slot:activator="{ on }">
        <v-btn flat icon @click="getData" v-on="on">
          <v-icon>edit</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline info lighten-2" style="color:white" primary-title>
          <h3>Update Artical</h3>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Title" v-model="title"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
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
                    <v-text-field v-model="date" label="Date" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-textarea label="Text" v-model="text" ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="dialog = false">Back</v-btn>
          <v-btn color="info" @click="update">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    id: ""
  },
  data() {
    return {
      text:"",
      title:"",
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
    };
  },
  methods: {
    getData(){
      this.$http.get(`/article/${this.id}`).then(res => {
        const data = res.data;
        console.log(data)
        this.text = data.text
        this.title = data.title
        this.date = data.date
      });
    },update(){
      let data ={
        text :this.text,
        title :this.title,
      }
      this.$http.patch(`/article/${this.id}`,data)
      .then(res =>{
        this.dialog = false
      }).catch(err=>console.log(err))
    }
  },

};
</script>
