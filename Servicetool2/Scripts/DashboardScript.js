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
/*console.log(phase);
*///vragen laden uit de db 
function vulVragen() {
    if (phase) {

        document.getElementById("accordion").innerHTML = "";
        document.getElementById("stateChange").innerHTML = "MailView >>";
        document.getElementById("viewTekst").innerHTML = "Telefoonview";

    vraagRef.orderBy("Klikcount", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                //data uit de db halen
                var Vraag = doc.data().Vraag;
                var Antwoord = doc.data().TelAntwoord;
                var Kliks = doc.data().Klikcount;
                var Categorie = doc.data().Categorie;
                var Trefwoorden = doc.data().Trefwoorden;
                var Gerelateerd = doc.data().Gerelateerd;
                var Links = doc.data().Link;
                var LinkTexts = doc.data().Linktexten;

                var kliks = document.createElement('p');
                kliks.innerHTML = Kliks;
                kliks.id = kliks;
                var klikstekst = document.createElement('p');
                klikstekst.innerHTML = "Heeft deze vraag u geholpen?";
                kliks.appendChild(klikstekst);

                var breakline = document.createElement("BR");
                var bl2 = document.createElement("BR");
                var bl3 = document.createElement("BR");
                var bl4 = document.createElement("BR");
                var bl5 = document.createElement("BR");

                var bl6 = document.createElement("BR");
                var bl7 = document.createElement("BR");

                //lijst en divjes per vraag
                var card = document.createElement('div');
                card.className = "accordion-item";
                card.id = Vraag;

                var cardHeader = document.createElement('div');
                cardHeader.className = "accordion-header";
                cardHeader.id = "heading" + i;

                var h5 = document.createElement('h5');
                h5.className = "mb-0";

                var btn = document.createElement("button");
                btn.className = "accordion-button";
                btn.type = "button";
                btn.id = Vraag;
                btn.setAttribute("data-bs-toggle", "collapse");
                btn.setAttribute("data-bs-target", "#collapse" + i);
                btn.setAttribute("aria-expanded", "true");
                btn.setAttribute("aria-controls", "collapse" + i);
                btn.setAttribute("onclick", "viewCount('" + Categorie + " | " + Vraag + "');");
                btn.innerHTML = Categorie + " | " + Vraag;

                h5.appendChild(btn);
                cardHeader.appendChild(h5);
                card.appendChild(cardHeader);

                //voor het collapsen
                var collapse = document.createElement('div');
                collapse.id = "collapse" + i;
                collapse.className = "accordion-collapse collapse";
                collapse.setAttribute("aria-labelledby", "heading" + i);


                //inhoud van vraag
                var cardbody = document.createElement('div');
                cardbody.className = "accordion-body";

                
                //trefwoorden
                for (k = 0; k < Trefwoorden.length; k++) {
                    var trefwoorden = document.createElement('label');
                    trefwoorden.innerHTML = Trefwoorden[k] + "&nbsp;";
                    trefwoorden.className = 'trefwoordID' + Categorie + " | " + Vraag;
                    cardbody.appendChild(trefwoorden);
                    cardbody.appendChild(bl2);
                }

                cardbody.appendChild(bl4);

                //antwoord
                var antwoord = document.createElement('p');
                antwoord.innerHTML = Antwoord;
                antwoord.id = "antwoord"+ Vraag;
                cardbody.appendChild(antwoord);
                cardbody.appendChild(bl3);

                var image = document.createElement('img');
                image.setAttribute("style", "width: 100%; height: auto;");
                var editedVraag = Vraag.slice(0, -1);
 
                firebase.storage().ref().child(editedVraag+".png").getDownloadURL()
                    .then((url) => {
                        // `url` is the download URL for 'images/stars.jpg'
                        // Or inserted into an <img> element
                        image.setAttribute('src', url);
                        cardbody.appendChild(image);
                    })
                    .catch((error) => {
                        // Handle any errors
                        /*console.log(error);*/
                    });

                var row2 = document.createElement("div");
                row2.id = "kaartinfo";
                row2.className = "row";
                /*var bewerkKnop = document.createElement("input");
                bewerkKnop.type = "button";
                bewerkKnop.className = "btn btn-info";
                bewerkKnop.value = "Bewerk vraag";
                bewerkKnop.setAttribute("onclick", "vraagSave('" + Vraag + "');");*/

/*                cardbody.appendChild(bewerkKnop);
*/
                var col2 = document.createElement("div");
                col2.className = "col-6";
                col2.id = "col2";
                

                var col1 = document.createElement("div");
                col1.className = "col-6";
                col1.id = "col1";

                var ul1 = document.createElement("ul");

                row2.appendChild(col1);
                row2.appendChild(col2);
                
                col2.appendChild(ul1);

                cardbody.appendChild(row2);
                


                //gerelateerde vragen
                for (j = 0; j < Gerelateerd.length; j++) {
                    var gerelateerdeVragenHyperlink = document.createElement("button");
                    gerelateerdeVragenHyperlink.tagName = "gerelateerd" + j;
                    gerelateerdeVragenHyperlink.className = "btn btn-secondary";
                    gerelateerdeVragenHyperlink.innerHTML = Gerelateerd[j];
                    gerelateerdeVragenHyperlink.setAttribute("onclick", "openVraag('" + Gerelateerd[j] + "');");
                    col1.appendChild(breakline);
                    col1.appendChild(gerelateerdeVragenHyperlink);
                    gerelateerdeVragenHyperlink.appendChild(bl5);
                    col1.appendChild(bl6);
                }

                //aantal kliks
                var klikKnop = document.createElement("button");
                var klikKnopTekst = document.createElement("p");
                klikKnop.innerHTML = "+1";

                klikKnop.className = "btn btn-primary";
                klikKnop.setAttribute("onclick", "klikCount('" + Categorie + " | " + Vraag + "');")
                klikKnopTekst.append(klikKnop);
                kliks.append(klikKnopTekst);

                col1.append(kliks);

                //hyperlinks
                for (q = 0; q < Links.length; q++) {
                    var li = document.createElement("li");
                    var hyperlink = document.createElement("a");
                    hyperlink.target = "_blank";
                    hyperlink.href = Links[q];
                    hyperlink.innerHTML = LinkTexts[q];
                    
                    hyperlink.appendChild(bl7);
                    li.appendChild(hyperlink);
                    col2.appendChild(li);
                }
                //
                collapse.appendChild(cardbody);
                card.appendChild(collapse);



                //lijst in div zetten
                document.getElementById("accordion").appendChild(card);

                if (document.getElementById("categorieKeuze").innerText == Categorie) {
                    /*console.log("goed");*/
                } else {
                    card.style.display = "none";
                }

                i++;

            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    } else {
        document.getElementById("accordion").innerHTML = "";
        document.getElementById("stateChange").innerHTML = "TelefoonView >>";
        document.getElementById("viewTekst").innerHTML = "Mailview";

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
                var Links = doc.data().Link;
                var LinkTexts = doc.data().Linktexten;

                var kliks = document.createElement('p');
                kliks.innerHTML = Kliks;
                kliks.id = kliks;
                var klikstekst = document.createElement('p');
                klikstekst.innerHTML = "Heeft deze vraag u geholpen?";
                kliks.appendChild(klikstekst);

                var breakline = document.createElement("BR");
                var bl2 = document.createElement("BR");
                var bl3 = document.createElement("BR");
                var bl4 = document.createElement("BR");
                var bl5 = document.createElement("BR");

                var bl6 = document.createElement("BR");
                var bl7 = document.createElement("BR");

                //lijst en divjes per vraag
                var card = document.createElement('div');
                card.className = "accordion-item";
                card.id = Vraag;

                var cardHeader = document.createElement('div');
                cardHeader.className = "accordion-header";
                cardHeader.id = "heading" + i;

                var h5 = document.createElement('h5');
                h5.className = "mb-0";

                var btn = document.createElement("button");
                btn.className = "accordion-button";
                btn.type = "button";
                btn.id = Vraag;
                btn.setAttribute("data-bs-toggle", "collapse");
                btn.setAttribute("data-bs-target", "#collapse" + i);
                btn.setAttribute("aria-expanded", "true");
                btn.setAttribute("aria-controls", "collapse" + i);
                btn.setAttribute("onclick", "viewCount('" + Categorie + " | " + Vraag + "');");
                btn.innerHTML = Categorie + " | " + Vraag;

                h5.appendChild(btn);
                cardHeader.appendChild(h5);
                card.appendChild(cardHeader);

                //voor het collapsen
                var collapse = document.createElement('div');
                collapse.id = "collapse" + i;
                collapse.className = "accordion-collapse collapse";
                collapse.setAttribute("aria-labelledby", "heading" + i);

                //inhoud van vraag
                var cardbody = document.createElement('div');
                cardbody.className = "accordion-body";


                //trefwoorden
                for (k = 0; k < Trefwoorden.length; k++) {
                    var trefwoorden = document.createElement('label');
                    trefwoorden.innerHTML = Trefwoorden[k] + "&nbsp;";
                    trefwoorden.className = 'trefwoordID' + Categorie + " | " + Vraag;
                    cardbody.appendChild(trefwoorden);
                    cardbody.appendChild(bl2);
                }

                cardbody.appendChild(bl4);

                //antwoord
                var antwoord = document.createElement('p');
                antwoord.innerHTML = Antwoord;
                cardbody.appendChild(antwoord);
                cardbody.appendChild(bl3);

                var row2 = document.createElement("div");
                row2.id = "kaartinfo";
                row2.className = "row";


                var col2 = document.createElement("div");
                col2.className = "col-6";
                col2.id = "col2";


                var col1 = document.createElement("div");
                col1.className = "col-6";
                col1.id = "col1";

                var ul1 = document.createElement("ul");

                row2.appendChild(col1);
                row2.appendChild(col2);

                col2.appendChild(ul1);

                cardbody.appendChild(row2);



                //gerelateerde vragen
                for (j = 0; j < Gerelateerd.length; j++) {
                    var gerelateerdeVragenHyperlink = document.createElement("button");
                    gerelateerdeVragenHyperlink.tagName = "gerelateerd" + j;
                    gerelateerdeVragenHyperlink.className = "btn btn-secondary";
                    gerelateerdeVragenHyperlink.innerHTML = Gerelateerd[j];
                    gerelateerdeVragenHyperlink.setAttribute("onclick", "openVraag('" + Gerelateerd[j] + "');");
                    col1.appendChild(breakline);
                    col1.appendChild(gerelateerdeVragenHyperlink);
                    gerelateerdeVragenHyperlink.appendChild(bl5);
                    col1.appendChild(bl6);
                }

                //aantal kliks
                var klikKnop = document.createElement("button");
                var klikKnopTekst = document.createElement("p");
                klikKnop.innerHTML = "+1";

                klikKnop.className = "btn btn-primary";
                klikKnop.setAttribute("onclick", "klikCount('" + Categorie + " | " + Vraag + "');")
                klikKnopTekst.append(klikKnop);
                kliks.append(klikKnopTekst);

                col1.append(kliks);

                //hyperlinks
                for (q = 0; q < Links.length; q++) {
                    var li = document.createElement("li");
                    var hyperlink = document.createElement("a");
                    hyperlink.target = "_blank";
                    hyperlink.href = Links[q];
                    hyperlink.innerHTML = LinkTexts[q];

                    hyperlink.appendChild(bl7);
                    li.appendChild(hyperlink);
                    col2.appendChild(li);
                }
                //
                collapse.appendChild(cardbody);
                card.appendChild(collapse);



                //lijst in div zetten
                document.getElementById("accordion").appendChild(card);

                if (document.getElementById("categorieKeuze").innerText == Categorie) {
                    console.log("goed");
                } else {
                    card.style.display = "none";
                }

                i++;

            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

}


vulVragen();

//open een vraag als je erop klikt
function openVraag(vraagNaam) {
    var elements = document.getElementsByClassName("accordion-button");
    for (var i = 0; i < elements.length; i++) {
/*        console.log(elements[i].innerHTML);
*/        if (elements[i].innerHTML.includes(vraagNaam)) {
/*            console.log(elements[i].parentElement.parentElement.parentElement);
*/            if (elements[i].parentElement.parentElement.parentElement.style.display == "none") {
                console.log("test");
                elements[i].parentElement.parentElement.parentElement.style.display = "block";
            }
            elements[i].click();
            var rect = elements[i].parentElement.getBoundingClientRect();
            setTimeout(function () {
                window.scroll(rect.width, rect.y);
            }, 200)   
        }   
    }
}

//zoek naar vragen op basis van de trefwoorden
function zoekFunctie() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('zoekInput');
    filter = input.value.toUpperCase();
    ul = document.getElementsByClassName("accordion-header");

    // Loop through all list items, and hide those who don't match the search query
    for (l = 0; l < ul.length; l++) {
        li = document.querySelectorAll('[id^="heading"]');
        li2 = document.querySelectorAll('[id^="antwoord"]');
        console.log();
        var trefwoorden = document.querySelectorAll('[class^="trefwoordID' + li[l].children[0].children[0].innerHTML + '"]');
/*        var antwoord = li2[l].children[0].innerHTML;
*/        var vraag = li[l].children[0].children[0].innerHTML;
        for (i = 0; i < trefwoorden.length; i++) {
            a = trefwoorden[i].innerHTML;
            txtValue = a;
            var ul1 = $(ul[l]).parents()[0];

            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                ul1.style.display = "";
                break;
            } else 
                if (vraag.toUpperCase().indexOf(filter) > -1) {
                    ul1.style.display = "";
                } else /*if
                 (antwoord.toUpperCase().indexOf(filter) > -1) {
                    ul1.style.display = "";
                } else*/ {
                    ul1.style.display = "none";
                }
            }
        }
    }


