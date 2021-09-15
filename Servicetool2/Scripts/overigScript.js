

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

/*const vragen = ["Overige vraag 1", "Overige vraag 2", "Overige vraag 3", "Overige vraag 4"];
const antwoorden = ["Overig antwoord 1", "Overig antwoord 2", "Overig antwoord 3", "Overig antwoord 4"];
*/

/*for (i = 0; i <= vragen.length - 1; i++) {

    var html = document.createElement('div');

    var vraag = document.createElement('label');
    vraag.className = "showMore";
    vraag.htmlFor = "_" + i;
    vraag.innerHTML = vragen[i];

    var input = document.createElement('input');
    input.id = "_" + i;
    input.type = "checkbox";

    var antwoord = document.createElement('div');
    antwoord.innerHTML = antwoorden[i];

    html.appendChild(vraag);
    console.log("vraag zit erin")
    html.appendChild(input);
    html.appendChild(antwoord);


    document.getElementById("vragen").appendChild(html);
}*/


/*function test() {*/
var vraagRef = db.collection("Vraag");
var i = 0;

vraagRef.where("Categorie", "==", "Overig")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            var Vraag = doc.data().Vraag;
            var Antwoord = doc.data().Antwoord;
            var Categorie = doc.data().Categorie;

            var html = document.createElement('div');

            var vraag = document.createElement('label');
            vraag.className = "showMore";
            vraag.htmlFor = "_" + i;
            vraag.innerHTML = Vraag;

            var input = document.createElement('input');
            input.id = "_" + i;
            input.type = "checkbox";
            var breakline = document.createElement('br');
            var antwoord = document.createElement('div');
            antwoord.innerHTML = "<br />" + Antwoord;

            html.appendChild(vraag);
            console.log("vraag zit erin")
            html.appendChild(input);
            html.appendChild(antwoord);
            html.appendChild(breakline);

            document.getElementById("vragen").appendChild(html);

            console.log(doc.id, " => ", doc.data());
            console.log(Vraag);
            i++;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
/*}*/