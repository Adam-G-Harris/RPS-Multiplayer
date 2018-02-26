window.onload = () => {

    // Firebase configuration
    const config = {
        apiKey: "AIzaSyB-i_H3NI98S3d-Fp6n0_CvlCI3-NMLlEk",
        authDomain: "rps-multiplayer-51545.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-51545.firebaseio.com",
        projectId: "rps-multiplayer-51545",
        storageBucket: "rps-multiplayer-51545.appspot.com",
        messagingSenderId: "491831187604"
    };

    // Init Firebase app
    firebase.initializeApp(config);

    // Firestore
    const firestore = firebase.firestore();

    // Authentication
    const auth = firebase.auth();

    // User inputs
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');

    // User authentication buttons
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    // User login event
    btnLogin.addEventListener('click', e => {

        // User email & password values
        const email = txtEmail.value;
        const password = txtPassword.value;

        // User login attempt
        const promise = auth.signInWithEmailAndPassword(email, password);

        // Login error catch
        promise.catch(e => console.log(e.message));
    });

    // User sign up event
    btnSignUp.addEventListener('click', e => {

        // User email & password values
        const email = txtEmail.value;
        const password = txtPassword.value;

        // User sign up attempt
        const promise = auth.createUserWithEmailAndPassword(email, password);

        // sign up error catch
        promise.catch(e => console.log(e.message));
    });

    // User logout event
    btnLogout.addEventListener('click', e => {

        // User logout
        firebase.auth().signOut();
    });

    // Real time authentication state listener
    firebase.auth().onAuthStateChanged(user => {

        // User is in the cloud
        if (user) {

            // Display logout button
            btnLogout.style.display = 'block';

            console.log(user);

            // User isn't in the cloud
        } else {

            // Hide logout button
            btnLogout.style.display = 'none';

            console.log("You're not currently logged in.");
        }
    });

    // -----------------------------------------------------------------

    // Real time update method

    /*const docSamples = firestore.doc('samples/sandwichData');
    const display = document.getElementById('output');
    const userInput = document.getElementById('userInput');
    const save = document.getElementById('save');

    save.addEventListener('click', function () {
        const userText = userInput.value;
        console.log(`I am going to save ${userText} to Firestore.`);
        docSamples.set({
            hotDogStatus: userText
        }).then(function () {
            console.log('Status updated!');
        }).catch(function (error) {
            console.log('Error: ' + error);
        });
    });

    const getRealTimeUpdates = function () {

        docSamples.onSnapshot(function (doc) {

            if (doc && doc.exists) {

                let temp = doc.data();

                display.textContent = `Hotdog Status: ${temp.hotDogStatus}`;
            }
        });
    };

    getRealTimeUpdates();*/
};