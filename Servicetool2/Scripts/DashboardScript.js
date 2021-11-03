firebase.app();
var db = firebase.firestore();


var vraagRef = db.collection("Vraag");
var i = 0;
console.log(phase);
//vragen laden uit de db 
if (phase == 'telefoon') {
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
                    hyperlink.href = Links[q];
                    hyperlink.innerHTML = Links[q];
                    
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
} else {
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
                    hyperlink.href = Links[q];
                    hyperlink.innerHTML = Links[q];

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

//open een vraag als je erop klikt
function openVraag(vraagNaam) {
    var elements = document.getElementsByClassName("accordion-button");
    for (var i = 0; i < elements.length; i++) {
        console.log(elements[i].innerHTML);
        if (elements[i].innerHTML.includes(vraagNaam)) {
            console.log(elements[i].parentElement.parentElement.parentElement);
            if (elements[i].parentElement.parentElement.parentElement.style.display == "none") {
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

        var trefwoorden = document.querySelectorAll('[class^="trefwoordID' + li[l].children[0].children[0].innerHTML + '"]');

        for (i = 0; i < trefwoorden.length; i++) {
            a = trefwoorden[i].innerHTML;
            console.log(a);
            txtValue = a;
            var ul1 = $(ul[l]).parents()[0];

            console.log(txtValue.toUpperCase().indexOf(filter));
            if (txtValue.toUpperCase().indexOf(filter) > -1) {

                ul1.style.display = "";
                break;
            } else {
                ul1.style.display = "none";
            }
        }
    }
}

/*function sortFunctie() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
    list = document.getElementById("vraagLijst");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName("li");
        // Loop through all list-items:
        for (i = 0; i < (b.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
             Check if the next item should switch place with the current item,
            based on the sorting direction (asc or desc): 
            if (dir == "asc") {
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                     If next item is alphabetically lower than current item,
                    mark as a switch and break the loop: 
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
                     If next item is alphabetically higher than current item,
                    mark as a switch and break the loop: 
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
             If a switch has been marked, make the switch
            and mark that a switch has been done: 
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            // Each time a switch is done, increase switchcount by 1:
            switchcount++;
        } else {
             If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. 
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}*/

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


//bijhouden hoe vaak de vraag opengeklikt is
function viewCount(vraagNaam) {
    var boolvraagNaam = false;
    var ref = db.collection("Vraag");
    const increment = firebase.firestore.FieldValue.increment(1);
    console.log(vraagNaam);
    var elements = document.getElementsByClassName("accordion-button");
    for (var i = 0; i < elements.length; i++) {
        console.log(elements[i].innerHTML);
        console.log(vraagNaam);
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
    if (phase == "telefoon") {
        localStorage.setItem('phase', 'mail');
        console.log(phase);
        location.reload();
    }
    else {
        localStorage.setItem('phase', 'telefoon');
        console.log(phase);
        location.reload();
    }
}