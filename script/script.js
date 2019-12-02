var code;

function createCaptcha() {
  //clear the contents of captcha div first 
  document.getElementById('captcha').innerHTML = "";
  var charsArray =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
  var lengthOtp = 6;
  var captcha = [];
  for (var i = 0; i < lengthOtp; i++) {
    //below code will not allow Repetition of Characters
    var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
    if (captcha.indexOf(charsArray[index]) == -1)
      captcha.push(charsArray[index]);
    else i--;
  }
  var canv = document.createElement("canvas");
  canv.id = "captcha";
  canv.width = 100;
  canv.height = 50;
  var ctx = canv.getContext("2d");
  ctx.font = "25px Georgia";
  ctx.strokeText(captcha.join(""), 0, 30);
  //storing captcha so that can validate you can save it somewhere else according to your specific requirements
  code = captcha.join("");
  document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}

var validCaptcha = false;

function validateCaptcha() {
  event.preventDefault();
  debugger
  if (document.getElementById("captchaTextBox").value == code) {
    validCaptcha = true;
    var element = document.getElementById("form_captcha");
    element.parentNode.removeChild(element);
  } else {
    alert("Invalid Captcha. try Again");
  }
}


// tablink

function openContent(obj, idContentContainer) {
  var i, x, tablinks;

  x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(idContentContainer).style.display = "block";
  obj.className += " active";
}

function activate(idContent) {
  document.getElementsByClassName(idContent)[0].className += " active";
}

function showCont(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-hide") == -1) {
    x.className += " w3-hide";
  } else {
    x.className = x.className.replace(" w3-hide", "");
  }
}

