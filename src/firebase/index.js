import { initializeApp, getApp, getApps } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.NEXT_ENV_APIKEY,
  authDomain: process.env.NEXT_ENV_AUTHDOMAIN,
  projectId: process.env.NEXT_ENV_PROJECTID,
  storageBucket: process.env.NEXT_ENV_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_ENV_MESSAGINGSENDERID,
  appId: process.env.NEXT_ENV_APPID
}

export const app = !getApps.length() ? initializeApp(firebaseConfig) : getApp()
