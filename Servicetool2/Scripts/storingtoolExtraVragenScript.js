if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyBlEyAJb6dTHnN8kDbdBhGslrunIaX0z2Q',
        authDomain: 'servicetool-81486.firebaseapp.com',
        projectId: 'servicetool-81486'
    });
} else {
    firebase.app(); // if already initialized, use that one
}

var db = firebase.firestore();
var myString = [21, 22, 23, 24];
var myString2 = "Ja";
//cookies indelen in een variabele met een waarde en in de lijst boven aan de pagina zetten
var cookies = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value)
    }), {});
document.getElementById("infoMeegaveWarmtepomp").innerText = cookies.warmtepomp;
document.getElementById("infoMeegaveKetel").innerText = cookies.ketel;
document.getElementById("infoMeegaveThermostaat").innerText = cookies.thermostaat;
document.getElementById("infoMeegaveProbleem").innerText = cookies.probleem;

//extra vragen uit de database ophalen en in rijen van 3 displayen op de webpagina
var rowvar = 0;
var divvar = 0;
var variabele = 0;

function vragenOphalen() {
    db.collection("Extravragen").where("GerelateerdeProblemen", "array-contains", cookies.probleem)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {



                var vraagNaam = doc.data().titel;
                var vraagSubtext = doc.data().subtext;
                var vraagInputText = doc.data().subAntwoord;
                var volgorde = doc.data().volgorde;

                var goedevraag = vraagNaam.replaceAll(" ", "");

                var br = document.createElement('br');

                if (variabele == 3) {
                    var br2 = document.createElement('br');
                    rowvar++;
                    var row = document.createElement('div');
                    row.className = "row";
                    row.id = "row" + rowvar;
                    document.getElementById("extraVragen").appendChild(br2);
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

                if (vraagInputText != null) {
                    var VraagInputText = document.createElement('p');
                    VraagInputText.innerHTML = vraagInputText;
                    VraagInputText.id = volgorde;
                    VraagInputText.setAttribute("hidden", "true");
                }
                var vraagTitel = document.createElement('label');
                vraagTitel.innerHTML = vraagNaam;

                var vraagInput = document.createElement('input');
                vraagInput.type = 'text';
                vraagInput.id = goedevraag;


                div.appendChild(vraagTitel);
                div.appendChild(br);
                div.appendChild(vraagInput);
                if (vraagSubtext != null) {
                    div.appendChild(vraagSubtextp);
                }
                if (vraagInputText != null) {
                    div.appendChild(VraagInputText);
                }
                document.getElementById("row" + rowvar).appendChild(div);
                variabele++;
                divvar++;
            })


            // Client side antwoorden op de extra vragen
            if (document.getElementById('Watisdehuidigetemperatuur?') != null) {
                document.getElementById('Watisdehuidigetemperatuur?').onkeyup = (function () {
                    for (var i = 0; i < myString.length; i++) {
                    var value = $(this).val();
                    if (value.match(myString[i])) {
                        document.getElementById('2').removeAttribute("hidden");
                        break;

                    } else {
                        document.getElementById('2').setAttribute("hidden", "true");
                    }
                }
                });
            }

            if (document.getElementById('oranjeboekjeknippert') != null) {
                document.getElementById('oranjeboekjeknippert').onkeyup = (function () {
                    console.log("test");
                    var value = $(this).val();
                    if (value.match(myString2)) {
                        document.getElementById('storingTafel').removeAttribute("hidden");
                    } else {
                        document.getElementById('storingTafel').setAttribute("hidden", "true");
                    }
                })
            }

        });
}

vragenOphalen();


