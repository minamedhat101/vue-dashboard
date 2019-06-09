import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signin from './views/Signs/Signin.vue'
//************** Hospital *****************
import Hospital from './views/Hospital/Hospital.vue'
import viewHospitals from './views/Hospital/List.vue'
import addHospital from './views/Hospital/Add.vue'
import updateHospital from './views/Hospital/updateHospital.vue'
//************** Staff *****************
import Staff from './views/Staff/Staff.vue'
import viewStaffs from './views/Staff/List.vue'
import updateStaff from './views/Staff/updateStaff.vue'
import addStaff from './views/Staff/Add.vue'
//************** User *****************
import User from './views/User/User.vue'
import viewUsers from './views/User/List.vue'
import updateUser from './views/User/updateUser.vue'
//************** Artical *****************
import Article from './views/Article/Artical.vue'
import viewArticle from './views/Article/List.vue'
import addArticle from './views/Article/Add.vue'
//************** Patient *****************
import Patient from './views/Patient/Patient.vue'
import viewPatient from './views/Patient/List.vue'
import addPatient from './views/Patient/Add.vue'
import updatePatient from './views/Patient/Update.vue'
import MedicalHistory from './views/Patient/MedicalHistory.vue'
import AddNewNode from './views/Patient/addNewNode.vue'
import ViewBlocks from './views/Patient/viewBlocks.vue'

// import Room from './views/Room.vue'
// import Users from './views/Users.vue'
// import RoomType from './views/RoomType.vue'
// import Complain from './views/Complain.vue'
// import Appointment from './views/Appointment.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/hospital',
      name: 'hospital',
      component: Hospital,
      children: [
        { path: '', component:viewHospitals , name: "viewHospitals" },
        { path: 'addHospital', component:addHospital , name: "addHospital" },
        { path: 'updateHospital/:idHospital', component:updateHospital , name: "updateHospital" }
      ]
    },
    {
      path: '/artical',
      name: 'artical',
      component: Article,
      children: [
        { path: '', component:viewArticle , name: "viewArtical" },
        { path: 'addArtical', component:addArticle , name: "addArtical" },
      ]
    },
    {
      path: '/patient',
      name: 'patient',
      component: Patient,
      children: [
        { path: '', component:viewPatient , name: "viewPatient" },
        { path: 'addPatient', component:addPatient , name: "addPatient" },
        { path: 'updatePatient/:idPatient', component:updatePatient , name: "updatePatient" },
        { path: 'medicalHistory', component:MedicalHistory , name: "medicalHistory" },
        { path: 'addNewNode', component:AddNewNode , name: "addNewNode" },
        { path: 'viewBlocks/:idViewBlock', component:ViewBlocks , name: "viewBlocks" },
      ]
    },
    // {
    //   path: '/rooms',
    //   name: 'rooms',
    //   component: Room,
    //   children: [
    //     {
    //       path: ''
    //     }
    //   ]
    // },
    // {
    //   path: '/roomTypes',
    //   name: 'roomTypes',
    //   component: RoomType,
    //   children: [
    //     {
    //       path: ''
    //     }
    //   ]
    // },
    {
      path: '/staff',
      name: 'staff',
      component: Staff,
      children: [
        { path: '', component:viewStaffs , name: "viewStaffs" },
        { path: 'addStaff', component:addStaff , name: "addStaff" },
        { path: 'updateStaff/:idStaff', component:updateStaff , name: "updateStaff" }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children: [
        { path: '', component:viewUsers , name: "viewUsers" },
        { path: 'updateUser/:idUser', component:updateUser , name: "updateUser" }
      ]
    },
    // {
    //   path: '/complains',
    //   name: 'complains',
    //   component: Complain,
    //   children: [
    //     {
    //       path: ''
    //     }
    //   ]
    // },
    // {
    //   path: '/appointments',
    //   name: 'appointments',
    //   component: Appointment,
    //   children: [
    //     {
    //       path: ''
    //     }
    //   ]
    // },
    // {
    //   path: '/patients',
    //   name: 'patients',
    //   component: Patient,
    //   children: [
    //     {
    //       path: ''
    //     }
    //   ]
    // }
  ]
})
