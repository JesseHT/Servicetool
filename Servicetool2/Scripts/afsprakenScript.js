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
//var fullLijst = document.createElement('ul');
//fullLijst.id = "vraagLijst";

//document.getElementById("vragen").appendChild(fullLijst);

vraagRef.where("Categorie", "==", "Afspraken")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            //data uit de db halen
            var Vraag = doc.data().Vraag;
            var Antwoord = doc.data().Antwoord;
            var Kliks = doc.data().Klikcount;
            var Trefwoorden = doc.data().Trefwoorden;
            var Gerelateerd = doc.data().Gerelateerd;
            var kliks = document.createElement('p');
            kliks.innerHTML = Kliks;
            kliks.id = kliks;

            var breakline = document.createElement("BR");
            var bl2 = document.createElement("BR");
            var bl3 = document.createElement("BR");
            var bl4 = document.createElement("BR");
            var bl5 = document.createElement("BR");

            //lijst en divjes per vraag
            var card = document.createElement('div');
            card.className = "card";
            card.id = Vraag;

            var cardHeader = document.createElement('div');
            cardHeader.className = "card-header";
            cardHeader.id = "heading" + i;

            var h5 = document.createElement('h5');
            h5.className = "mb-0";

            var btn = document.createElement("button");
            btn.className = "btn btn-block collapsed";
            btn.setAttribute("data-toggle", "collapse");
            btn.setAttribute("data-target", "#collapse" + i);
            btn.setAttribute("aria-expanded", "true");
            btn.setAttribute("aria-controls", "collapse" + i);
            btn.innerHTML = Vraag;

            h5.appendChild(btn);
            cardHeader.appendChild(h5);
            card.appendChild(cardHeader);

            var collapse = document.createElement('div');
            collapse.id = "collapse" + i;
            collapse.className = "collapse";
            collapse.setAttribute("aria-labelledby", "heading" + i);

            var cardbody = document.createElement('div');
            cardbody.className = "card-body";
            collapse.appendChild(cardbody);

            for (k = 0; k < Trefwoorden.length; k++) {
                var trefwoorden = document.createElement('label');
                trefwoorden.innerHTML = Trefwoorden[k] + "&nbsp;";
                trefwoorden.className = 'trefwoordID' + Vraag;
                cardbody.appendChild(trefwoorden);
                cardbody.appendChild(bl2);
            }

            cardbody.appendChild(bl4);

            var antwoord = document.createElement('p');
            antwoord.innerHTML = Antwoord;
            cardbody.appendChild(antwoord);
            cardbody.appendChild(bl3);

            for (j = 0; j < Gerelateerd.length; j++) {
                var gerelateerdeVragenHyperlink = document.createElement("a");

                gerelateerdeVragenHyperlink.tagName = "gerelateerd" + j;
                gerelateerdeVragenHyperlink.innerHTML = Gerelateerd[j];
                cardbody.appendChild(breakline);
                cardbody.appendChild(gerelateerdeVragenHyperlink);
                cardbody.appendChild(bl5);
            }
            cardbody.append(kliks);
            card.appendChild(collapse);

            //lijst in div zetten
            document.getElementById("accordion").appendChild(card);

            console.log(doc.id, " => ", doc.data());
            console.log(Vraag);
            i++;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });



function zoekFunctie() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('zoekInput');
    filter = input.value.toUpperCase();
    ul = document.getElementsByClassName("card-header");

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

function sortFunctie() {
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
            /* Check if the next item should switch place with the current item,
            based on the sorting direction (asc or desc): */
            if (dir == "asc") {
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    /* If next item is alphabetically lower than current item,
                    mark as a switch and break the loop: */
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
                    /* If next item is alphabetically higher than current item,
                    mark as a switch and break the loop: */
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            // Each time a switch is done, increase switchcount by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
