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


var e;
//cookies indelen in een variabele met een waarde en in de lijst boven aan de pagina zetten
var cookies = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
document.getElementById("vraagveld").innerText = cookies.vraag;


vraagRef.where("Vraag", "==", cookies.vraag)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var Vraag = doc.data().Vraag;
            var TelAntwoord = doc.data().TelAntwoord;
            var MailAntwoord = doc.data().MailAntwoord;
            var Categorie = doc.data().Categorie;
            var Trefwoorden = doc.data().Trefwoorden;
            var Gerelateerd = doc.data().Gerelateerd;
            var Links = doc.data().Link;

            document.getElementById("vraag").value = Vraag;
            document.getElementById("telAntwoord").value = TelAntwoord;
            document.getElementById("mailAntwoord").value = MailAntwoord;
            document.getElementById("categorie-select").value = Categorie;

            for (i = 0; i < Trefwoorden.length; i++) {
                var inputTref = document.createElement("input");
                inputTref.className = "form-control";
                inputTref.type = "text";
                inputTref.id = "trefwoord";
                inputTref.name = "trefwoord";
                inputTref.value = Trefwoorden[i];
                document.getElementById("trefwoorden").appendChild(inputTref);
            }

            for (e = 0; e < Gerelateerd.length; e++) {
                var inputRel = document.createElement("input");
                inputRel.className = "form-control";
                inputRel.type = "text";
                inputRel.id = "gerelateerd";
                inputRel.name = "gerelateerd";
                inputRel.value = Gerelateerd[e];
                document.getElementById("gerelateerdSectie").appendChild(inputRel);

            }

            for (e = 0; e < Links.length; e++) {
                var inputRel = document.createElement("input");
                inputRel.className = "form-control";
                inputRel.type = "text";
                inputRel.id = "link";
                inputRel.name = "link";
                inputRel.value = Links[e];
                document.getElementById("links").appendChild(inputRel);

            }
        })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
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

var w = e;
function addRelated() {
    w++;
    var select = document.createElement('select');
    var lb = document.createElement("BR");
    var lb2 = document.createElement("BR");


    vraagRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var opt = document.createElement('option');
            var Vraag = doc.data().Vraag;
            select.id = w;
            select.className = 'form-select';
            select.name = 'gerelateerd';
            opt.value = Vraag;
            opt.innerHTML = Vraag;
            document.getElementById("gerelateerdSectie").appendChild(select);
            document.getElementById(w).appendChild(opt);
        });
    })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    document.getElementById("gerelateerdSectie").appendChild(lb);
    document.getElementById("gerelateerdSectie").appendChild(lb2);


}

function addLink() {
    var nieuwVeld = document.createElement('input');
    var lb = document.createElement("BR");
    var lb2 = document.createElement("BR");

    nieuwVeld.type = 'text';
    nieuwVeld.id = 'link';
    nieuwVeld.name = 'link';
    nieuwVeld.className = 'form-control';


    document.getElementById('links').appendChild(nieuwVeld);
    document.getElementById('links').appendChild(lb);
    document.getElementById('links').appendChild(lb2);



}

function vraagUpdaten() {
    //console.log("call methode");
    var vraag = document.getElementById('vraag').value;
    var telAntwoord = document.getElementById('telAntwoord').value;
    var mailAntwoord = document.getElementById('mailAntwoord').value;
    var antwoordEchtMail = telAntwoord;
    var antwoordEchtTel = mailAntwoord;

    var categorie = document.getElementById('categorie-select').value;

    var trefwoorden = [];
    var trefwoordInputs = document.getElementsByName('trefwoord');
    for (var i = 0; i < trefwoordInputs.length; i++) {
        var a = trefwoordInputs[i];
        trefwoorden.push(a.value);
    }
    //const trefwoordArray = trefwoorden.map((obj) => { return Object.assign({}, obj) });


    var gerelateerde = [];
    var gerelateerdInputs = document.getElementsByName('gerelateerd');
    for (var i = 0; i < gerelateerdInputs.length; i++) {
        var a = gerelateerdInputs[i];
        gerelateerde.push(a.value);
    }

    var links = [];
    var linkInputs = document.getElementsByName('link');
    for (var i = 0; i < linkInputs.length; i++) {
        var a = linkInputs[i];
        links.push(a.value);
    }
    console.log(gerelateerdInputs.length);
    //const gerelateerdArray = gerelateerde.map((obj) => { return Object.assign({}, obj) });

    var docData = {
        Vraag: vraag,
        TelAntwoord: antwoordEchtTel,
        MailAntwoord: antwoordEchtMail,
        Categorie: categorie,
        Trefwoorden: trefwoorden,
        Link: links,
        Gerelateerd: gerelateerde,
        Klikcount: 0,
        Viewcount: 0
    };

    db.collection("Vraag").doc(categorie + " | " + vraag).set(docData).then(() => {
        console.log("Document successfully written!");
    });

}