import { createRouter, createWebHistory }  from "vue-router";

import indexprofile from '../components/Root/index.vue';

import Notfound from "../components/Notfound.vue";

import register from "../components/Root/register.vue";

import login from "../components/Root/login.vue";

import profile from "../components/Root/user.vue";

const routes = [
    {
        path:'/',
        component:indexprofile
    },
    {
        path:'/registration',
        component:register
    },
    {
        path:'/login',
        component:login
    },
    {
        path:'/profile',
        component:profile
    },
    {
        path:'/logout',
        component:indexprofile
    },
    {
        path:'/:pathMatch(.*)*',
        component:Notfound
    }
]
const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router 