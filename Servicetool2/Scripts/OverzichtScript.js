firebase.app();
var db = firebase.firestore();


var vraagRef = db.collection("Vraag");
var i = 0;
//vragen laden uit de db 

    vraagRef.orderBy("Klikcount", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                //data uit de db halen
                var Vraag = doc.data().Vraag;
                var Antwoord = doc.data().MailAntwoord;
                var Kliks = doc.data().Klikcount;
                var Categorie = doc.data().Categorie;
                var Trefwoorden = doc.data().Trefwoorden;
                var Gerelateerd = doc.data().Gerelateerd;

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
                label.innerHTML = Vraag;



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







