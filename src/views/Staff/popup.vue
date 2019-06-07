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
          <h3>Staff Info</h3>
        </v-card-title>

        <v-card-text>
          <p>Name : {{ staffData.fristName}} {{staffData.lastName}}</p>
          <p>Email : {{ staffData.email}}</p>
          <p>Phone Number : {{ staffData.phoneNumber}}</p>
          <p>National ID : {{ staffData.nationalID}}</p>
          <!-- <p>Address : {{ staffData.address.street}} ,{{staffData.address.city}} </p> -->
          <p>Qulaifications : {{ staffData.qulaifications}}</p>

          <p>User Type : {{ staffData.userType}}</p>
          <p>Hospital : {{ staffData.hospital}}</p>
          <p>Department : {{ staffData.department}}</p>
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
      staffData: {},
      dialog: false
    };
  },
  created() {
    this.$http.get(`/employee/profile/${this.id}`).then(res => {
      const data = res.data.result;
      this.staffData = data;
      this.$http
        .get(`/userType/${data.userType}`)
        .then(res => {
          data.userType = res.data.name;
        })
        .then(res => {
          if (this.staffData.hospital) {
            this.$http
              .get(`/hospital/${this.staffData.hospital}`)
              .then(res => {
                this.staffData.hospital = res.data.name
              }).then(res =>{
                this.$http.get(`/department/${this.staffData.department}`)
                .then(res=>{
                  this.staffData.department = res.data.name
                }).catch(err => console.log(err))
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    });
  }
};
</script>
