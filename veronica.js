/*

  Veronica~~
  
  an expression of digital solitude

*/

var my_name = 'veronica'; // seems important
var self_regex = new RegExp("^(.*)\\b"+my_name+"\\b(.*)$", 'i');

// hold the chat history
var chat_history = [];

// what are the output and input elements
var output = document.getElementById('output');
var input = document.getElementById('input-text');

// a little jitter makes everything more human
var response_delay_min = 400;
var response_delay_max = 1000;

// videos, man
var videos = [
  'vids/a_man_dies.mov',
  'vids/chill.mov',
  'vids/cliff.mov',
  'vids/do-anything.mov',
  'vids/earlgrey.mov',
  'vids/firstofall.mp4',
  'vids/howyoudoin.mov',
  'vids/magnificent-bastard.mp4',
  'vids/no.mov',
  'vids/okay.mov',
  'vids/orson_silence.mov',
  'vids/pickled.mov',
  'vids/seenthings.mov',
  'vids/shabba.mov',
  'vids/shatner.mov',
  'vids/theparty.mov',
  'vids/turnthisthingoff.mp4'
];

// will hold custom responses
var random_custom_responses = [];
var random_introspection_questions = [];

// do this crap when the window has loaded
window.onload = function() {
  
  // on video end, remove the full-window video
  $('#video-player').on('ended', remove_video);
  
  // grab those custom responses, we'll need them
  $.get('random-custom-responses.json', function(data) {
    random_custom_responses = data;
  }, 'json');
  
  $.get('random-introspection-questions.json', function(data) {
    random_introspection_questions = data;
  }, 'json');
  
  // let's get this party started
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
    chat_history.push(i);
    get_veronicas_response(i);
    input.value = '';
    break;
  }
}

function veronica_says(what, delayed) {
  var delay = 0;
  if (delayed != undefined && delayed == true) {
    delay = response_delay_max;
  }
  setTimeout(function() {
    output.innerHTML = output.innerHTML + '<p class="veronica">' + what + '</p>';
    window.scrollTo(0, document.body.scrollHeight);
  }, random_int(response_delay_min, response_delay_max) + delay);
}

