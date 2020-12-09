import "es6-promise/auto";
import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import VueRouter from "vue-router";
import jQuery from "jquery";
import moment from "moment";
import Pace from "pace-js";
import bootbox from "bootbox";
import env from "@config/environment";
import "select2/dist/css/select2.css";
import "bootstrap/dist/css/bootstrap.css";
import "icheck-bootstrap";
import "ionicons/dist/css/ionicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "admin-lte/bower_components/font-awesome/css/font-awesome.css";
import "bootstrap/dist/js/bootstrap.js";
import "admin-lte/dist/css/AdminLTE.css";
import "admin-lte/dist/css/skins/_all-skins.min.css";
import "admin-lte/dist/js/adminlte.js";
// import 'icheck'
// import 'icheck/skins/all.css'
import "select2/dist/js/select2.full.js";
import "chart.js/dist/Chart.bundle.js";
import "@assets/css/style.css";
import routers from '@config/router'
import Api from '@services/Api'
import '@config/components'
if (process.env.NODE_ENV == 'development') {
    require('./assets/css/style.development.css')
} else {
    require('./assets/css/style.production.css')
}

Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter(routers)
const store = new Vuex.Store({
    state: {
        user: {
            name: ""
        },
        title: process.env.VUE_APP_NAME,
        subtitle: "",
        loading: false
    }
})

Pace.options = {
    ajax: {
        trackMethods: ['PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'GET']
    },
    // restartOnPushState: false,
    // document: false
}
window.adminlte = adminlte
window.Vue = Vue
Vue.prototype.$ = window.$ = window.jQuery = jQuery
Vue.prototype.moment = window.moment = moment
Vue.prototype.env = window.env = env
Vue.prototype.Pace = window.Pace = Pace
Vue.prototype.bootbox = window.bootbox = bootbox
Vue.prototype.Api = window.Api = new Api(env, router, ['register','login', 'forgot_password', 'recover_password'])
window.Api.setStore(store)
window.Api.authenticate()

moment.locale('id')
Vue.config.productionTip = false

new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app')
