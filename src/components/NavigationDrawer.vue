<template>
  <v-navigation-drawer light app v-model="draw">
    <v-toolbar class="indigo headline" dark>
      <span>Dashboard</span>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="blue-grey darken-2" height="200" class="white--text">
          <v-layout row wrap>
            <v-flex xs5>
              <v-avatar class="mt-5 ml-3" size="90">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
              </v-avatar>
            </v-flex>
            <v-flex class="mt-5 pa-2" xs6>
              <h3>
                <span style="text-transform: capitalize">{{getName}}</span>
              </h3>
              <h3 class="font-weight-light">
                <span style="text-transform: capitalize">{{getStaffType}}</span>
              </h3>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-list>
      <v-list-tile to="/home">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <v-list-tile exact :to="subItem.route" v-for="subItem in item.items" :key="subItem.title">
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // draw: false,
      items: [
        {
          action: "fa-hospital-alt",
          title: "Hospitals",
          items: [
            { title: "List of Hospitals", route: "/hospital/" },
            { title: "Add New Hospital", route: "/hospital/addHospital" }
          ]
        },
        {
          action: "fa-clinic-medical",
          title: "Alloted Rooms",
          items: [
            { title: "List of Rooms", route: "c" },
            { title: "List of Room Types", route: "c" },
            { title: "Add New Room", route: "b" },
            { title: "Add New Room Type", route: "b" }
          ]
        },
        {
          action: "fa-users",
          title: "Users",
          items: [{ title: "List of Users", route: "/user" }]
        },
        {
          action: "fa-newspaper",
          title: "Articles",
          items: [
            { title: "List of Articles", route: "/artical" },
            { title: "Add New Articles", route: "/artical/addArtical" }
          ]
        },
        {
          action: "fa-user-md",
          title: "Staff",
          items: [
            { title: "List of All Satff", route: "/staff" },
            { title: "Add New Satff Member", route: "/staff/addStaff" }
          ]
        },
        {
          action: "fa-envelope",
          title: "Complains",
          items: [
            { title: "List of All Complains", route: "a" },
            { title: "Answer Complains", route: "a" }
          ]
        },
        {
          action: "fa-calendar-check",
          title: "Appointments",
          items: [
            { title: "Calendar", route: "a" },
            { title: "Add New Appointment", route: "a" },
            { title: "Add New Schedule", route: "a" }
          ]
        },
        {
          action: "fa-user-injured",
          title: "Patients",
          items: [
            { title: "Medical History of a Patient", route: "/patient/medicalHistory" },
            { title: "Add New Patient", route: "/patient/addPatient" },
            { title: "Add New Node", route: "/patient/addNewNode" }
          ]
        }
      ],

      right: null
    };
  },
  props: {
    draw: Boolean
  },
  computed: {
    ...mapGetters({
      getStaffType: "getStaffType",
      getName: "getName"
    })
  }
};
</script>