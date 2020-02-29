export default {
  config: {
      apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
      databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      messagingSenderId: process.env.VUE_APP_FIREBASE_MSG_SENDER_ID
  }
}