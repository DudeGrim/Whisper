/* Handles all the evensts and the backend. */

// Events
function record_audio (event) {
  console.log("AAAAAAAAAAAAaaaaand we are live!");
  remove_options();
  countdown(recording_text);
}
// cancel recording
function cancel_audio (event) {
  console.log("no recording for you!");
  canceled_lantern();
  remove_options();
  enable_button();
}
function replay_audio (event) {
  console.log("replaying audio");
  var blobUrl = sessionStorage.getItem("blobUrl");
  var a = new Audio(blobUrl);
  a.play();
}
// cancel recording
function let_go_lantern (event) {
  console.log("Letting go!");
  var blobUrl = sessionStorage.getItem("blobUrl");
  fetch(blobUrl)
    .then(res => res.blob())
    .then(blob => {
      upload_audio(blob);
  });
  fly_lantern();
  remove_options();
  enable_button();
}

function done_listening(){
  fly_lantern();
  // remove lantern and text from scene
  remove_text();
  enable_button();
}
// listen to audioRe
function listen_to_new_whisper(){
  // lantern emerges from the sky
  fly_down_lantern();
  // trigger request to database
  listen_whisper(done_listening);
}
// end of events
function disable_button(button_id1, button_id2){
  var button_el = document.getElementById("startRecord_button");
  button_el.setAttribute('visible', 'false');
  // var text_el = document.getElementById("whisper_text");
  // text_el.setAttribute('visible', 'false');
  var button_el2 = document.getElementById("listen_button");
  button_el2.setAttribute('visible', 'false');
  // var text_el2 = document.getElementById("listen_text");
  // text_el2.setAttribute('visible', 'false');
}
function enable_button(button_id, button_id2){
  var button_el = document.getElementById("startRecord_button");
  button_el.setAttribute('visible', 'true');
  // var text_el = document.getElementById("whisper_text");
  // text_el.setAttribute('visible', 'true');
  var button_el2 = document.getElementById("listen_button");
  button_el2.setAttribute('visible', 'true');
  // var text_el2 = document.getElementById("listen_text");
  // text_el2.setAttribute('visible', 'true');
}

