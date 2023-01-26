import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import axios from 'axios'
import store from './store'
import * as util from '@/common/oyyl-js/util.js'
import zhouWeiNavBar from "@/components/zhouWei-navBar";
Vue.component("nav-bar", zhouWeiNavBar);
Vue.config.productionTip = false

// axios.defaults.baseURL = "https://akxh.akxhjx.com/api/chase";
// Vue.prototype.imgURL = "https://akxh.akxhjx.com/up";
axios.defaults.baseURL = "http://localhost/dev-api/system";
Vue.prototype.imgURL = "";

Vue.prototype.axios = axios;
Vue.prototype.$util = util
Vue.prototype.$store = store

import wTitleBar from 'components/w-titleBar/w-titleBar.vue'
Vue.component('wTitleBar', wTitleBar)
Vue.use(uView);
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