function showDropdown(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

//login
function login() {
  if (validateLogin() == true) {
    var username = document.getElementById('uname').value;
    var p = document.getElementById('sudahLogin');
    var element = document.getElementById('login_tab');
    element.parentNode.removeChild(element);
    var node = document.createElement("p");
    node.setAttribute('id', "profil");
    var textnode = document.createTextNode("Hello, " + username);
    node.appendChild(textnode);
    document.getElementById("sudahlogin").appendChild(node);
    document.getElementById("btnsettings").style.visibility = "visible";
  } else {
    alert("Please enter a valid login information");
    document.getElementById("btnsettings").style.display = "none";
  }
}

function validateLogin() {
  var username = document.getElementById('uname').value;
  var password = document.getElementById('pwd').value;
  if (username != "" && password != "") {
    document.getElementById("berhasilLogin").setAttribute("data-dismiss", "modal");
    return true;
  }
  return false;
}

//register
function verifyRegister() {
  var username = document.getElementById("userRegister").value;
  var email = document.getElementById("emailRegister").value;
  var password = document.getElementById("passRegister").value;
  var verifyPass = document.getElementById("verifyPass").value;
  if (username == "" && email == "" && password == "" && verifyPass == "" && validCaptcha == false) {
    alert("Please register yourself");
  } else if (username == "") {
    alert("Please enter your username");
  } else if (email == "") {
    alert("Please enter a valid email address");
  } else if (password == "") {
    alert("Please enter your password");
  } else if (verifyPass == "") {
    alert("Please confirm your password");
  } else if (password != verifyPass) {
    alert("Password doesn't match");
  } else if (validCaptcha == false) {
    alert("Please Submit Captcha");
  } else {
    document.getElementById("berhasilRegister").setAttribute("data-dismiss", "modal");
    alert("Welcome to IFirstRow Sports! Enjoy!");
    document.getElementById("userRegister").value = "";
    document.getElementById("emailRegister").value = "";
    document.getElementById("passRegister").value = "";
    var verifyPass = document.getElementById("verifyPass").value = "";
    addElement("captchaField", "form", "form_captcha", "<div id='captcha'></div><input type='text' placeholder='Captcha' id='captchaTextBox'><i onclick='createCaptcha()' class='fa fa-refresh' aria-hidden='true'></i><input type='submit' class='btn btn-secondary btn_submit' value='SUBMIT'>");
    document.getElementById("form_captcha").setAttribute("onsubmit", "validateCaptcha()");
    createCaptcha();
  }
}

function addElement(parentId, elementTag, elementId, html) {
  // Adds an element to the document
  var p = document.getElementById(parentId);
  var newElement = document.createElement(elementTag);
  newElement.setAttribute('id', elementId);
  newElement.innerHTML = html;
  p.appendChild(newElement);
}

//time
function showTime() {
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;

  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("time").innerText = time;
  document.getElementById("time").textContent = time;

  setTimeout(showTime, 1000);

}

showTime();

// search bar
$('#myInput').keyup(function () {
  var valThis = $(this).val().toLowerCase();
  if (valThis == "") {
    $('.panel').show();
    $('div.carousel').show();
  } else {
    $('.panel').each(function () {
      var text = $(this).find("a").text().toLowerCase();
      $('div.carousel').hide();
      (text.indexOf(valThis) >= 0) ? $(this).show(): $(this).hide();
    });
  };
});

// videobasket
elem = document.getElementById("videobasket");

function openFullscreen(id) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { //firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { //chrome 
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { //edge
    elem.msRequestFullscreen();
  }
}

function setVideo(vid) {
  var video = document.getElementsByTagName('video')[0];
  var sources = video.getElementsByTagName('source');
  sources[0].src = 'video/' + vid + '.mp4';
  sources[1].src = 'video/' + vid + '.ogg';
  video.load();
}

function setSummary(konten) {
  var sum;
  var judul;
  if (konten === "unitedliverpool") {
    judul = "WATCH MANCHESTER UNITED VS LIVERPOOL"
    sum = "<p><b>Adam Lallana's late equaliser saved a point for an under-par Liverpool as they drew 1-1 at Manchester United on Super Sunday in a game littered with more VAR drama.</b></p>" +
      "<p>After a frantic opening lacking in clear-cut chances, the game exploded late in the first half with two crucial VAR calls. First, Marcus Rashford gave United the lead from close range (36) as Liverpool's cries for a foul on Divock Origi in the build-up were denied by VAR.</p>" +
      "<p>Then, as Sadio Mane looked to have equalised (44), VAR correctly ruled the strike out for a handball. Both decisions prompted wild celebrations from the home crowd, but Liverpool, who were looking for a record-equalling 18 straight Premier League wins, levelled late on through sub Lallana's back-post tap in (85).</p>" +
      "<p>The result moves United into 13th, seven points off the top four, while Liverpool see their lead at the top cut to six points following Manchester City's 2-0 win at Crystal Palace on Sunday.</p>" +
      "<p>Man Utd: De Gea (7), Wan-Bissaka (6), Young (6), Rojo (6), Lindelof (6), Maguire (7), Fred (6), Pereira (7), McTominay (7), James (8), Rashford (8)</p>" +
      "<p>Subs: Martial (5), Williams (5)</p>" +
      "<p>Liverpool: Alisson (6), Alexander-Arnold (5), Robertson (6), Matip (5), Van Dijk (6), Fabinho (5), Wijnaldum (6), Henderson (5), Mane (6), Firmino (6), Origi (5)</p>" +
      "<p>Subs: Oxlade-Chamberlain (5), Lallana (7), Keita (6)</p>" +
      "<p><b>Man of the match: Marcus Rashford</b></p>"
  } else if (konten === "chelseabrighton") {
    judul = "WATCH CHELSEA VS BRIGHTON"
    sum = "<p><b>Chelsea claimed their first home Premier League win of the season with a comfortable 2-0 victory over Brighton & Hove Albion.</b></p>" +
      "<p>The hosts had the better of the first half, Tammy Abraham hitting a post with a header and Ross Barkley and Pedro both being denied by Mat Ryan.</p>" +
      "<p>Jorginho broke the deadlock five minutes after the break, scoring from the penalty spot after Mason Mount had been brought down by Adam Webster.  </p>" +
      "<p>Brighton fought back, with Dan Burn hitting the crossbar, but Willian secured the victory with 14 minutes left after a counter-attack led by Callum Hudson-Odoi.</p>" +
      "<p>Chelsea climb four places to sixth, on 11 points. Brighton drop to 16th with six points, after a six-match winless run.</p>"
  } else if (konten === "sotonlei") {
    judul = "WATCH SOUTHAMPTON VS LEICESTER"
    sum = "<p><b>Leicester City moved up to second with a record-breaking 9-0 win at 10-man Southampton. </b></p>" +
      "<p>It rained goals at a wet St Mary's Stadium as the fantastic Foxes secured the biggest-ever away win in the Premier League and matched the overall record set when Manchester United beat Ipswich Town 9-0 at home in 1995.</p>" +
      "<p>Ben Chilwell scored the first after 10 minutes with a goal that involved Saints left-back Ryan Bertrand being retrospectively sent off.</p>" +
      "<p>Video Assistant Referee Mike Dean determined that Bertrand had committed a serious foul play tackle on Ayoze Perez in the build-up and advised Andre Marriner to issue a red card.</p>" +
      "<p>Perez scored a hat-trick for the second successive match against Southampton and Jamie Vardy also hit a treble to take his tally for the season to eight.</p>" +
      "<p>Youri Tielemans was also on target while James Maddison's late free-kick meant Leicester surpassed Man Utd's 8-1 away win at Nottingham Forest in 1999. </p>" +
      "<p>Vardy's stoppage-time penalty equalled the biggest victory in any Premier League match as Brendan Rodgers' side made history in the opening fixture of Matchweek 10.</p>"
  } else if (konten === "citywatford") {
    judul = "WATCH MANCHESTER CITY VS WATFORD"
    sum = "<p><b>Manchester City scored five goals in a devastating opening 18-minute spell as they responded to their shock defeat at Norwich with an 8-0 demolition of Watford on Saturday.</b></p>" +
      "<p>David Silva opened the scoring with just 52 seconds on the clock before Sergio Aguero put the champions two up from the penalty spot on seven minutes with his 100th Premier League goal at the Etihad Stadium.</p>" +
      "<p>City added a third on 12 minutes through a deflected Riyad Mahrez free-kick before Bernardo Silva's stooping header and Nicolas Otamendi's close-range tap-in saw Pep Guardiola's side race into a five-goal lead faster than any side in Premier League history.</p>"
  } else if (konten === "espn") {
    judul = "ESPN SPORTS TV"
    sum = "<p><b>Kemba Walker suffers apparent neck injury vs. Nuggets and leaves on a stretcher | NBA on ESPN</b></p>"
  } else if (konten === "skysports") {
    judul = "SKY SPORTS TV"
    sum = "<p><b>Gary Neville gives his honest opinion on Mourinho's appointment as Spurs manager | MNF</b></p>"
  } else if (konten === "premierleague") {
    judul = "PREMIER LEAGUE TV"
    sum = "<p><b>90-SECOND HIGHLIGHTS: Arsenal 2-2 Southampton | Premier League</b></p>"
  } else if (konten === "mutv") {
    judul = "MANCHESTER UNITED TV"
    sum = "<p><b>Rashford's stunning free kick sends United through! | Chelsea 1-2 Manchester United | Carabao Cup</b></p>"
  } else if (konten === "chelseatv") {
    judul = "CHELSEA TV"
    sum = "<p><b>Southampton 1-4 Chelsea | Abraham & Mount On Target In Big Away Win 🔥| Highlights</b></p>"
  } else if (konten === "lfctv") {
    judul = "LIVERPOOL TV"
    sum = "<p><b>Liverpool 3-1 Man City | Fabinho's stunner helps Reds beat City | Highlights</b></p>"
  } else if (konten === "europaleague") {
    judul = "UEFA EUROPA LEAUGE"
    sum = "<p><b>Highlights | Partizan Belgrade 0-1 Manchester United | UEFA Europa League</b></p>"
  } else if (konten === "championsleague") {
    judul = "UEFA CHAMPIONS LEAUGE"
    sum = "<p><b>Champions League Goals 2019/20 ● Matchday 5 | HD</p>"
  } else if (konten === "btsport") {
    judul = "BT SPORT"
    sum = "<p><b>'Its in our hands, we have to be happy with that' Frank Lampard is happy with a point in Valencia</p>"
  } else if (konten === "nbatv") {
    judul = "NBA TV"
    sum = "<p><b>Check out the top 10 plays of the night from around the league on Nov. 3 featuring Kristaps Porzingis, LeBron James, Kyle Kuzma and more! </b></p > "
  } else if (konten === "bb") {
    judul = "WATCH Golden State Warrios vs New Orleans Pelicans"
    sum = "<p><b>Check out the top 10 plays of the night from around the league on Nov. 3 featuring Kristaps Porzingis, LeBron James, Kyle Kuzma and more! </b></p > "
  } else if (konten === "bb1") {
    judul = "WATCH Cleveland Cavaliers vs Milwaukee Bucks"
    sum = "<p><b>Check out the top 10 plays of the night from around the league on Nov. 3 featuring Kristaps Porzingis, LeBron James, Kyle Kuzma and more! </b></p > "
  } else if (konten === "bb2") {
    judul = "WATCH Oklahoma City Thunder vs Houston Rockets "
    sum = "<p><b>Check out the top 10 plays of the night from around the league on Nov. 3 featuring Kristaps Porzingis, LeBron James, Kyle Kuzma and more! </b></p > "
  } else if (konten === "bb3") {
    judul = "WATCH Portland Trail Blazers vs San Antonio Spurs"
    sum = "<p><b>Check out the top 10 plays of the night from around the league on Nov. 3 featuring Kristaps Porzingis, LeBron James, Kyle Kuzma and more! </b></p > "
  } else if (konten === "bb4") {
    judul = "WATCH Denver Nuggets vs Sacramento Kings"
    sum = "<p><b>Check out the top 10 plays of the night from around the league on Nov. 3 featuring Kristaps Porzingis, LeBron James, Kyle Kuzma and more! </b></p > "
  } else if (konten === "bb5") {
    judul = "WATCH Utah Jazz vs Phoenix Suns"
    sum = "<p><b>Check out the top 10 plays of the night from around the league on Nov. 3 featuring Kristaps Porzingis, LeBron James, Kyle Kuzma and more! </b></p > "
  } else if (konten === "bb6") {
    judul = "WATCH Charlotte Hornets vs Los Angeles Clippers "
    sum = "<p><b>Check out the top 10 plays of the night from around the league on Nov. 3 featuring Kristaps Porzingis, LeBron James, Kyle Kuzma and more! </b></p > "
  } else if (konten === "bb7") {
    judul = "WATCH Enisey Krasnoyarsk 2 vs Avtodor Saratov 2 "
    sum = "<p><b>Check out the top 10 plays of the night from around the league on Nov. 3 featuring Kristaps Porzingis, LeBron James, Kyle Kuzma and more! </b></p > "
  } else if (konten === "bb8") {
    judul = "WATCH PM MBA Moscow 2 vs UNICS Kazan 2 "
    sum = "<p><b>Check out the top 10 plays of the night from around the league on Nov. 3 featuring Kristaps Porzingis, LeBron James, Kyle Kuzma and more! </b></p > "
  } else if (konten === "rugby") {
    judul = "WORLD RUGBY"
    sum = "<p><b>Five massive tackles at Rugby World Cup 2019</b></p>"
  } else if (konten === "h1") {
    judul = "WATCH ICE HOCKEY GAME"
    sum = "<p><b>Erik Johnson races back to save the empty net</b></p>"
  } else if (konten === "box") {
    judul = "WATCH BOXING GAME"
    sum = "<p><b>Oscar Valdez Gets Off Deck to Knock Out Adam Lopez | Fight Highlights</b></p>"
  } else if (konten === "tennis") {
    judul = "WATCH TENNIS GAME"
    sum = "<p><b>Federer vs Tsonga Amazing Match Point | Australian Open 2014</b></p>"
  } else if (konten === "baseball") {
    judul = "WATCH BASEBALL GAME"
    sum = "<p><b>Belli vs. Yeli: A game of M-V-P (Cody Bellinger vs. Christian Yelich!)</b></p>"
  } else if (konten === "motospot") {
    judul = "WATCH MOTOSPOT GAME"
    sum = "<p><b>On Board Satu Lap di Sirkuit Mandalika Lombok untuk MotoGP Indonesia #RaceTo2021</b></p>"
  } else if (konten === "nfl") {
    judul = "WATCH NFL"
    sum = "<p><b>Five massive tackles at Rugby World Cup 2019</b></p>"
  } else if (konten === "xone") {
    judul = "XONE"
    sum = "<p><b>Xone Sports Bar And Grill</b></p>"
  }
  document.getElementById("judul").innerHTML = judul;
  document.getElementById("summary").innerHTML = sum;
}


// $('.file-upload').file_upload();

var dropped = false;

+
function ($) {
  'use strict';
  var dropZone = document.getElementById('drop-zone');
  dropZone.ondrop = function (e) {
    e.preventDefault();
    this.className = 'upload-drop-zone dropped';
    $(this).html("File dropped");
    dropped = true;
  }

  dropZone.ondragover = function () {
    this.className = 'upload-drop-zone drop';
    dropped = false;
    return false;
  }
  dropZone.ondragleave = function () {
    this.className = 'upload-drop-zone';
    dropped = false;
    return false;
  }

}(jQuery);


function checkUploaded() {
  if (dropped) {
    openContent(this, 'home');
    alert('File uploaded successfully, the file is being reviewed by Administrator');
  } else {
    alert('No files uploaded!');
  }
  dropped = false;
}