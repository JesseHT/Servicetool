firebase.app();
var db = firebase.firestore();

var vraagRef = db.collection("Vraag");
var i = 0;

function vulVragen() {
	if (phase) {
		document.getElementById("algemeenDiv").innerHTML = "";
		document.getElementById("afsprakenDiv").innerHTML = "";
		document.getElementById("overigDiv").innerHTML = "";

		document.getElementById("financieelDiv").innerHTML = "";
		document.getElementById("stateChange").innerHTML = "mailView >>";
		document.getElementById("viewTekst").innerHTML = "Telefoonview";


		vraagRef.where("Categorie", "==", "Algemeen").orderBy("Klikcount", "desc").limit(3)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {

					//data uit de db halen
					var Vraag = doc.data().Vraag;
					var Antwoord = doc.data().TelAntwoord;
					var Kliks = doc.data().Klikcount;
					var Categorie = doc.data().Categorie;
					var Trefwoorden = doc.data().Trefwoorden;

					var kliks = document.createElement('p');
					kliks.innerHTML = Kliks;
					kliks.id = kliks;
					var klikstekst = document.createElement('p');
					klikstekst.innerHTML = "Heeft deze vraag u geholpen?";
					kliks.appendChild(klikstekst);

					var bl2 = document.createElement("BR");
					var bl3 = document.createElement("BR");
					var bl4 = document.createElement("BR");

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
					collapse.appendChild(cardbody);

					//trefwoorden
					for (k = 0; k < Trefwoorden.length; k++) {
						var trefwoorden = document.createElement('label');
						trefwoorden.innerHTML = Trefwoorden[k] + "&nbsp;";
						trefwoorden.className = 'trefwoordID' + Vraag;
						cardbody.appendChild(trefwoorden);
						cardbody.appendChild(bl2);
					}

					cardbody.appendChild(bl4);

					//antwoord
					var antwoord = document.createElement('p');
					antwoord.innerHTML = Antwoord;
					cardbody.appendChild(antwoord);
					cardbody.appendChild(bl3);

					//aantal kliks
					var klikKnop = document.createElement("button");
					var klikKnopTekst = document.createElement("p");
					klikKnop.innerHTML = "+1";

					klikKnop.className = "btn btn-primary";
					klikKnop.setAttribute("onclick", "klikCount('" + Categorie + " | " + Vraag + "');")
					klikKnopTekst.append(klikKnop);
					kliks.append(klikKnopTekst);

					cardbody.append(kliks);

					//
					card.appendChild(collapse);

					//lijst in div zetten
					document.getElementById("algemeenDiv").appendChild(card);

					i++;

				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

		vraagRef.where("Categorie", "==", "Afspraken").orderBy("Klikcount", "desc").limit(3)
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
					collapse.appendChild(cardbody);

					//trefwoorden
					for (k = 0; k < Trefwoorden.length; k++) {
						var trefwoorden = document.createElement('label');
						trefwoorden.innerHTML = Trefwoorden[k] + "&nbsp;";
						trefwoorden.className = 'trefwoordID' + Vraag;
						cardbody.appendChild(trefwoorden);
						cardbody.appendChild(bl2);
					}

					cardbody.appendChild(bl4);

					//antwoord
					var antwoord = document.createElement('p');
					antwoord.innerHTML = Antwoord;
					cardbody.appendChild(antwoord);
					cardbody.appendChild(bl3);

					//gerelateerde vragen
					/*for (j = 0; j < Gerelateerd.length; j++) {
						var gerelateerdeVragenHyperlink = document.createElement("button");
						gerelateerdeVragenHyperlink.tagName = "gerelateerd" + j;
						gerelateerdeVragenHyperlink.className = "btn btn-secondary";
						gerelateerdeVragenHyperlink.innerHTML = Gerelateerd[j];
						gerelateerdeVragenHyperlink.setAttribute("onclick", "openVraag('" + Gerelateerd[j] + "');");
						cardbody.appendChild(breakline);
						cardbody.appendChild(gerelateerdeVragenHyperlink);
						cardbody.appendChild(bl5);
						cardbody.appendChild(bl6);
					}*/

					//aantal kliks
					var klikKnop = document.createElement("button");
					var klikKnopTekst = document.createElement("p");
					klikKnop.innerHTML = "+1";

					klikKnop.className = "btn btn-primary";
					klikKnop.setAttribute("onclick", "klikCount('" + Categorie + " | " + Vraag + "');")
					klikKnopTekst.append(klikKnop);
					kliks.append(klikKnopTekst);

					cardbody.append(kliks);

					//
					card.appendChild(collapse);

					//lijst in div zetten
					document.getElementById("afsprakenDiv").appendChild(card);

					i++;

				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

		vraagRef.where("Categorie", "==", "Financieel").orderBy("Klikcount", "desc").limit(3)
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
					collapse.appendChild(cardbody);

					//trefwoorden
					for (k = 0; k < Trefwoorden.length; k++) {
						var trefwoorden = document.createElement('label');
						trefwoorden.innerHTML = Trefwoorden[k] + "&nbsp;";
						trefwoorden.className = 'trefwoordID' + Vraag;
						cardbody.appendChild(trefwoorden);
						cardbody.appendChild(bl2);
					}

					cardbody.appendChild(bl4);

					//antwoord
					var antwoord = document.createElement('p');
					antwoord.innerHTML = Antwoord;
					cardbody.appendChild(antwoord);
					cardbody.appendChild(bl3);

					//gerelateerde vragen
					/*for (j = 0; j < Gerelateerd.length; j++) {
						var gerelateerdeVragenHyperlink = document.createElement("button");
						gerelateerdeVragenHyperlink.tagName = "gerelateerd" + j;
						gerelateerdeVragenHyperlink.className = "btn btn-secondary";
						gerelateerdeVragenHyperlink.innerHTML = Gerelateerd[j];
						gerelateerdeVragenHyperlink.setAttribute("onclick", "openVraag('" + Gerelateerd[j] + "');");
						cardbody.appendChild(breakline);
						cardbody.appendChild(gerelateerdeVragenHyperlink);
						cardbody.appendChild(bl5);
						cardbody.appendChild(bl6);
					}*/

					//aantal kliks
					var klikKnop = document.createElement("button");
					var klikKnopTekst = document.createElement("p");
					klikKnop.innerHTML = "+1";

					klikKnop.className = "btn btn-primary";
					klikKnop.setAttribute("onclick", "klikCount('" + Categorie + " | " + Vraag + "');")
					klikKnopTekst.append(klikKnop);
					kliks.append(klikKnopTekst);

					cardbody.append(kliks);

					//
					card.appendChild(collapse);

					//lijst in div zetten
					document.getElementById("financieelDiv").appendChild(card);

					i++;

				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

		vraagRef.where("Categorie", "==", "Overig").orderBy("Klikcount", "desc").limit(3)
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
					collapse.appendChild(cardbody);

					//trefwoorden
					for (k = 0; k < Trefwoorden.length; k++) {
						var trefwoorden = document.createElement('label');
						trefwoorden.innerHTML = Trefwoorden[k] + "&nbsp;";
						trefwoorden.className = 'trefwoordID' + Vraag;
						cardbody.appendChild(trefwoorden);
						cardbody.appendChild(bl2);
					}

					cardbody.appendChild(bl4);

					//antwoord
					var antwoord = document.createElement('p');
					antwoord.innerHTML = Antwoord;
					cardbody.appendChild(antwoord);
					cardbody.appendChild(bl3);

					//gerelateerde vragen
					/*for (j = 0; j < Gerelateerd.length; j++) {
						var gerelateerdeVragenHyperlink = document.createElement("button");
						gerelateerdeVragenHyperlink.tagName = "gerelateerd" + j;
						gerelateerdeVragenHyperlink.className = "btn btn-secondary";
						gerelateerdeVragenHyperlink.innerHTML = Gerelateerd[j];
						gerelateerdeVragenHyperlink.setAttribute("onclick", "openVraag('" + Gerelateerd[j] + "');");
						cardbody.appendChild(breakline);
						cardbody.appendChild(gerelateerdeVragenHyperlink);
						cardbody.appendChild(bl5);
						cardbody.appendChild(bl6);
					}*/

					//aantal kliks
					var klikKnop = document.createElement("button");
					var klikKnopTekst = document.createElement("p");
					klikKnop.innerHTML = "+1";

					klikKnop.className = "btn btn-primary";
					klikKnop.setAttribute("onclick", "klikCount('" + Categorie + " | " + Vraag + "');")
					klikKnopTekst.append(klikKnop);
					kliks.append(klikKnopTekst);

					cardbody.append(kliks);

					//
					card.appendChild(collapse);

					//lijst in div zetten
					document.getElementById("overigDiv").appendChild(card);

					i++;

				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

	} else {
		document.getElementById("algemeenDiv").innerHTML = "";
		document.getElementById("afsprakenDiv").innerHTML = "";
		document.getElementById("overigDiv").innerHTML = "";

		document.getElementById("financieelDiv").innerHTML = "";
		document.getElementById("stateChange").innerHTML = "telefoonView >>";
		document.getElementById("viewTekst").innerHTML = "Mailview";

		vraagRef.where("Categorie", "==", "Algemeen").orderBy("Klikcount", "desc").limit(3)
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
					collapse.appendChild(cardbody);

					//trefwoorden
					for (k = 0; k < Trefwoorden.length; k++) {
						var trefwoorden = document.createElement('label');
						trefwoorden.innerHTML = Trefwoorden[k] + "&nbsp;";
						trefwoorden.className = 'trefwoordID' + Vraag;
						cardbody.appendChild(trefwoorden);
						cardbody.appendChild(bl2);
					}

					cardbody.appendChild(bl4);

					//antwoord
					var antwoord = document.createElement('p');
					antwoord.innerHTML = Antwoord;
					cardbody.appendChild(antwoord);
					cardbody.appendChild(bl3);

					//gerelateerde vragen
					/*for (j = 0; j < Gerelateerd.length; j++) {
						var gerelateerdeVragenHyperlink = document.createElement("button");
						gerelateerdeVragenHyperlink.tagName = "gerelateerd" + j;
						gerelateerdeVragenHyperlink.className = "btn btn-secondary";
						gerelateerdeVragenHyperlink.innerHTML = Gerelateerd[j];
						gerelateerdeVragenHyperlink.setAttribute("onclick", "openVraag('" + Gerelateerd[j] + "');");
						cardbody.appendChild(breakline);
						cardbody.appendChild(gerelateerdeVragenHyperlink);
						cardbody.appendChild(bl5);
						cardbody.appendChild(bl6);
					}*/

					//aantal kliks
					var klikKnop = document.createElement("button");
					var klikKnopTekst = document.createElement("p");
					klikKnop.innerHTML = "+1";

					klikKnop.className = "btn btn-primary";
					klikKnop.setAttribute("onclick", "klikCount('" + Categorie + " | " + Vraag + "');")
					klikKnopTekst.append(klikKnop);
					kliks.append(klikKnopTekst);

					cardbody.append(kliks);

					//
					card.appendChild(collapse);

					//lijst in div zetten
					document.getElementById("algemeenDiv").appendChild(card);

					i++;

				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

		vraagRef.where("Categorie", "==", "Afspraken").orderBy("Klikcount", "desc").limit(3)
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
					collapse.appendChild(cardbody);

					//trefwoorden
					for (k = 0; k < Trefwoorden.length; k++) {
						var trefwoorden = document.createElement('label');
						trefwoorden.innerHTML = Trefwoorden[k] + "&nbsp;";
						trefwoorden.className = 'trefwoordID' + Vraag;
						cardbody.appendChild(trefwoorden);
						cardbody.appendChild(bl2);
					}

					cardbody.appendChild(bl4);

					//antwoord
					var antwoord = document.createElement('p');
					antwoord.innerHTML = Antwoord;
					cardbody.appendChild(antwoord);
					cardbody.appendChild(bl3);

					//gerelateerde vragen
					/*for (j = 0; j < Gerelateerd.length; j++) {
						var gerelateerdeVragenHyperlink = document.createElement("button");
						gerelateerdeVragenHyperlink.tagName = "gerelateerd" + j;
						gerelateerdeVragenHyperlink.className = "btn btn-secondary";
						gerelateerdeVragenHyperlink.innerHTML = Gerelateerd[j];
						gerelateerdeVragenHyperlink.setAttribute("onclick", "openVraag('" + Gerelateerd[j] + "');");
						cardbody.appendChild(breakline);
						cardbody.appendChild(gerelateerdeVragenHyperlink);
						cardbody.appendChild(bl5);
						cardbody.appendChild(bl6);
					}*/

					//aantal kliks
					var klikKnop = document.createElement("button");
					var klikKnopTekst = document.createElement("p");
					klikKnop.innerHTML = "+1";

					klikKnop.className = "btn btn-primary";
					klikKnop.setAttribute("onclick", "klikCount('" + Categorie + " | " + Vraag + "');")
					klikKnopTekst.append(klikKnop);
					kliks.append(klikKnopTekst);

					cardbody.append(kliks);

					//
					card.appendChild(collapse);

					//lijst in div zetten
					document.getElementById("afsprakenDiv").appendChild(card);

					i++;

				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

		vraagRef.where("Categorie", "==", "Financieel").orderBy("Klikcount", "desc").limit(3)
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
					collapse.appendChild(cardbody);

					//trefwoorden
					for (k = 0; k < Trefwoorden.length; k++) {
						var trefwoorden = document.createElement('label');
						trefwoorden.innerHTML = Trefwoorden[k] + "&nbsp;";
						trefwoorden.className = 'trefwoordID' + Vraag;
						cardbody.appendChild(trefwoorden);
						cardbody.appendChild(bl2);
					}

					cardbody.appendChild(bl4);

					//antwoord
					var antwoord = document.createElement('p');
					antwoord.innerHTML = Antwoord;
					cardbody.appendChild(antwoord);
					cardbody.appendChild(bl3);

					//gerelateerde vragen
					/*for (j = 0; j < Gerelateerd.length; j++) {
						var gerelateerdeVragenHyperlink = document.createElement("button");
						gerelateerdeVragenHyperlink.tagName = "gerelateerd" + j;
						gerelateerdeVragenHyperlink.className = "btn btn-secondary";
						gerelateerdeVragenHyperlink.innerHTML = Gerelateerd[j];
						gerelateerdeVragenHyperlink.setAttribute("onclick", "openVraag('" + Gerelateerd[j] + "');");
						cardbody.appendChild(breakline);
						cardbody.appendChild(gerelateerdeVragenHyperlink);
						cardbody.appendChild(bl5);
						cardbody.appendChild(bl6);
					}*/

					//aantal kliks
					var klikKnop = document.createElement("button");
					var klikKnopTekst = document.createElement("p");
					klikKnop.innerHTML = "+1";

					klikKnop.className = "btn btn-primary";
					klikKnop.setAttribute("onclick", "klikCount('" + Categorie + " | " + Vraag + "');")
					klikKnopTekst.append(klikKnop);
					kliks.append(klikKnopTekst);

					cardbody.append(kliks);

					//
					card.appendChild(collapse);

					//lijst in div zetten
					document.getElementById("financieelDiv").appendChild(card);

					i++;

				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

		vraagRef.where("Categorie", "==", "Overig").orderBy("Klikcount", "desc").limit(3)
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
					collapse.appendChild(cardbody);

					//trefwoorden
					for (k = 0; k < Trefwoorden.length; k++) {
						var trefwoorden = document.createElement('label');
						trefwoorden.innerHTML = Trefwoorden[k] + "&nbsp;";
						trefwoorden.className = 'trefwoordID' + Vraag;
						cardbody.appendChild(trefwoorden);
						cardbody.appendChild(bl2);
					}

					cardbody.appendChild(bl4);

					//antwoord
					var antwoord = document.createElement('p');
					antwoord.innerHTML = Antwoord;
					cardbody.appendChild(antwoord);
					cardbody.appendChild(bl3);

					//gerelateerde vragen
					/*for (j = 0; j < Gerelateerd.length; j++) {
						var gerelateerdeVragenHyperlink = document.createElement("button");
						gerelateerdeVragenHyperlink.tagName = "gerelateerd" + j;
						gerelateerdeVragenHyperlink.className = "btn btn-secondary";
						gerelateerdeVragenHyperlink.innerHTML = Gerelateerd[j];
						gerelateerdeVragenHyperlink.setAttribute("onclick", "openVraag('" + Gerelateerd[j] + "');");
						cardbody.appendChild(breakline);
						cardbody.appendChild(gerelateerdeVragenHyperlink);
						cardbody.appendChild(bl5);
						cardbody.appendChild(bl6);
					}*/

					//aantal kliks
					var klikKnop = document.createElement("button");
					var klikKnopTekst = document.createElement("p");
					klikKnop.innerHTML = "+1";

					klikKnop.className = "btn btn-primary";
					klikKnop.setAttribute("onclick", "klikCount('" + Categorie + " | " + Vraag + "');")
					klikKnopTekst.append(klikKnop);
					kliks.append(klikKnopTekst);

					cardbody.append(kliks);

					//
					card.appendChild(collapse);

					//lijst in div zetten
					document.getElementById("overigDiv").appendChild(card);

					i++;

				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	}
}

vulVragen();



function openVraag(vraagNaam) {
	var elements = document.getElementsByClassName("accordion-button");
	console.log(elements.length);
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].innerHTML == vraagNaam) {
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

function klikCount(vraagNaam) {
	var ref = db.collection("Vraag");
	const increment = firebase.firestore.FieldValue.increment(1);

	var elements = document.getElementsByClassName("accordion-button");
	for (var i = 0; i < elements.length; i++) {
		console.log(elements[i].innerHTML);
		console.log(vraagNaam);
		if (elements[i].innerHTML == vraagNaam) {
			ref.doc(vraagNaam).update({ Klikcount: increment }).then(function () {
				window.top.location = window.top.location;

			});

		}

	}
}

var boolvraagNaam;

function viewCount(vraagNaam) {

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
			} else {
				ref.doc(vraagNaam).update({ Viewcount: increment });
				boolvraagNaam = true;
			}

		}

	}
}

function changePhase() {
	if (phase) {
		phase = false;
		console.log(phase);
		vulVragen();
	}
	else {
		phase = true;
		console.log(phase);
		vulVragen();
	}
}
console.log(phase);