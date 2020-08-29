import 'firebase/firestore'
import 'firebase/auth'
import firebase from 'firebase/app'
import credentials from './credentials'

firebase.initializeApp(credentials.config);
export const firestore = firebase.firestore()
// export const rtdb = firebase.database()
export const auth = firebase.auth()