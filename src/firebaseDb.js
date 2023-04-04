import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAvppw-iW0ylRp_6Et9NfXsiq4cCSz5rHo',
  authDomain: 'foodapp-fb9d2.firebaseapp.com',
  projectId: 'foodapp-fb9d2',
  storageBucket: 'foodapp-fb9d2.appspot.com',
  messagingSenderId: '645197075376',
  appId: '1:645197075376:web:816f80720b92e71f473c75',
  measurementId: 'G-82PJ0S3EEZ'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
