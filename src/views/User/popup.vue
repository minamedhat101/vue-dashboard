<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn flat icon color="pink" v-on="on">
          <v-icon>account_circle</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline info lighten-2" style="color:white" primary-title>
          <h3>User Info</h3>
        </v-card-title>

        <v-card-text>
          <p>Name : {{ userData.fristName}} {{userData.lastName}}</p>
          <p>Email : {{ userData.email}}</p>
          <p>Phone Number : {{ userData.phoneNumber}}</p>
          <p>Gender : {{ userData.gender}}</p>
          <p>Birth Date : {{ userData.dateOfBirth}}</p>
          <p>User Type : {{ userData.userType}}</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="dialog = false">Done</v-btn>
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
      userData: {},
      dialog: false
    };
  },
  created() {
    this.$http
      .get(`/user/profile/${this.id}`)
      .then(res => {
        const data = res.data.result;
        this.userData = data;
        this.$http
          .get(`/userType/${data.userType}`)
          .then(res => {
            data.userType = res.data.name;
          })
          .then(res => {
            this.userData.department = res.data.name;
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
};
</script>
