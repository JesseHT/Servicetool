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

function dealSave() {
    const rbs = document.querySelectorAll('input[name="dealLijst"]');
    let selectedValue;
    let selectedId;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            selectedId = rb.id;
            break;
        }

    }
    if (selectedValue == null) {
        document.cookie = "deal=Geen Deal ingevuld"
        document.cookie = "dealNaam=Geen Deal ingevuld"
    } else {
        document.cookie = "deal=" + selectedValue;
        document.cookie = "dealNaam=" + selectedId;
    }
}

//data opslaan in cookies
function storingSave() {

    const rbs = document.querySelectorAll('input[name="btnradio"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }

    }

    if (document.getElementById("technischWarmtepompen").value == "Kies een warmtepomp") {
        if (document.getElementById("inputWarmtepomp").value == "") {
            document.cookie = "warmtepomp=Geen warmtepomp";
        } else {
            document.cookie = "warmtepomp=" + document.getElementById("inputWarmtepomp").value;
        }
    } else {
        document.cookie = "warmtepomp=" + document.getElementById("technischWarmtepompen").value;
    }

    if (document.getElementById("technischKetels").value == "Kies een ketel") {
        if (document.getElementById("inputKetel").value == "") {
            document.cookie = "ketel=Geen ketel";
        } else {
            document.cookie = "ketel=" + document.getElementById("inputKetel").value;
        }
    } else {
        document.cookie = "ketel=" + document.getElementById("technischKetels").value;
    }

    if (document.getElementById("technischThermostaten").value == "Kies een thermostaat") {
        if (document.getElementById("inputThermostaat").value == "") {
            document.cookie = "thermostaat=Geen thermostaat";
        } else {
            document.cookie = "thermostaat=" + document.getElementById("inputThermostaat").value;
        }
    } else {
        document.cookie = "thermostaat=" + document.getElementById("technischThermostaten").value;
    }

    if (selectedValue == null) {
        document.cookie = "probleem=Geen probleem ingevuld"
    } else {
        document.cookie = "probleem=" + selectedValue;
    }

    var ref = db.collection("Storingstool");
    const increment = firebase.firestore.FieldValue.increment(1);

    ref.doc("Probleem | " + selectedValue).update({ Klikcount: increment });


}