//bijhouden hoe vaak er op de like knop gedrukt is
function klikCount(vraagNaam) {
    var ref = db.collection("Vraag");
    const increment = firebase.firestore.FieldValue.increment(1);

    var elements = document.getElementsByClassName("accordion-button");
    for (var i = 0; i < elements.length; i++) {
        console.log(elements[i].innerHTML);
        console.log(vraagNaam);
        if (elements[i].innerHTML == vraagNaam) {
            ref.doc(vraagNaam).update({ Klikcount: increment });
            
        }

    }
}

/*function vraagSave(element) {

    console.log(element);
    if (element == null) {
        console.log("fout");
        document.cookie = "vraag=Geen probleem ingevuld"
    } else {
        console.log("goed");
        document.cookie = "vraag=" + element;
        redirect();
    }

}

function redirect() {
    window.open("https://localhost:44330/Home/vraagBewerken", "_self")
}
*/
//bijhouden hoe vaak de vraag opengeklikt is
function viewCount(vraagNaam) {
    var boolvraagNaam = false;
    var ref = db.collection("Vraag");
    const increment = firebase.firestore.FieldValue.increment(1);
    var elements = document.getElementsByClassName("accordion-button");
    for (var i = 0; i < elements.length; i++) {
/*        console.log(elements[i].innerHTML);
        console.log(vraagNaam);*/
        if (elements[i].innerHTML == vraagNaam) {
            if (boolvraagNaam) {
                boolvraagNaam = false;
            }
            else {
                ref.doc(vraagNaam).update({ Viewcount: increment });
                boolvraagNaam = true;
            }

        }

    }

}

function changePhase() {
    if (phase) {
        phase = false;
        vulVragen();
    }
    else {
        phase = true;

        vulVragen();
    }
}