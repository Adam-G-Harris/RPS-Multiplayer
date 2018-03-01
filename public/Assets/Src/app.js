window.onload = () => {

    // -------------------- Start Firebase configuration -------------------- //

    // Firebase keys & values
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

    // -------------------- End Firebase configuration -------------------- //

    // -------------------- Start user authentication -------------------- //

    // User inputs
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');

    // User authentication buttons
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    // User display name
    const displayName = document.getElementById('user-display-name'); // on sign up make a new document in the 'users' collection containing user name

    // User login event
    btnLogin.addEventListener('click', e => {

        // User email & password values
        const email = txtEmail.value;
        const password = txtPassword.value;

        // User login attempt
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(e => console.log(e.message));
    });

    // User sign up event
    btnSignUp.addEventListener('click', e => {

        // User email & password values
        const email = txtEmail.value;
        const password = txtPassword.value;

        // User sign up attempt
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (user) {

                user.metadata.name = 'Tom';
            })
            .catch(e => console.log(e.message));
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

            // Display user alias
            displayName.textContent = user.metadata.name; // make a document for each person

        } else {

            // Hide logout button
            btnLogout.style.display = 'none';

            // Display null user alias
            displayName.textContent = 'Not logged in';
        }
    });

    // -------------------- End user authentication -------------------- //

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