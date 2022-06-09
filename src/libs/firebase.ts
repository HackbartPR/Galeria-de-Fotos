//BIBLIOTECAS
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

//CONFIGURAÇÃO DO FIREBASE
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
}

//INICIALIZAÇÃO DO FIREBASE APP
const firebaseApp = initializeApp(firebaseConfig)
//RECEBE A REFERÊNCIA DO STORAGE DO FIRABASE
export const storage = getStorage(firebaseApp)
