let config = {
    apiKey: "AIzaSyB-i_H3NI98S3d-Fp6n0_CvlCI3-NMLlEk",
    authDomain: "rps-multiplayer-51545.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-51545.firebaseio.com",
    projectId: "rps-multiplayer-51545",
    storageBucket: "rps-multiplayer-51545.appspot.com",
    messagingSenderId: "491831187604"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();

const docSamples = firestore.doc('samples/sandwichData');
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