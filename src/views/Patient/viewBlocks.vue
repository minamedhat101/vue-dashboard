<template>
  <div>
    <v-btn icon @click="back">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <br>
    <h1>Show Blocks</h1>
    <br>
    <v-card class="fnt">
      <v-layout row wrap>
        <v-flex xs3 md2 class="pa-3">
          <div class="caption grey--text">Test Name</div>
        </v-flex>
        <v-flex xs3 md2 class="pa-3">
          <div class="caption grey--text">Result</div>
        </v-flex>
        <v-flex xs3 md2 class="pa-3">
          <div class="caption grey--text">Test Value</div>
        </v-flex>
        <v-flex xs3 md3 class="pa-3">
          <div class="caption grey--text">Hash</div>
        </v-flex>
        <v-flex xs3 md3 class="pa-3">
          <div class="caption grey--text">Previous Block Hash</div>
        </v-flex>
      </v-layout>

      <v-layout
        class="hover"
        row
        wrap
        v-for="(x,i) in resultArray"
        :key="i"
        style="cursor : pointer"
      >
        <v-flex xs3 md2 class="pa-3">
          <div>{{ x.testName }}</div>
        </v-flex>
        <v-flex xs3 md2 class="pa-3">
          <div>{{ x.result }}</div>
        </v-flex>
        <v-flex xs3 md2 class="pa-3">
          <div>{{ x.testValue }}</div>
        </v-flex>
        <v-flex xs3 md3 class="pa-3">
          <div>{{ x.hash }}</div>
        </v-flex>
        <v-flex xs1 md3 class="pa-3">
          <div>{{ x.previousBlockHash }}</div>
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
      resultArray: []
    };
  },
  created() {
    this.$http
      .get(`blockchain/address/${this.$route.params.idViewBlock}`)
      .then(res => {
        let data = res.data.addressData;
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          let obj = {};
          for (let j = 0; j < data[i].transaction.data.length; j++) {
            let hash = data[i].hash.toString();
            let newHash = "";
            let newPrev = "";
            if (hash.length > 15) {
              hash = hash.substring(0, 20) + "...";
            }
            obj.hash = hash;
            let previousBlockHash = data[i].previousBlockHash.toString();
            if (previousBlockHash.length > 15) {
              previousBlockHash = previousBlockHash.substring(0, 20) + "...";
              console.log(previousBlockHash.length);
            }
            obj.previousBlockHash = previousBlockHash;
            obj.testName = data[i].transaction.data[j].testName;
            obj.result = data[i].transaction.data[j].result;
            obj.testValue = data[i].transaction.data[j].testValue;
          }
          this.resultArray.push(obj);
        }

        console.log(this.resultArray);
      })
      .catch(err => console.log(err));
  },
  methods: {
    back() {
      this.$router.push("/patient/medicalHistory");
    }
  }
};
</script>
