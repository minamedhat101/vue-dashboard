<template>
  <div>
    <v-container>
        <router-view></router-view>
    </v-container>
  </div>
</template>
<script>
export default {
  data(){
    return{
      
    }
  },
  created(){
    this.$http.get(`hospital`)
    .then(res =>{
      console.log(res)
    })
  }
}
</script>

<style scoped>

</style>
