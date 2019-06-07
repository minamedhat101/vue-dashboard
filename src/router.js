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

// import Article from './views/Article/Article.vue'
// import Room from './views/Room.vue'
// import Users from './views/Users.vue'
// import RoomType from './views/RoomType.vue'
// import Complain from './views/Complain.vue'
// import Appointment from './views/Appointment.vue'
// import Patient from './views/Patient.vue'

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
    // {
    //   path: '/articles',
    //   name: 'articles',
    //   component: Article,
    //   children: [
    //     {
    //       path: ''
    //     }
    //   ]
    // },
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
    // {
    //   path: '/users',
    //   name: 'users',
    //   component: Users,
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
