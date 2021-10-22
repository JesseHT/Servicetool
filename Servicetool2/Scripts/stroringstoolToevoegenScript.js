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


db.collection("Storingstool").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var opt = document.createElement('option');
        var Probleem = doc.data().Probleem;
        opt.value = Probleem;
        opt.innerHTML = Probleem;
        document.getElementById("probleem-select").append(opt);
    });
})

var i = 0;
function addRelated() {
    i++;
    var select = document.createElement('select');
    var lb = document.createElement("BR");
    var lb2 = document.createElement("BR");


    db.collection("Storingstool").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var opt = document.createElement('option');
            var Vraag = doc.data().Probleem;
            select.id = i;
            select.className = 'form-select';
            select.name = 'probleem';
            opt.value = Vraag;
            opt.innerHTML = Vraag;
            document.getElementById("gerelateerdSectie").appendChild(select);
            document.getElementById(i).appendChild(opt);
        });
    })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    document.getElementById("gerelateerdSectie").appendChild(lb);
    document.getElementById("gerelateerdSectie").appendChild(lb2);


}

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
    else if (categorie == "Extravraag") {
        var titel = document.getElementById('extraTitel').value;
        var soort = document.getElementById('extraSoort').value;
        var ondertekst = document.getElementById('extraOndertext').value;

        var gerelateerde = [];
        var gerelateerdeProblemen = document.getElementsByName('probleem');

        for (var i = 0; i < gerelateerdeProblemen.length; i++) {
            var a = gerelateerdeProblemen[i];
            gerelateerde.push(a.value);
        }
        var docData = {
            titel: titel,
            soort: soort,
            subtext: ondertekst,
            GerelateerdeProblemen: gerelateerde
        };

        db.collection("Extravragen").doc(titel).set(docData).then(() => {
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



