import firebase from 'firebase/compat/app'
import 'firebase/firestore'

const db = firebase.firestore()

export const createUserIfNotExists = async (userData) => {
  const userRef = db.collection('Usuarios').doc(userData.uid)
  const doc = await userRef.get()
  if (!doc.exists) {
    await userRef.set(userData)
  }
}
