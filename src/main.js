import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
// import utils from './global/utils'

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

// Vue.use({
//   install() {
//       Vue.utils = utils;
//       Vue.prototype.$methods = utils.methods;
//       Vue.prototype.$variable = Vue.observable(utils.data());
//   }
// });

new Vue({
  router,
  store,
  vuetify,

  render: function(h) {
    return h(App);
  }
}).$mount("#app");
