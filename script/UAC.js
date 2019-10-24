//var curl = "http://webinsight.cs.washington.edu/webeval/captchas/mslive/9/9.mp3";

var curl = null;
var real_curl = null;
function initializeUAC(mp3_url, answer_box) {
    curl = mp3_url;
    answer_box.onkeydown = uacKeyHandler;
}

// TODO: implement getCURL() to return the URL of the audio captcha (or
// an empty string if there is no audio captcha
function initializeUAC2(answer_box) {
    curl = null;
    answer_box.onkeydown = uacKeyHandler;
}

soundManager.onload = function() {
}

//{
//  soundManager.createSound({
//    id: 'captcha',
//    autoLoad: true,
//    url: curl,
//  });
//}
var currentCaptcha = 0;
var csound = null;
function playCAPTCHA() {
  currentCaptcha++;
  if(csound == null) {
    csound = soundManager.createSound({
      id: 'captcha' + currentCaptcha,
      url: real_curl,
      autoLoad: true,
      stream: true,
      autoPlay: true
    });
  } //else {
    soundManager.play('captcha' + currentCaptcha);
  //}
}

var lastpos = -1;

function uacKeyHandler(e) {
  if(curl == null) {
    var new_curl = getCURL();
    if(new_curl == null)
      return true; // not in Audio captcha mode
    else if(real_curl != null && new_curl != real_curl) {
      real_curl = new_curl; // the sound has changed
      playCAPTCHA();
      e.cancelBubble = true;
      if(e.stopPropagation) e.stopPropagation();
      return false;
    }
    else if(real_curl == null)
      real_curl = new_curl;
  }
  else
    real_curl = curl;

      


  var keynum = -1;
  if(!e) var e = window.event;

  if(window.event) {
    keynum = e.keyCode;
  } else if(e.which) {
    keynum = e.which;
  }

  var csound = soundManager.getSoundById('captcha' + currentCaptcha);
  var returnval = true;

  if(keynum == 190) {
    // The user typed a period
    if(typeof csound != 'undefined' && csound.playState == 1 && csound.position > 0) {
      csound.togglePause();
    } else {
      playCAPTCHA();
    }
    returnval = false;
    lastpos = -1;
  } else if(keynum == 191) {
    // Forward slash, so move forward
    soundManager.setPosition('captcha' + currentCaptcha, csound.position + 1000);
    returnval = false;
    lastpos = -1;
  } else if(keynum == 188) {
    // Backwards... they typed a comma
    var startpos = csound.position;
    if(startpos - lastpos < 1100) {
      startpos = lastpos;
    }

    if(csound) {
      // Go back...(!?)
      var newpos = startpos - 1000;
      if(newpos < 0) {
        newpos = 0;
      }

      if(csound.playState != 1 || csound.position <= 0) {
        newpos = csound.duration - 1000;
        csound.play();
        soundManager.setPosition('captcha' + currentCaptcha, newpos);
        csound.position = newpos;
        lastpos = newpos;
      } else {
        soundManager.setPosition('captcha' + currentCaptcha, newpos);
        csound.position = newpos;
        lastpos = newpos;
      }
    }
    returnval = false;
  }

  if(!returnval) {
    e.cancelBubble = true;
    if(e.stopPropagation) e.stopPropagation();
  }

  return returnval;
}