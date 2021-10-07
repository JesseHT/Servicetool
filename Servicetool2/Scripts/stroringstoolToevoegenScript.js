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



function vraagToevoegen() {
    //console.log("call methode");
    var vraag = document.getElementById('tekst').value;

    var categorie = document.getElementById('categorie-select').value;

    var docData = {
        Vraag: vraag,
        Categorie: categorie
    };

    db.collection("Storingstool").doc(categorie + " | " + vraag).set(docData).then(() => {
        console.log("Document successfully written!");
    });
}



