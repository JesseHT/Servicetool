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


var e = 0;
//cookies indelen in een variabele met een waarde en in de lijst boven aan de pagina zetten
var cookies = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

document.getElementById("Extravraagveld").value = cookies.ExtraVraag;


db.collection("Extravragen").where("titel", "==", cookies.ExtraVraag)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var Titel = doc.data().titel;
            var Subtext = doc.data().subtext;
            var Related = doc.data().GerelateerdeProblemen;

            document.getElementById("titel").value = Titel;
            document.getElementById("subtext").value = Subtext;

            for (i = 0; i < Related.length; i++) {
                var inputTref = document.createElement("input");
                inputTref.className = "form-control";
                inputTref.type = "text";
                inputTref.id = "gerelateerdProb";
                inputTref.name = "gerelateerdProb";
                inputTref.value = Related[i];
                document.getElementById("gerelateerdProb").appendChild(inputTref);
            }




        })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    });


var w = e;
function addRelProb() {
    w++;
    var select = document.createElement('select');
    var lb = document.createElement("BR");
    var lb2 = document.createElement("BR");


    vraagRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(w);
            var opt = document.createElement('option');
            var Vraag = doc.data().Probleem;
            select.id = w;
            select.className = 'form-select';
            select.name = 'gerelateerdProb';
            opt.value = Vraag;
            opt.innerHTML = Vraag;
            document.getElementById("gerelateerdProb").appendChild(select);
            document.getElementById(w).appendChild(opt);
        });
    })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    document.getElementById("gerelateerdProb").appendChild(lb);
    document.getElementById("gerelateerdProb").appendChild(lb2);


}

function vraagUpdaten() {
    //console.log("call methode");
    var Titel = document.getElementById('titel').value;
    var Subtext = document.getElementById('subtext').value;


    var related = [];
    var relatedInputs = document.getElementsByName('gerelateerdProb');
    for (var i = 0; i < relatedInputs.length; i++) {
        var a = relatedInputs[i];
        if (a.value != "")
            related.push(a.value);
    }
    //const trefwoordArray = trefwoorden.map((obj) => { return Object.assign({}, obj) });


    //const gerelateerdArray = gerelateerde.map((obj) => { return Object.assign({}, obj) });

    var docData = {
        titel: Titel,
        subtext: Subtext,
        GerelateerdeProblemen: related
    };

    db.collection("Extravragen").doc(Titel).update({ GerelateerdeProblemen: firebase.firestore.FieldValue.delete() });


    db.collection("Extravragen").doc(Titel).set(docData).then(() => {
        console.log("Document successfully written!");
    });

}