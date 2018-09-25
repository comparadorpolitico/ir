import App from "./App.vue"
import Vue from "vue"
import VueChartkick from "vue-chartkick"
import Chart from "chart.js"
import Vuex from "vuex"
import Store from "./componentes/Store";

Vue.use(VueChartkick, {adapter: Chart});
Vue.use(Vuex);

const store = new Vuex.Store(Store);

new Vue({
  el: "#app",
  render: h => h(App),
  store
});
