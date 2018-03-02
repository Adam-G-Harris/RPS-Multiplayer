window.onload = () => {

    // -------------------- Start Firebase configuration -------------------- //

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
    const displayName = document.getElementById('user-display-name');

    // Container for users
    let currentUser = null;

    // User login event
    btnLogin.addEventListener('click', e => {

        const email = txtEmail.value;
        const password = txtPassword.value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(e => console.log(e.message));
    });

    // User sign up event
    btnSignUp.addEventListener('click', e => {

        const email = txtEmail.value;
        const password = txtPassword.value;

        // User sign up attempt
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (user) {

                const name = prompt('What is your name?');

                return setup(user, name);
            })
            .catch(e => console.log(e.message));
    });

    // User logout event
    btnLogout.addEventListener('click', e => {

        firebase.auth().signOut();
    });

    // Real time authentication state listener
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {

            currentUser = user;

            btnLogout.style.display = 'block';

            // Querying user data
            setName(displayName);

        } else {

            currentUser = null;

            btnLogout.style.display = 'none';

            displayName.textContent = 'Not logged in';
        }
    });

    // -------------------- End user authentication -------------------- //

    // -------------------- Start data update method -------------------- //

    // Player name displays
    const player1Name = document.getElementById('player-1-name');
    const player2Name = document.getElementById('player-2-name');

    // Player info displays
    const slotDisplayInfo = document.getElementById('results-display-container');
    const slotOneInfo = document.getElementById('player-1-info');
    const slotTwoInfo = document.getElementById('player-2-info');

    // Firestore collection & document references
    const slotDisplay = firestore.doc('slots/display');
    const colUsers = firestore.collection('users');
    const colSlots = firestore.collection('slots');
    const slot1 = firestore.doc('slots/slot1');
    const slot2 = firestore.doc('slots/slot2');

    // Default slot displays
    function defaultSlots() {

        slot1.set({
            name: 'Player 1',
            main: 'Waiting on player to join slot 1...'
        });

        slot2.set({
            name: 'Player 2',
            main: 'Waiting on player to join slot 2...'
        });

        slotDisplay.set({
            main: `<button id='btn-join' class='btn-join'>Join Lobby</button>
            <div>Game will start when two players have joined.</div>`
        });
    }

    // Auto updates slot displays
    function updateSlots() {

        slot1.onSnapshot(function (doc) {

            if (doc && doc.exists) {

                const temp = doc.data();

                player1Name.innerHTML = temp.name;

                slotOneInfo.innerHTML = temp.main;
            }
        });

        slot2.onSnapshot(function (doc) {

            if (doc && doc.exists) {

                const temp = doc.data();

                player2Name.innerHTML = temp.name;

                slotTwoInfo.innerHTML = temp.main;
            }
        });

        slotDisplay.onSnapshot(function (doc) {

            if (doc && doc.exists) {

                const temp = doc.data();

                slotDisplayInfo.innerHTML = temp.main;
            }
        });
    };

    // -------------------- End data update method -------------------- //

    // -------------------- Start data field -------------------- //

    slotDisplayInfo.addEventListener('click', joinHandler);

    // Setting slot states to empty
    let slot1Filled = false;
    let slot2Filled = false;

    // Join lobby handler
    function joinHandler(e) {

        if (!e.target.classList.contains('btn-join')) {

            return;
        }

        if (currentUser === null) {

            return;
        }

        if (slot1Filled === false) {

            addPlayer(slot1);

        } else if (slot2Filled === false) {

            addPlayer(slot2);

            setDisplay();

        } else {

            alert('Sorry it looks like both spots are filled for now, try again in a few minutes!');

            return;
        }

        return;
    }

    // -------------------- End data field -------------------- //

    // -------------------- Start helper functions -------------------- //

    function addPlayer(addTo) {

        addTo === slot1 ? slot1Filled = true : slot2Filled = true;

        let temp = colUsers.where('id', '==', currentUser.uid).name;

        console.log(temp);

        addTo.set({
            main: 'null',
            name: '',
            player: 'currentUser'
        });
    }

    function removePlayer(removeFrom) {

    }

    // Counter
    let num = 1;

    // Info display reset
    function setDisplay() {

        if (num % 2 === 0) {

            slotDisplay.set({
                main: `Player 2's turn`
            });

        } else {

            slotDisplay.set({
                main: `Player 1's turn`
            });
        }

        num += 1;
    }

    // Finds current user's name
    function setName(spot) {

        firestore.collection('users').get().then(function (userDocs) {

            userDocs.forEach(function (doc) {

                if (doc.data().id === currentUser.uid) {

                    spot.innerHTML = doc.data().name;
                }
            });
        });
    }

    // User specific object
    function setup(user, name) {

        colUsers.add({
            name: name,
            id: user.uid,
            wins: 0,
            losses: 0
        });
    }

    // -------------------- End helper functions -------------------- //

    // -------------------- Start init function -------------------- //

    function init() {

        // Sets slot data to default
        defaultSlots();

        // Snapshot listeners on all slots
        updateSlots();
    }

    // First call on window load
    init();

    // -------------------- End init function -------------------- //
};