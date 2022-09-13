const functions = require("firebase-functions");


const admin = require("firebase-admin")

admin.initializeApp(functions.config().firebase)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.reveal = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const id = req.query.id
    // const ref = admin.database(app).ref('game/' + id)
    
    admin
    .database()
    .ref("game/" + id)
    .once("value", snapshot => {
        const event = snapshot.val()
        console.log(event)
        if (event.status === 'created') {
            const rand = String.fromCharCode(65 + Math.floor(Math.random() * 5))
            admin.database().ref('game/' + id + '/answer').set(rand, (err) => {
                if (err) res.json({status: 'error', err})
                else {
                    admin.database().ref('game/' + id + '/status').set("finished")
                    res.json({status: 'success'})
                }
            })
        }
        else if (event.status === "finished") res.json({status: 'error', message: 'unknown_state'})
        else res.json({status: 'error', message : "unknown error"})
        // res.json(event)
    })
    // Send back a message that we've successfully written the message
})