function disable_options(){
  var first_button = document.getElementById('first_button');
  first_button.setAttribute('visible', 'false');
  var second_button = document.getElementById('second_button');
  second_button.setAttribute('visible', 'false');
    try {
      var third_button = document.getElementById('third_button');
      third_button.setAttribute('visible', 'false');
    }
    catch(err) {
        console.log("no 3rd button");
    }
}
function enable_options(){
  var first_button = document.getElementById('first_button');
	first_button.setAttribute('visible', 'true');
	var second_button = document.getElementById('second_button');
	second_button.setAttribute('visible', 'true');
    try {
      var third_button = document.getElementById('third_button');
      third_button.setAttribute('visible', 'true');
    }
    catch(err) {
        console.log("no 3rd button");
    }
}
function remove_options(){
	var first_button = document.getElementById('first_button');
	first_button.parentNode.removeChild(first_button);
	var second_button = document.getElementById('second_button');
	second_button.parentNode.removeChild(second_button);
    try {
      var third_button = document.getElementById('third_button');
      third_button.parentNode.removeChild(third_button)
    }
    catch(err) {
        console.log("no 3rd button");
    }
}
// lantern related stuff
function pop_out_lantern(){
  var scene = document.querySelector('a-scene');
  var lantern = document.createElement('a-entity');
  lantern.setAttribute('id', 'bobby_lantern');
  // lantern.setAttribute('gltf-model-next', '#lantern-gltf');
  lantern.setAttribute('gltf-model-custom', '#lantern-gltf');
  lantern.setAttribute('mixin', "lantern gas-lantern");

  var first_animation =  document.createElement('a-animation');
  first_animation.setAttribute('id', 'pop');
  first_animation.setAttribute('attribute', 'position');
  first_animation.setAttribute('from', "0 0 -3")
  first_animation.setAttribute('to', "0 3.5 -3") ;
  first_animation.setAttribute('dur', '4000');

  var second_animation =  document.createElement('a-animation');
  second_animation.setAttribute('id', 'bob');
  second_animation.setAttribute('attribute', 'position');
  second_animation.setAttribute('begin', 'animationend');
  second_animation.setAttribute('dur', "2000");
  second_animation.setAttribute('from', "0 3.5 -3")
  second_animation.setAttribute('to', "0 3.0 -3") ;
  second_animation.setAttribute('easing', 'ease-in-out-quad');
  second_animation.setAttribute('dur', '2000');
  second_animation.setAttribute('repeat', 'indefinite');
  second_animation.setAttribute('direction', 'alternate');

  lantern.appendChild(first_animation);
  lantern.appendChild(second_animation);
  scene.appendChild(lantern);
}
function fly_down_lantern(){
  var scene = document.querySelector('a-scene');
  var lantern = document.createElement('a-entity');
  lantern.setAttribute('id', 'bobby_lantern');
  lantern.setAttribute('gltf-model-custom', '#lantern-gltf');
  // lantern.setAttribute('gltf-model-next', '#lantern-gltf');
  lantern.setAttribute('mixin', "lantern gas-lantern");

  var first_animation =  document.createElement('a-animation');
  first_animation.setAttribute('id', 'pop');
  first_animation.setAttribute('attribute', 'position');
  first_animation.setAttribute('from', "0 6 -3")
  first_animation.setAttribute('to', "0 3.5 -3") ;
  first_animation.setAttribute('dur', '4000');

  var second_animation =  document.createElement('a-animation');
  second_animation.setAttribute('id', 'bob');
  second_animation.setAttribute('attribute', 'position');
  second_animation.setAttribute('begin', 'animationend');
  second_animation.setAttribute('dur', "2000");
  second_animation.setAttribute('from', "0 3.5 -3")
  second_animation.setAttribute('to', "0 3.0 -3") ;
  second_animation.setAttribute('easing', 'ease-in-out-quad');
  second_animation.setAttribute('dur', '2000');
  second_animation.setAttribute('repeat', 'indefinite');
  second_animation.setAttribute('direction', 'alternate');

  lantern.appendChild(first_animation);
  lantern.appendChild(second_animation);
  scene.appendChild(lantern);
}
function fly_lantern(){
  var lantern = document.getElementById("bobby_lantern");
  var first_animation =  document.createElement('a-animation');
  first_animation.setAttribute('id', 'fly');
  first_animation.setAttribute('attribute', 'position');
  first_animation.setAttribute('begin', '0');
  first_animation.setAttribute('from', "0 3.5 -3")
  first_animation.setAttribute('to', "0 20 -3") ;
  first_animation.setAttribute('dur', '5000');
  lantern.appendChild(first_animation);
  var remove_lantern = setInterval(function(){
    lantern.parentNode.removeChild(lantern);
    clearInterval(remove_lantern);
  },5000);
}
function canceled_lantern(){
  var lantern = document.getElementById("bobby_lantern");
  lantern.parentNode.removeChild(lantern);
}
function first_step(){
  // lantern emerges from the ocean
  pop_out_lantern();
  var timeleft = 3;
    var first_step_options = setInterval(function(){
    timeleft--;
    if(timeleft <= 0){
        clearInterval(first_step_options);
        // add options once lantern have settled in
        add_buttons("Record", record_audio, "Cancel", cancel_audio);
      }
    },1000);
}
function second_step(){
  add_buttons("Replay", replay_audio, "Let Go", let_go_lantern);
  third_button("Cancel", cancel_audio);
}