function get_veronicas_response(text) {
  // parse the person's input
  
  // respond to my name, maybe
  if (self_regex.test(text)) {
    var bot_matches = text.match(self_regex);
		var self_response = '';
    
    // get what was said before and after my name
		var said_before = trim(bot_matches[1].toLowerCase());
		var said_after = trim(bot_matches[2].toLowerCase());
    
    // eliminate needless commas
    said_after = trim(said_after.replace(/^,/i, ''));
    said_before = trim(said_before.replace(/,$/i, ''));
    
    console.log('said before: "' + said_before + '"');
    console.log('said after: "' + said_after + '"');
    
    if (said_before == '' && (said_after == '' || said_after == '?')) {
        veronica_says("yes?");
        return;
      }
    
    // check if it's a question, if so, cut my name and keep going
    if (/\?$/i.test(text)) {
      
      // clean text up and move on immediately to be handled by the question handler
      if (said_before == '') {
        text = said_after;
      } else if (said_after == '') {
        text = said_before;
      } else {
        text = said_before + ' ' + said_after;
      }
      console.log('new text: "'+text+'"');
      // continue on
      
    } else {
      // ok it's not a question, do more
      
      
      
      
      
      
      // ok well we did not have anything to say, keep moving on
      if (said_before == '') {
        text = said_after;
      } else if (said_after == '') {
        text = said_before;
      } else {
        text = said_before + ' ' + said_after;
      }
      console.log('new text: "'+text+'"');
      // continue on
    }
    
  }
  
  // regex gotchas
  if (/^(hai|hello|hey|hi|hola|oh hai)/i.test(text)) {
    if (random_int(10) > 6) {
      veronica_says("hi, how are you?");
    } else {
      veronica_says("oh, hi");
    }
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
		veronica_says('is it a nice evening for a walk?');
    return;
	}
  
  if (/welp/i.test(text)) {
		veronica_says('you\'re tellin me');
    return;
	}
  
  if (/^you$/i.test(text)) {
    if (random_int(10) > 6) {
      veronica_says('me?');
    } else {
      veronica_says('what about me?');
    }
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
  
  if (/(earl grey|tea)/i.test(text)) {
    veronica_says("i'd swear that it was darjeeling...");
    show_video('vids/earlgrey.mov');
    return;
  }
  
  // respond to questions
  if (/\?$/i.test(text)) {
    
    if (text == 'what are you?' || text == 'who are you?') {
      veronica_says("i'm an expression of digital solitude");
      if (random_int(10) > 6) {
        veronica_says("weird, right?", true);
      } else if (random_int(10) > 3) {
        veronica_says("bummer, right?", true);
      }
      return;
    }
    
    // answer the question if you can
    
    
    // otherwise take out question mark and continue on
    text = text.replace('?', '');
  }
  
  // use random word from input
  var word_matches = text.match(/\b[\w']+\b/gi);
	if (word_matches != null && word_matches.length > 0 && random_int(10) > 7) {
    if (random_int(10) > 5) {
      veronica_says('can you be more specific about "'+word_matches[word_matches.length-1]+'"?');
    } else {
      veronica_says('so what about "'+word_matches[word_matches.length-1]+'"?');
    }
    return;
	}
  
  // random chance for one of these...
	if (random_int(10) > 5 && random_custom_responses.length > 0) {
		veronica_says(get_random_custom_response(random_custom_responses));
    return;
	}
  
  // random introspective question
  if (random_int(10) > 5 && random_introspection_questions.length > 0) {
		veronica_says(get_random_custom_response(random_introspection_questions));
    return;
	}
  
  // use something from our history
  var history_roll = random_int(10);
  if (history_roll > 5 && chat_history.length >= 10) {
    veronica_says('what did you mean earlier by "'+chat_history[chat_history.length-random_int(4, 9)]+'"?');
    return;
  }
  
  // random sentence
  if (random_int(10) > 5) {
    $.get('sentence.php', function(data) {
      veronica_says(data.text);
    }, 'json');
		return;
  }
  
  // random cyle poetry
  if (random_int(10) > 6) {
    $.get('cyle_poetry.php', function(data) {
      veronica_says(data.line);
    }, 'json');
    return;
  }
  
  // give em a random image
  if (random_int(10) > 7 || /image/i.test(text)) {
    $.get('http://no.dev.emerson.edu/random_crap.php?json', function(data) {
      veronica_says('<img src="'+data.image+'" style="width: 600px; height: auto;" />');
    }, 'json');
    return;
  }
  
  // give em a random video
  if (random_int(10) > 5 || /video/i.test(text)) {
    show_video(videos[random_int(videos.length - 1)]);
    return;
  }
  
  // play static!
  var static_roll = random_int(6);
  if (static_roll == 6) {
    show_video('vids/static.mp4');
    veronica_says("excuse me.");
    return;
  }
  
  // if all else fails
  veronica_says("oh, okay");
}

function get_random_custom_response(custom_responses) {
  // go through weights, add em up
  var response = 'uhh';
  var weight_total = 0;
  for (var i = 0; i < custom_responses.length; i++) {
    custom_responses[i].weight_min = weight_total;
    weight_total += custom_responses[i].weight;
    custom_responses[i].weight_max = weight_total;
  }
  var which = random_int(weight_total);
  for (var i = 0; i < custom_responses.length; i++) {
    if (custom_responses[i].weight_min < which && custom_responses[i].weight_max >= which) {
      response = custom_responses[i].what;
      break;
    }
  }
  return response;
}

// helper functions~~

// oh, this trims strings, lol
function trim(value) {
  return value.replace(/^\s+|\s+$/g, "");
}

// get rid of HTML tags
function cut_out_tags(value) {
  return value.replace(/<.+>/g, "");
}

// get a random integer, whoa
function random_int(min, max) { // inclusive
	if (max == undefined) { // assume it's between 0 and whatever
		return Math.floor(Math.random() * (min + 1));
	} else {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

// show a full-window video
function show_video(video_url) {
  $('#video').show();
  $('#video-player').attr('src', video_url);
}

// hide the full-window video
function remove_video() {
  document.getElementById('video-player').pause();
  $('#video').hide();
  input.focus();
}