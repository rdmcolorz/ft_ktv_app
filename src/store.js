import Vue from 'vue'
import Vuex from 'vuex'
// import axios from './services/axios-auth'
import VuePersist from 'vuex-persist'
import localForage from 'localforage'
import router from './router'
import firebase from 'firebase/app'
import { Auth } from './firebase/auth'

Vue.use(Vuex)

const vuexStorage = new VuePersist({
  key: process.env.VUE_APP_STORAGE_KEY,
  storage: localForage
})

export default new Vuex.Store({
  plugins: [vuexStorage.plugin],
  state: {
    userId: null,
    user: null,
  },
  mutations: {
    login(state, userData) {
      state.userId = userData.uid;
      state.user = userData.email;
    },
    logout(state) {
      state.userId = '';
      state.user = ''
    }
  },
  actions: {
    login ({commit}, authData) {
      return new Promise((resolve, reject) => {
        firebase.auth().signInAndRetrieveDataWithCredential(authData.email, authData.password)
          .then(() => {
            firebase.auth().onAuthStateChanged(authUser => {
              commit('login', authUser);
              resolve()
              router.push('/dashboard')
            });
          })
          .catch(err => reject(err.message))
      })
      // axios.post(`/verifyPassword?key=${process.env.VUE_APP_FIREBASE_APIKEY}`, {
      //   email: authData.email,
      //   password: authData.password,
      //   returnSecureToken: true
      // }).then(res => {

      //   const now = new Date()
      //   const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
      //   commit('login', {
      //     token: res.data.idToken,
      //     userId: res.data.localId,
      //     expirationDate: expirationDate,
      //     user: res.data.email
      //   });
      //   router.push('/dashboard')
      // }).catch(error => {
      //   console.log(error)
      //   alert('wrong username / password')
      // })
    },
    signUp({commit}, user) {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password)
          .then(() => {
            firebase.auth().onAuthStateChanged(authUser => {
              commit('login', authUser);
              resolve()
            });
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },
    logout() {
      Auth.signOut().then(() => {
        Auth.onAuthStateChanged(() => {
          router.push('/login')
        })
      })
    },
  },
  getters: {
    /* Partially Implemented not for production use */
    loggedIn: state => !!state.token
  }
})