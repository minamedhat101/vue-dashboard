<template>
  <div>
    <h1>Add New Node to the Network</h1>
    <br>
    <br>
    <br>
    <v-layout row wrap>
      <v-flex md10 pa-2>
        <v-text-field label="Link" v-model="link"></v-text-field>
      </v-flex>
      <v-flex md2 pa-2>
        <v-btn @click="post" style="width:100%" class="success">Done</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      link: ""
    };
  },
  methods: {
    post() {
      this.$http
        .post("/blockchain/register-broadcast-node", {
          newNodeUrl: this.link
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }
};
</script>

