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

//cookies indelen in een variabele met een waarde en in de lijst boven aan de pagina zetten
var cookies = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
document.getElementById("infoMeegaveWarmtepomp").innerText = cookies.warmtepomp;
document.getElementById("infoMeegaveKetel").innerText = cookies.ketel;
document.getElementById("infoMeegaveThermostaat").innerText = cookies.thermostaat;
document.getElementById("infoMeegaveProbleem").innerText = cookies.probleem;

var rowvar = 0;
var divvar = 0;
var variabele = 0;
db.collection("Extravragen")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            
            
            
            var vraagNaam = doc.data().titel;
            var vraagSoort = doc.data().soort;
            var vraagSubtext = doc.data().subtext;
            var br = document.createElement('br');

            if (variabele == 3) {
                var br = document.createElement('br');
                rowvar++;
                var row = document.createElement('div');
                row.className = "row";
                row.id = "row" + rowvar;
                document.getElementById("extraVragen").appendChild(br);
                document.getElementById("extraVragen").appendChild(row);
                
                variabele = 0;
            }
            console.log(variabele);
            var div = document.createElement('div');
            div.id = "div" + divvar;
            div.className = "col-4";

            if (vraagSubtext != null) {
                var vraagSubtextp = document.createElement('p');
                vraagSubtextp.innerHTML = vraagSubtext;
            }
            var vraagTitel = document.createElement('label');
            vraagTitel.innerHTML = vraagNaam;

            var vraagInput = document.createElement('input');
            vraagInput.type = vraagSoort;

            div.appendChild(vraagTitel);
            div.appendChild(br);
            div.appendChild(vraagInput);
            if (vraagSubtext != null) {
                div.appendChild(vraagSubtextp);
            }

            document.getElementById("row" + rowvar).appendChild(div);
            variabele++;
            divvar++;
        })
    });