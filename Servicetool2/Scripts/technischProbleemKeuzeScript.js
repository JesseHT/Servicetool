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


var vraagRef = db.collection("Storingstool");
var i = 0;

vraagRef.where("Categorie", "==", "Probleem")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var Probleem = doc.data().Probleem;
            var input = document.createElement('input');
            input.type = "radio";
            input.value = Probleem;
            input.className = "btn-check";
            input.name = "btnradio";
            input.id = "btnradio " + Probleem;
            input.autocomplete = "off";
            input.checked;

            var label = document.createElement('label');
            label.className = "btn btn-outline-primary";
            label.htmlFor = "btnradio " + Probleem;
            label.innerHTML = Probleem;
            
            document.getElementById("probleemLijst").append(input);
            document.getElementById("probleemLijst").append(label);
            i++;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


/*let Parameters = new URLSearchParams(window.location.search);
let warmtePomp = Parameters.get("technischWarmtepompen");
let ketel = Parameters.get("technischKetels");
let thermostaat = Parameters.get("technischThermostaat");
let probleem = Parameters.get("btnradio");

let infoMeegave = warmtePomp + " | " + ketel + " | " + thermostaat + " | " + probleem;
console.log(Parameters.get("technischWarmtepompen"));
document.getElementById("infoMeegaveWarmtepomp").innerText = warmtePomp;
document.getElementById("infoMeegaveKetel").innerText = ketel;
document.getElementById("infoMeegaveThermostaat").innerText = thermostaat;
document.getElementById("infoMeegaveProbleem").innerText = probleem;*/

function storingSave() {

    const rbs = document.querySelectorAll('input[name="btnradio"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }

    }

    document.cookie = "warmtepomp=" + document.getElementById("technischWarmtepompen").value;
    document.cookie = "ketel=" + document.getElementById("technischKetels").value;
    document.cookie = "thermostaat=" + document.getElementById("technischThermostaten").value;
    document.cookie = "probleem=" + selectedValue;

}







