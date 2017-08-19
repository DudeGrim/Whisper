navigator.mediaDevices.getUserMedia({audio:true})
	.then(stream => {
		rec = new MediaRecorder(stream);
		rec.ondataavailable = e => {
			audioChunks.push(e.data);
			if (rec.state == "inactive"){
        var blob = new Blob(audioChunks,{type:'audio/x-mpeg-3'});
				var blobUrl = URL.createObjectURL(blob);
				console.log("done recording");
				sessionStorage.setItem("blobUrl", blobUrl);
     }
		}
	})
	.catch(e=>console.log(e));

function upload_audio(audio_blob){
	console.log('here at upload_audio function!');
	console.log(audio_blob);
	// Get a reference to the database service
	var databaseRef = firebase.database().ref();
	databaseRef.once('value').then(function(snapshot) {
  var new_whisper_count = parseInt(snapshot.child("whisper_count").val()) + 1;
			// updates whisper count in the database
			databaseRef.set({
				whisper_count: new_whisper_count
				});
				// saves audio to storage
				var storageRef = firebase.storage().ref();
				var audioRef = storageRef.child('whispers/' + new_whisper_count + '.mp3');
				// Create file metadata including the location of the user
				var city = sessionStorage.getItem("city");
				var country = sessionStorage.getItem("country");
				var metadata = {
					customMetadata:{
						'city': city,
						'country': country,
						'listened':0
					}
				};
				audioRef.put(audio_blob, metadata).then(function(snapshot) {
					console.log('Uploaded whisper');
				});
	});
}
function add_text_to_scene(listened){
	var scene = document.querySelector('a-scene');

	var city = sessionStorage.getItem("city");
	var country = sessionStorage.getItem("country");

	var location_text = document.createElement('a-entity');
	location_text.setAttribute('id', "location_text");
	location_text.setAttribute('position', "0 2.35 -3");
	location_text.setAttribute('text', 'width: 3; lineHeight: 55;  letterSpacing: 2 ; align: center; color: white; value:' + city +', '+country);

	var listened_text = document.createElement('a-entity');
	listened_text.setAttribute('id', "listened_count");
	listened_text.setAttribute('position', "0 2.2 -3");
	listened_text.setAttribute('text', 'width: 3; lineHeight: 55;  letterSpacing: 2 ; align: center; color: white; value:' + listened + ' Listened');

	scene.appendChild(location_text);
	scene.appendChild(listened_text);
}
function remove_text(){
	var loc_text = document.getElementById('location_text');
	loc_text.parentNode.removeChild(loc_text);
	var lis_text = document.getElementById('listened_count');
	lis_text.parentNode.removeChild(lis_text);
}
function listen_whisper(callback){
	var databaseRef = firebase.database().ref();
	databaseRef.once('value').then(function(snapshot) {
		// get total whisper count
	  var total_whisper_count = parseInt(snapshot.child("whisper_count").val());
		// get random number from 1 to total_whisper_count
		var audio_filename = Math.floor(Math.random() * total_whisper_count) + 1;
		// initalize connection the storage
		var storageRef = firebase.storage().ref();
		// Create a reference to the file we want to download
		var starsRef = storageRef.child('whispers/'+ audio_filename+'.mp3');

		// Get metadata properties
		starsRef.getMetadata().then(function(metadata) {
			total_listened = parseInt(metadata.customMetadata.listened) + 1;
			// increment total_listened by 1
			var newMetadata = {
				customMetadata:{
					'listened': total_listened
				}
			};
			// Update metadata properties
			starsRef.updateMetadata(newMetadata).then(function(metadata) {
				// Get the download URL
				starsRef.getDownloadURL().then(function(whisper_url) {
					// add text to scene
					add_text_to_scene(total_listened);
					// play audio
					var a = new Audio(whisper_url);
					a.play();
					a.addEventListener("ended", function(){
							 var audioEnded = setInterval(function(){
					       clearInterval(audioEnded);
					       callback();
							},2000);
					});


				}).catch(function(error) {
						console.log("error in retrieving audio from the database :/");
				});
			}).catch(function(error) {
				console.log("error in updating metadata :/");
			});

		}).catch(function(error) {
		  console.log("error in retrieving metadata :/");
		});
	});
}
function start_recording() {
	audioChunks = [];
	rec.start();
	setTimeout(stop_recording, 8000);
}
function stop_recording() {
	rec.stop();
}
