if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: 'AIzaSyBlEyAJb6dTHnN8kDbdBhGslrunIaX0z2Q',
        authDomain: 'servicetool-81486.firebaseapp.com',
        projectId: 'servicetool-81486',
        storageBucket: "gs://servicetool-81486.appspot.com"
    });
} else {
    firebase.app(); // if already initialized, use that one
}
var db = firebase.firestore();


var vraagRef = db.collection("Vraag");
var i = 0;
//vragen laden uit de db 

    vraagRef.orderBy("Vraag", "asc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                //data uit de db halen
                var Vraag = doc.data().Vraag;
                var Categorie = doc.data().Categorie;

                var input = document.createElement('input');
                input.type = "radio";
                input.value = Categorie +" | "+Vraag;
                input.className = "btn-check";
                input.name = "btnradio";
                input.id = "btnradio " + Vraag;
                input.autocomplete = "off";
                input.checked;

                var label = document.createElement('label');
                label.className = "btn btn-outline-primary";
                label.htmlFor = "btnradio " + Vraag;
                label.id = "vraag" + Vraag;
                label.innerHTML = Categorie +" | "+Vraag;



                //lijst in div zetten
                document.getElementById("lijstgroep").appendChild(input);
                document.getElementById("lijstgroep").appendChild(label);



            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

function verwijderVraag() {
    console.log("Binnen");
    const rbs = document.querySelectorAll('input[name^="btnradio"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            vraagRef.doc(selectedValue).delete().then(() => {
                console.log("Document is verwijderd!");
                location.reload();
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
            break;
        }
    }
}

function vraagSave() {

    const rbs = document.querySelectorAll('input[name="btnradio"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }

    var waarde = selectedValue.replace("| ", "");
    waarde = waarde.replace("Algemeen ", "");
    waarde = waarde.replace("Afspraken ", "");
    waarde = waarde.replace("Financieel ", "");
    waarde = waarde.replace("Overig ", "");

    console.log(waarde);
    console.log(waarde);
    if (selectedValue == null) {
        document.cookie = "vraag=Geen probleem ingevuld"
    } else {
        document.cookie = "vraag=" + waarde;
    }

}

function zoekFunctie() {
    // Declare variables
    var input, filter, ul, li, a, txtValue;
    input = document.getElementById('zoekInput');
    filter = input.value.toUpperCase();
    ul = document.getElementsByClassName("btn-check");

    // Loop through all list items, and hide those who don't match the search query
    for (l = 0; l < ul.length; l++) {
        li = document.querySelectorAll('[id^="vraag"]');
        console.log(li[l].innerHTML);
        var vraag = li[l];

            a = vraag.innerHTML;
        txtValue = a;
        console.log($(ul[l]).parents()[0])

            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                vraag.style.display = "";
                /*break;*/
            } else {
                    vraag.style.display = "none";
                }
        }
    
}






