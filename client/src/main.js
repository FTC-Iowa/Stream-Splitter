import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import socket from './plugins/socket';
Vue.use(socket);

import console from './plugins/console'
Vue.use(console);

Vue.config.productionTip = false

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')