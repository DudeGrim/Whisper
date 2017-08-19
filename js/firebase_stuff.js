function upload_audio(audio_blob, firebase_inst){
  console.log('here at upload_audio function!');
  // Create a root reference
  var storageRef = firebase_inst.storage().ref();

    ref.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
  });
}
