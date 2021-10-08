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


var vraagRef = db.collection("Storingstool");
var i = 0;

vraagRef.where("Categorie", "==", "Warmtepomp")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var Merk = doc.data().Merk;
            var Type = doc.data().Type;
        var opt = document.createElement('option');
        
        opt.value = Merk +" "+ Type;
        opt.innerHTML = Merk + " " + Type;
        document.getElementById("technischWarmtepompen").append(opt);
    });
})
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

vraagRef.where("Categorie", "==", "Ketel")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var Merk = doc.data().Merk;
            var Type = doc.data().Type;
            var opt = document.createElement('option');

            opt.value = Merk +" "+ Type;
            opt.innerHTML = Merk + " " + Type;
            document.getElementById("technischKetels").append(opt);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

vraagRef.where("Categorie", "==", "Thermostaat")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var Merk = doc.data().Merk;
            var Type = doc.data().Type;
            var opt = document.createElement('option');

            opt.value = Merk + " " +Type;
            opt.innerHTML = Merk + " " + Type;
            document.getElementById("technischThermostaten").append(opt);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });







