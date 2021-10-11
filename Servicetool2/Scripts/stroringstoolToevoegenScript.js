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
var i = 0;

$("[name = optie]").hide();

function elementToevoegen() {
    //console.log("call methode");
    var probleemTekst = document.getElementById('probleemTekst').value;
    //var bonusveldTekst = document.getElementById('bonusveldTekst').value;
    //var bonusveldType = document.getElementById('bonusveldType').value;

    var categorie = document.getElementById('categorie-select').value;

    if (categorie == "Probleem") {
        var docData = {
            Probleem: probleemTekst,
            Categorie: categorie
        };

        db.collection("Storingstool").doc(categorie + " | " + probleemTekst).set(docData).then(() => {
            console.log("Document successfully written!");
        });
    }
    else if (categorie == "Bonusveld") {
        var docData = {
            Naam: bonusveldTekst,
            Type: bonusveldType,
            Categorie: categorie
        };

        db.collection("Storingstool").doc(categorie + " | " + bonusveldTekst + " | " + bonusveldType).set(docData).then(() => {
            console.log("Document successfully written!");
        });
    }

    
}



$('#categorie-select').change(function () {
    var value = this.value;
    console.log("#" + value);
    
    $("[name = optie]").hide();
    $("#" + value).show();
});



