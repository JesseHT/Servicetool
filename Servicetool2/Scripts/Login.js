function signInWithEmailPassword() {
    var url = document.getElementById("url").value

    console.log("Go " + url)
    var email = document.getElementById("user").value
    var password = document.getElementById("ww").value
    /*var email = "stef@heattransformers.com";
    var password = "stef1999";*/
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user)
            console.log(user.email)
            localStorage.setItem("Logged_in", "#527467");
            localStorage.setItem("Logged_in_user", user.email);
            localStorage.setItem("Logged_in_Useruser", JSON.stringify(user));
            localStorage.setItem("Logged_in_userid", user.uid);
            localStorage.setItem("Logged_in_emailVerified", user.emailVerified);
            var url = document.getElementById("url").value
            window.location.href = url


            //set mail/uuid in de local storage
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    var uid = user.uid;
                    // ...
                } else {
                    // User is signed out
                    // ...
                }
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            document.getElementById("error").innerHTML = errorMessage
            document.getElementById("error").style.display = "block"
        });
}

function createWithEmailPassword() {


    var email = document.getElementById("user1").value
    var password = document.getElementById("ww1").value
    /*    var email = "stefkonijn1@heattransformers.com";
        var password = "stef1999";*/
    if (email.includes("heattransformers.com")) {


        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                localStorage.setItem("Logged_in", "#527467");
                localStorage.setItem("Logged_in_user", user.email);
                localStorage.setItem("Logged_in_userid", user.uid);
                localStorage.setItem("Logged_in_emailVerified", user.emailVerified);

                var url = document.getElementById("url").value
                user.sendEmailVerification().then(function () {

                    document.getElementById("gelukt").innerHTML = "Account maken gelukt. Verificatiemail verstuurd."
                    document.getElementById("gelukt").style.display = "block"
                    // Email sent.
                }).catch(function (error) {
                    // An error happened.

                    document.getElementById("error2").innerHTML = error.errorMessage
                    document.getElementById("error2").style.display = "block"
                });
                loginAgain();
                /*                window.location.href = url
                */
                // ...
            })
            .catch((error) => {
                console.log("account aanmaken mislukt")
                var errorCode = error.code;
                var errorMessage = error.message;

                document.getElementById("error2").innerHTML = errorMessage
                document.getElementById("error2").style.display = "block"
                console.log(errorCode)
                console.log(errorMessage)
                // ..
            });
    }
    else {
        alert("Je bent niet bevoegd om een account aan te maken...")
    }
}
function newAccount() {
    document.getElementById("login").style.display = "none"
    document.getElementById("create").style.display = "block"
}
function loginAgain() {
    document.getElementById("login").style.display = "block"
    document.getElementById("create").style.display = "none"
}

function onload() {
    var uid = localStorage.getItem("Logged_in_userid")
    var mail = localStorage.getItem("Logged_in_user")
    var ver = localStorage.getItem("Logged_in_emailVerified")
    if (ver == "true") {
        ver = true
    }
    else {
        ver = false
    }
    firebase.initializeApp({
        apiKey: 'AIzaSyBlEyAJb6dTHnN8kDbdBhGslrunIaX0z2Q',
        authDomain: 'servicetool-81486.firebaseapp.com',
        projectId: 'servicetool- 81486',
        auth: {
            uid: uid, email: mail, email_verified: ver
        }

    });

    var user = localStorage.getItem("Logged_in_user");
    if (user != null) {
        document.getElementById("user").value = user
        var ver = localStorage.getItem("Logged_in_emailVerified");
        console.log(ver)
        if (ver != "true") {
            document.getElementById("error").innerHTML = "Je account is nog niet geverifieerd. Klik op de link die je in je mailbox hebt ontvangen"
            document.getElementById("error").style.display = "block"

        }
    }


}