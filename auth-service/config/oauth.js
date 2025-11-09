require('dotenv').config();
const firebaseConfig = {
    apiKey: process.env.APIKEY ? process.env.APIKEY : "apikey",
    authDomain: process.env.AUTHDOMAIN ? process.env.AUTHDOMAIN : "AUTHDOMAIN",
    projectId: process.env.PROJECTID ? process.env.PROJECTID : "app-5f249",
    storageBucket: process.env.STORAGEBUCKET ? process.env.STORAGEBUCKET : "STORAGEBUCKET.firebasestorage.app",
    messagingSenderId: process.env.MESSAGINGSENDERID ? process.env.MESSAGINGSENDERID : "MESSAGINGSENDERID",
    appId: process.env.APPID ? process.env.APPID : "APPID",
};

module.exports = { firebaseConfig };