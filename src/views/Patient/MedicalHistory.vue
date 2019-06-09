<template>
  <div>
    <div style="width:100%">
      <v-autocomplete
        v-model="model"
        return-object
        item-text="nationalID"
        item-value="_id"
        :items="states"
        :hint="model.name"
        label="Patient's NID"
        persistent-hint
      >
        <template v-slot:append-outer>
          <v-slide-x-reverse-transition mode="out-in">
            <v-icon
              :key="`icon-${isEditing}`"
              :color="isEditing ? 'success' : 'info'"
              @click="isEditing = !isEditing"
              v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
            ></v-icon>
          </v-slide-x-reverse-transition>
        </template>
      </v-autocomplete>
      <v-btn @click="(getTests())" style="float:right;width:200px">View Tests</v-btn>
    </div>
    <div >
      <h1>ADD Medical History</h1>
      <br>
      <br>
      <div>
        <v-layout>
          <v-flex md6 px-2></v-flex>
          <v-flex md6>
            <div style="float:right">
              <v-btn @click="add" icon>
                <v-icon>add</v-icon>
              </v-btn>
              <v-btn @click="remove(i)" icon>
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn @click="done" icon>
                <v-icon>done</v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <v-layout row wrap v-for="(a,i) in x" :key="i">
        <v-flex md4 px-2>
          <v-text-field :label="testNameFun(i)" v-model="testName[i]"></v-text-field>
        </v-flex>
        <v-flex md4 px-2>
          <v-text-field :label="resultFun(i)" v-model="result[i]"></v-text-field>
        </v-flex>
        <v-flex md4 px-2>
          <v-text-field :label="testValueFun(i)" v-model="testValue[i]"></v-text-field>
        </v-flex>
      </v-layout>
      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ textSnackeBar }}
        <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <v-btn
        @click="mining"
        v-if="miningShow"
        style="float:right;width:200px"
        class="success"
      >Mining</v-btn>
    </div>
    
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      x: 1,
      testName: [],
      result: [],
      testValue: [],
      isEditing: false,
      model: {},
      states: [],
      dataa: [],
      miningShow: false,
      textSnackeBar: "",
      snackbar: false,
      mode: "",
      timeout: 3000,
      y: "top",
    };
  },
  created() {
    this.getPatients();
  },
  computed: {
    ...mapGetters({
      getStaffID: "getStaffID"
    }),
  },
  methods: {
    testNameFun(i) {
      return "Test Name " + (i + 1);
    },
    resultFun(i) {
      return "Result " + (i + 1);
    },
    testValueFun(i) {
      return "Test Value " + (i + 1);
    },
    add() {
      this.x = this.x + 1;
    },
    remove(i) {
      this.x = this.x - 1;
    },
    done() {
      for (let m in this.testName) {
        const data = {
          testName: this.testName[m],
          result: this.testValue[m],
          testValue: this.testValue[m]
        };
        this.dataa.push(data);
      }
      // console.log(this.dataa);
      // console.log(this.model.nationalID);
      // console.log(this.getStaffID);
      this.$http
        .post("/blockchain/transaction/broadcast", {
          data: this.dataa,
          sender: this.getStaffID,
          recipient: this.model.nationalID
        })
        .then(res => {
          (this.testName = []),
            (this.dataa = []),
            (this.result = []),
            (this.testValue = []);
          this.x = 1;
          this.model = {};
          this.miningShow = true;
          console.log(res);
        })
        .catch(err => console.log(err));
    },
    mining() {
      this.$http
        .get("/blockchain/mine")
        .then(res => {
          const data = res.data.note;
          this.textSnackeBar = data;
          this.snackbar = true;
          this.miningShow = false;
        })
        .catch(err => console.log(err));
    },
    getPatients() {
      this.$http.get("/patient").then(res => {
        const data = res.data;
        for (let k in data) {
          const user = data[k];
          this.states.push({
            _id: user._id,
            name: user.fristName + " " + user.lastName,
            nationalID: user.nationalID
          });
        }
      });
    },
    getTests() {
      if (
        Object.entries(this.model).length === 0 &&
        this.model.constructor === Object
      ) {
        console.log("Null Object");
      } else {
        this.$router.push(`/patient/viewBlocks/${this.model.nationalID}`)
      }
    }
  }
};
</script>
