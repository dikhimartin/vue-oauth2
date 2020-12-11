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

import "icheck-bootstrap";
import "ionicons/dist/css/ionicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "admin-lte/bower_components/font-awesome/css/font-awesome.css";

// css
import('./assets/css/style.css')
import('./assets/css/colors/blue.css')
import('./assets/plugins/bootstrap/css/bootstrap.min.css')
import('./assets/plugins/toast-master/css/jquery.toast.css')
import('./assets/plugins/sweetalert/sweetalert.css')
import('./assets/plugins/nestable/nestable.css')

// javascript
import('./assets/plugins/jquery/jquery.min.js')
import("./assets/plugins/bootstrap/js/popper.min.js")
import("./assets/plugins/bootstrap/js/bootstrap.min.js")
import("./assets/js/jquery.slimscroll.js")
import("./assets/js/waves.js")
import("./assets/js/sidebarmenu.js")
import("./assets/plugins/sticky-kit-master/dist/sticky-kit.min.js")
import("./assets/plugins/sparkline/jquery.sparkline.min.js")
import("./assets/js/custom.min.js")
import("./assets/plugins/sweetalert/sweetalert.min.js")
import("./assets/plugins/sweetalert/jquery.sweet-alert.custom.js")

import routers from '@config/router'
import Api from '@services/Api'
import '@config/components'

Vue.use(VueRouter)
Vue.use(Vuex)


const router = new VueRouter(routers)
const store  = new Vuex.Store({
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
