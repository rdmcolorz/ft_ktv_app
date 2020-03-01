import Vue from 'vue'
import Vuex from 'vuex'
// import axios from './services/axios-auth'
import VuePersist from 'vuex-persist'
import localForage from 'localforage'
// import firebase from 'firebase/app'
// import { Auth } from './firebase/auth'

Vue.use(Vuex)

const vuexStorage = new VuePersist({
  key: process.env.VUE_APP_STORAGE_KEY,
  storage: localForage
})

export default new Vuex.Store({
  plugins: [vuexStorage.plugin],
  state: {
    user: {
      loggedIn: false,
      data: null,
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_LOGGED_OUT(state) {
      state.user.userId = '';
      state.user.username = '';
      state.user.loggedIn = false;
    },
  },
  actions: {
    fetchUser ({ commit }, user) {
      if (user) {
        commit('SET_USER', {
          displayName: user.displayName
        });
      }
      else
        commit('SET_USER', null);
      }
    },
})