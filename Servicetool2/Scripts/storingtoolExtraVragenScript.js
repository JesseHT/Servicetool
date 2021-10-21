if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyBlEyAJb6dTHnN8kDbdBhGslrunIaX0z2Q',
        authDomain: 'servicetool-81486.firebaseapp.com',
        projectId: 'servicetool- 81486'
    });
} else {
    firebase.app(); // if already initialized, use that one
}

var db = firebase.firestore();

var cookies = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

console.log(cookies.warmtepomp);

document.getElementById("infoMeegaveWarmtepomp").innerText = cookies.warmtepomp;
document.getElementById("infoMeegaveKetel").innerText = cookies.ketel;
document.getElementById("infoMeegaveThermostaat").innerText = cookies.thermostaat;
document.getElementById("infoMeegaveProbleem").innerText = cookies.probleem;