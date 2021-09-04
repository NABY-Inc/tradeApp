import Vue from 'vue'
import Vuex from 'vuex'
import assets from './modules/assets'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    assets
  }
})
