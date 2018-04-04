// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import App from './App';
import { setApiUrl } from './rest';
import store from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuetify);

setApiUrl(document.getElementById('girder-api-root').getAttribute('url'));
// onResponse((resp) => {
//   if (resp.response && resp.response.status === 401 && !store.state.auth.authDialogVisible) {
//     store.dispatch('auth/showAuthDialog', {});
//   }
//
//   // TODO if auth.isLoggedIn, we know our session has expired. May want to take a different action
//   // TODO Handle 500 errors (show a toast perhaps)
//   return Promise.reject(resp);
// });
//
// store.commit('auth/setToken', getTokenFromCookie());
// store.dispatch('auth/whoami').then(() =>

window.Event = new Vue();

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
