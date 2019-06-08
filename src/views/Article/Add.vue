<template>
  <div>
    <h1>Add Artical</h1>
    <v-card>
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
              <v-textarea label="Text" v-model="text"></v-textarea>
            </v-flex>
            <v-flex xs12 md8>
              <v-select
                v-model="staff"
                :items="staffData"
                item-text="name"
                item-value="_id"
                return-object
                label="Author"
                persistent-hint
              ></v-select>
            </v-flex>
            <v-flex xs12 md4 pt-4>
              <input type="file" @change="onFileSelected">
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="back">Back</v-btn>
        <v-btn color="info" @click="post">Add</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staffData: [],
      staff: {},
      text: "",
      title: "",
      selectedFile: "",
      date: new Date().toISOString().substr(0, 10),
      menu2: false
    };
  },
  methods: {
    back() {
      this.$router.push("/artical");
    },
    post() {
      let data = new FormData();
      data.append("text", this.text);
      data.append("title", this.title);
      data.append("author", this.staff._id);
      data.append("date", "2019-02-14T15:52:06.829Z");
      data.append("myImage", this.selectedFile);

      this.$http
        .post(`/article`, data)
        .then(res => {
          this.$router.push("/artical");
        })
        .catch(err => console.log(err));
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    getAuthors() {
      this.$http
        .get("/employee")
        .then(res => {
          const data = res.data.result;
          for (let k in data) {
            const user = data[k];
            this.staffData.push({
              name: user.fristName + " " + user.lastName,
              _id: user._id
            });
          }
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.getAuthors();
  }
};
</script>
