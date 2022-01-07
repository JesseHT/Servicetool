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
//cookies indelen in een variabele met een waarde en in de lijst boven aan de pagina zetten
var cookies = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value)
    }), {});
document.getElementById("infoMeegaveWarmtepomp").value = cookies.warmtepomp;
document.getElementById("infoMeegaveKetel").value = cookies.ketel;
document.getElementById("infoMeegaveThermostaat").value = cookies.thermostaat;
document.getElementById("infoMeegaveProbleem").value = cookies.probleem;
document.getElementById("infoMeegaveDeal").value = cookies.deal;
document.getElementById("infoMeegaveDealNaam").value = cookies.dealNaam;

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
                var soort = doc.data().soort;
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
                vraagInput.type = soort;
                if (soort == "checkbox") {
                    vraagInput.setAttribute("onclick", "checkDit()");
                }
                vraagInput.id = vraagNaam;
                vraagInput.name = vraagNaam;


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
            /*if (document.getElementById('Wat is de huidige temperatuur?') != null) {
                document.getElementById('Wat is de huidige temperatuur?').onkeyup = (function () {
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
            }*/

            if (cookies.probleem == "Storingscode op de Elga Ace") {
                document.getElementById('aceIcon').removeAttribute("hidden");
            }
            if (cookies.probleem == "Storingscode op de Elga 304") {
                document.getElementById('elgaIcon').removeAttribute("hidden");
            }
            if (cookies.probleem == "Lekkage") {
                document.getElementById('lekkageTekst').removeAttribute("hidden");
            }
            if (cookies.probleem == "Ik wil koelen") {
                document.getElementById('koelenTekst').removeAttribute("hidden");
            }
            if (cookies.probleem == "Hoe kan ik mijn besparing verbeteren") {
                document.getElementById('besparingTekst').removeAttribute("hidden");
            }
            if (cookies.probleem == "Ik wil graag hulp bij het instellen van mijn thermostaat") {
                document.getElementById('instellenTekst').removeAttribute("hidden");
            }
            if (cookies.probleem == "Storingscode op de Daikin") {
                document.getElementById('storingDaikin').removeAttribute("hidden");
            }
            if (cookies.probleem == "Storingscode op de Elga Ace") {
                document.getElementById('aceStoringTekst').removeAttribute("hidden");
            }
            if (cookies.probleem == "Storingscode op de ketel") {
                document.getElementById('storingKetel').removeAttribute("hidden");
            }
            });
    }


vragenOphalen();

function checkDit() {
    if (cookies.probleem == "Storingscode op de Elga 304") {
        if (document.getElementById('oranje boekje knippert').checked) {
            document.getElementById('storingTafel').removeAttribute("hidden");
        } else {
            document.getElementById('storingTafel').setAttribute("hidden", "true");
        }
    }

    if (cookies.probleem == "Storingscode op de Elga Ace") {
        if (document.getElementById('oranje boekje knippert').checked) {

            document.getElementById('storingTafelAce').removeAttribute("hidden");
        } else {
            document.getElementById('storingTafelAce').setAttribute("hidden", "true");
        }
    }
}



function laatZien() {
    console.log("binnen")
    if (document.getElementById('flowstoringCheck').checked == true) {
        document.getElementById('flowstoringTafel').removeAttribute("hidden");
    } else {
        document.getElementById('flowstoringTafel').setAttribute("hidden", "true");
    }

    if (document.getElementById('flowstoringCheckAce').checked == true || document.getElementById('flowstoringCheckAce2').checked == true) {
        document.getElementById('flowstoringTafelAce').removeAttribute("hidden");
    } else {
        document.getElementById('flowstoringTafelAce').setAttribute("hidden", "true");
    }
}

