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


var vraagRef = db.collection("Vraag");
var i = 0;

vraagRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var opt = document.createElement('option');
        var Vraag = doc.data().Vraag;
        opt.value = Vraag;
        opt.innerHTML = Vraag;
        document.getElementById("gerelateerd-select").append(opt);
    });
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

function addTrefwoord() {
    var nieuwVeld = document.createElement('input');
    var lb = document.createElement("BR");
    var lb2 = document.createElement("BR");

    nieuwVeld.type = 'text';
    nieuwVeld.id = 'trefwoord';
    nieuwVeld.name = 'trefwoord';
    nieuwVeld.className = 'form-control';

    
    document.getElementById('trefwoorden').appendChild(nieuwVeld);
    document.getElementById('trefwoorden').appendChild(lb);
    document.getElementById('trefwoorden').appendChild(lb2);


    
}

var i = 0;
function addRelated() {
    i++;
    var select = document.createElement('select');
    var lb = document.createElement("BR");
    var lb2 = document.createElement("BR");


    vraagRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var opt = document.createElement('option');
            var Vraag = doc.data().Vraag;
            select.id = i;
            select.className = 'form-control';
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

function vraagToevoegen() {

    var vraag = document.getElementById('vraag').innerHTML;
    var antwoord = document.getElementById('antwoord').innerHTML;
    var categorie = document.getElementById('categorie-select').value;

    var trefwoorden = [];
    var trefwoordInputs = document.getElementsByName('trefwoord');
    trefwoorden.push(trefwoordInputs);
    const trefwoordArray = trefwoorden.map((obj) => { return Object.assign({}, obj) });


    var gerelateerde = [];
    var gerelateerdInputs = document.getElementsByName('gerelateerd');
    gerelateerde.push(gerelateerdInputs);
    const gerelateerdArray = gerelateerde.map((obj) => { return Object.assign({}, obj) });

    var vraagData = {
        Vraag: vraag,
        Antwoord: antwoord,
        Categorie: categorie,
        Trefwoorden: trefwoordArray,
        Gerelateerd: gerelateerdArray,
        Klikcount: 0
    };

    vraagRef.doc("test").set(vraagData).then(() => {
        console.log("Document toegevoegd!");
    });

}



