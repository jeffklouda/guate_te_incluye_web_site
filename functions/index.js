const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.getJobs = functions.https.onRequest((request, response) => {
    const path = request.path.split('/');
	
	//var storage = firebase.storage();
    return admin.database().ref('Data/Jobs/').once('value', (snapshot) => {
        var jobs = snapshot.val();
        var html = "";
        html += "<!DOCTYPE html>"
        html += "<html>";
        html += "<head>";
        html += "<title>Job Page</title>";
        html += "</head>";
        html += "<body>";
        html += "<h1>Job Page</h1>";
        html += `${jobs.job1.address}`;
        html += "</body>";
        html += "</html>";
        response.send(html);
    });
});
