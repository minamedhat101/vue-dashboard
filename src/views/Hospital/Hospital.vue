<template>
  <div>
    <v-container>
      <v-text-field v-model="filter" prepend-icon="search" label="Search" solo></v-text-field>
        <router-view :filter="filter"></router-view>
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
