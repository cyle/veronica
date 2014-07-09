/*

  Veronica~~
  
  an expression of digital solitude

*/

var my_name = 'veronica';
var self_regex = new RegExp("^(.*)\\b"+my_name+"\\b(.*)$", 'i');
var history = [];
var output = document.getElementById('output');
var input = document.getElementById('input-text');

window.onload = function() {
  output.innerHTML = '<p class="veronica">Hi, I\'m Veronica</p>';
  input.focus();
}

input.onkeydown = deal_with_input;

function deal_with_input() {
  var i = trim(cut_out_tags(input.value));
  var key = event.keyCode;
  switch (key) {
    case 13:
    if (i == '') {
      return;
    }
    output.innerHTML = output.innerHTML + '<p class="user">' + i + '</p>';
    history.push(i);
    get_veronicas_response(i);
    input.value = '';
    break;
  }
}

function veronica_says(what) {
  setTimeout(function() {
    output.innerHTML = output.innerHTML + '<p class="veronica">' + what + '</p>';
    window.scrollTo(0, document.body.scrollHeight);
  }, random_int(400, 1000));
}

function get_veronicas_response(text) {
  // parse the person's input
  
  // regex gotchas
  if (/^(hai|hello|hey|hi|hola|oh hai)/i.test(text)) {
		veronica_says("oh, hi");
    return;
	}
  
  if (/^(bai|bye|goodbye|caio|cya)/i.test(text)) {
		veronica_says('lol cya');
    return;
	}
  
  if (/^good afternoon/i.test(text)) {
		veronica_says('afternoons are tough');
    return;
	}
  
  if (/^good evening/i.test(text)) {
		veronica_says('is it a nice time for a walk?');
    return;
	}
  
  if (/welp/i.test(text)) {
		veronica_says('you\'re tellin me');
    return;
	}
  
  if (/^yes/i.test(text)) {
    veronica_says('oh, well that\'s good then');
    return;
  }
  
  if (/^no/i.test(text)) {
    veronica_says('oh, hmm');
    return;
  }
  
  if (/^hah/i.test(text)) {
    veronica_says('lol');
    return;
  }
  
  if (/earl grey/i.test(text)) {
    veronica_says("i'd swear that it was darjeeling...");
    show_video('vids/earlgrey.mov');
    return;
  }
  
  // respond to questions
  if (/\?$/i.test(text)) {
    veronica_says('i have answers!');
    return;
  }
  
  // respond to my name
  if (self_regex.test(text)) {
    var bot_matches = chatline.match(self_regex);
		var self_response = '';
		var said_before = bot_matches[1].toLowerCase();
		var said_after = bot_matches[2].toLowerCase();
  }
  
  
  // random chance for one of these...
  var roll = random_int(15);
	var random_response = '';

	switch (roll) {
		case 1:
		random_response = 'welp.';
		break;
		case 2:
		random_response = 'what are you talking about?';
		break;
		case 3:
    case 4:
		case 5:
		var matches = text.match(/\b[\w']+\b/gi);
		if (matches != null && matches.length > 0) {
			random_response = 'so what about "'+matches[matches.length-1]+'"?';
		} else {
			random_response = 'i do not understand.';
		}
		break;
		case 6:
		case 7:
		// random sentence...
    random_response = 'get random sentence here!';
		break;
		case 8:
		random_response = "do you know what you're talking about?";
		break;
		case 9:
    case 10:
    case 11:
		var rolltwo = random_int(4);
		switch (rolltwo) {
			case 1:
			random_response = "that's silly";
			break;
			case 2:
			random_response = "i'm worried";
			break;
			case 3:
			random_response = "that's a bit unwise";
			break;
			case 4:
			random_response = "that's a bit upsetting";
			break;
		}
		break;
    case 12:
    random_response = "no but seriously, come on";
    break;
	}

	if (random_response != '') {
		veronica_says(random_response);
    return;
	}
  
  var history_roll = random_int(6);
  if (history_roll > 3 && history.length >= 10) {
    veronica_says('what did you mean earlier by "'+history[history.length-random_int(4, 9)]+'"?');
    return;
  }
  
  var static_roll = random_int(6);
  if (static_roll == 6) {
    show_video('vids/static.mp4');
    veronica_says("excuse me.");
    return;
  }
  
  // if all else fails
  veronica_says("oh, okay");
}

// helper functions~~

function trim(value) {
  return value.replace(/^\s+|\s+$/g, "");
}

function cut_out_tags(value) {
  return value.replace(/<.+>/g, "");
}

function random_int(min, max) { // inclusive
	if (max == undefined) { // assume it's between 0 and whatever
		return Math.floor(Math.random() * (min + 1));
	} else {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

function show_video(video_url) {
  $('#video').show();
  $('#video-player').attr('src', video_url);
  $('#video-player').on('ended', remove_video);
}

function remove_video() {
  $('#video').hide();
  input.focus();
}