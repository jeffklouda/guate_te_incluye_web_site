const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.getJobs = functions.https.onRequest((request, response) => {
    const path = request.path.split('/');
    var html = "";
    html += "<!DOCTYPE html>"
    html += "<html>";
    html += "<head>";
    html += "<title>Job Page</title>";
    html += "</head>";
    html += "<body>";
    html += "<h1>Job Page</h1>";
	//var storage = firebase.storage();
    return admin.database().ref('Data/Jobs/').once('value').then((snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            var job_id = childSnapshot.key;
            var job_info = childSnapshot.val();
            html += `<p>${job_id}</p>`;
            html += `<p>${job_info.address}</p>`;
            html += `<p>${job_info.company}</p>`;
            html += `<p>${job_info.title}</p>`;
        });
        html += "</body>";
        html += "</html>";
        response.send(html);
    });
});