// user first hits record button
function add_buttons(first_text, first_event, second_text, second_event){
    // add 2 buttons
    var scene = document.querySelector('a-scene');

    var first_button = document.createElement('a-plane');
  	first_button.setAttribute('id', "first_button");
  	first_button.setAttribute('position', "-0.5 2.3 -0.5");
    first_button.setAttribute('width', "0.8");
    first_button.setAttribute('height', "0.3");
    first_button.setAttribute('color', "#FFF");
    first_button.setAttribute('opacity', "0.3");
    first_button.setAttribute('text', "baseline: center; align:center; width: 3; lineHeight: 55;  letterSpacing: 2 ; color: black; value:"+ first_text);
    first_button.addEventListener('click', first_event);

    var second_button = document.createElement('a-plane');
  	second_button.setAttribute('id', "second_button");
  	second_button.setAttribute('position', "0.5 2.3 -0.5");
    second_button.setAttribute('width', "0.8");
    second_button.setAttribute('height', "0.3");
    second_button.setAttribute('color', "#FFF");
    second_button.setAttribute('opacity', "0.3");
    second_button.setAttribute('text', "baseline: center; align:center; width: 3; lineHeight: 55;  letterSpacing: 2 ; color: black; value:"+ second_text);
    second_button.addEventListener('click', second_event);

  	scene.appendChild(first_button);
    scene.appendChild(second_button);
}
function third_button(first_text, first_event){
    var scene = document.querySelector('a-scene');
    var third_button = document.createElement('a-plane');
    third_button.setAttribute('id', "third_button");
    third_button.setAttribute('position', "0 1.9 -0.5");
    third_button.setAttribute('width', "0.8");
    third_button.setAttribute('height', "0.3");
    third_button.setAttribute('color', "#FFF");
    third_button.setAttribute('opacity', "0.3");
    third_button.setAttribute('text', "baseline: center; align:center; width: 3; lineHeight: 55;  letterSpacing: 2 ; color: black; value:"+ first_text);
    third_button.addEventListener('click', first_event);

    scene.appendChild(third_button);
}

function countdown(callback){
  var scene = document.querySelector('a-scene');
  var progress_body = document.createElement('a-text');
  progress_body.setAttribute('id', "countdown_text");
  progress_body.setAttribute('position', "-0.85 2.5 -1.3");
  progress_body.setAttribute('wrap-count', "50");
  progress_body.setAttribute('color', "#FFF");
  progress_body.setAttribute('value', "Recording in: 3");

  scene.appendChild(progress_body);

  var timeleft = 4;
    var downloadTimer = setInterval(function(){
    timeleft--;
    progress_body.setAttribute('visible', 'false');
    progress_body.setAttribute('value', "Recording in: " + timeleft);
    progress_body.setAttribute('visible', 'true');
    if(timeleft <= 1){
        clearInterval(downloadTimer);
        callback();
      }
    },1000);
}
function recording_text(){

  start_recording();

  var scene = document.querySelector('a-scene');
  var progress_body = document.getElementById('countdown_text');
  progress_body.setAttribute('position', "-1 2.5 -1.3");
  progress_body.setAttribute('value', "Recording Time Left: 8");

  var timeleft = 8;
    var downloadTimer = setInterval(function(){
    timeleft--;
    progress_body.setAttribute('visible', 'false');
    progress_body.setAttribute('value', "Recording Time Left: "+timeleft);
    progress_body.setAttribute('visible', 'true');
    if(timeleft <= 0){
        progress_body.setAttribute('visible', 'false');
        progress_body.setAttribute('value', "Recording Done");
        progress_body.setAttribute('wrap-count', "50");
        progress_body.setAttribute('visible', 'true');
        clearInterval(downloadTimer);
        delete_countdown_text();
      }
    },1000);
}
function delete_countdown_text(){
    // Deletes the text counter
    var deleteText = setInterval(function(){
      var progress_body = document.getElementById('countdown_text');
      progress_body.parentNode.removeChild(progress_body);
      clearInterval(deleteText);
      second_step();
    },1000);
}
