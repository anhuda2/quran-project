import Vue from 'vue';
import App from './App.vue';
import firebase from './firebase';

firebase.database().ref('test').set('Hello, world!');

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
