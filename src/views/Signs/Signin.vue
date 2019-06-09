<template>
  <div class="container">
    <div class="screen-content">
      <v-form class="pa-5" ref="form" v-model="valid" lazy-validation>
        <h3 class="screen-content__text">Login into DashBoard</h3>
        <v-text-field v-model="email" label="E-mail" required :rules="emailRules"></v-text-field>

        <v-text-field
          label="Password"
          required
          v-model="password"
          @click:append="show = !show"
          :rules="required"
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :type="show ? 'text' : 'password'"
        ></v-text-field>
        <v-btn class="btn" @click="validate" flat>Log In</v-btn>
        <p style="font-size: 15px;" class="screen-content__text">
          <a class="link" href="#">
            <span>Forgot login?</span>
          </a>
        </p>
      </v-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tokenn:"",
      loading: false,
      loader: null,
      email: "",
      password: "",
      show: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      required: [value => !!value || "Required."]
    };
  },
  watch: {
    loader() {
      if (this.$refs.form.validate()) {
        const l = this.loader;
        this[l] = !this[l];
      }

      // setTimeout(() => (this[l] = false), 3000)
      // this.loader = null
    }
  },
  methods: {
    validate() {
      // this.$http.post(`employee/signup`, {
      //   address: {
      //     street: "sasd",
      //     city: "asdasd",
      //     state: "weq"
      //   },
      //   qulaifications: [ ],
      //   email: "mosallem5@gmail.com",
      //   password: "123456789",
      //   gender: "male",
      //   fristName: "mohamed",
      //   lastName: "mosallem",
      //   dateOfBirth: "2019-11-22T14:15:35.574Z",
      //   phoneNumber: "01023123123",
      //   nationalID: "6433003456342",
      //   userType: "5c658765408faf25ac549c20"
      // }).then(res=>{
      //   console.log(res)
      // }).catch(err =>console.log(err));

      // this.$router.push('/home')

      if (this.$refs.form.validate()) {
      this.$http
        .post(`employee/login`, {
          email: this.email,
          password: this.password
        })
        .then(
          res => {
            // this.loading = false;
            // this.loader = null;
            
            this.$router.push(`/hospital`);
            this.$store.dispatch("changeNavBarac")
            this.$store.dispatch("getProfile",res.data.token)
            
            // this.tokenn = res.data.token
            // vv(res.data.token)
          },
          error => {
            // this.loading = false;
            // this.loader = null;
            console.log(error);
      }
      );
      }

    },
    // vv(){
    //   this.$http.get(`/employee/profile`,{
    //     headers:{
    //      Authorization: "Bearer " + this.tokenn 
    //     }
    //   }).then(res=>{
    //     console.log(res)
    //   })
    // }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-pack: center;
  -webkit-box-align: center;
}
.screen-content {
  display: block;
  width: 400px;
}
.screen-content__text {
  text-align: center;
  margin-bottom: 25px;
  font-size: 22px;
}
.btn {
  border-radius: 4px;
  width: 100%;
  margin: 15px 0;
  background-color: rgb(230, 230, 230);
  color: black;
}
.link {
  color: rgb(161, 161, 161);
  text-decoration: none;
}
</style>

