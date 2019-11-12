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
  }else{
    alert("Invalid Captcha. try Again");
  }
}


// tablink

function openContent(obj, idContentContainer){
  var i, x, tablinks;

  x = document.getElementsByClassName("tabs");
  for(i = 0; i < x.length; i++){
      x[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for(i = 0; i < tablinks.length ; i++){
      tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(idContentContainer).style.display = "block";
  obj.className += " active";
}

function showCont(id){
  var x = document.getElementById(id);
  if(x.className.indexOf("w3-show") == -1){
      x.className += " w3-show";
  }
  else{
      x.className = x.className.replace(" w3-show", "");
  }
}


//login

function login(){
  console.log("masuk");
  if(validateLogin()==true){
    var username = document.getElementById('uname').value;
    var p = document.getElementById('sudahLogin');
    var element = document.getElementById('login_tab');
    element.parentNode.removeChild(element);
    var node = document.createElement("p");
    node.setAttribute('id',"profil");
    var textnode = document.createTextNode("Hello, "+username);
    node.appendChild(textnode);
    document.getElementById("sudahlogin").appendChild(node);
  }
  else{
    alert("Please enter a valid login information");
  }
}

function validateLogin(){
  var username = document.getElementById('uname').value;
  var password = document.getElementById('pwd').value;
  if(username!="" && password!=""){
    document.getElementById("berhasilLogin").setAttribute("data-dismiss","modal");
    return true;
  }
  return false;
}

//register
function verifyRegister(){
  var username = document.getElementById("userRegister").value;
  var email = document.getElementById("emailRegister").value;
  var password = document.getElementById("passRegister").value;
  var verifyPass = document.getElementById("verifyPass").value;
  if(username=="" && email=="" && password=="" && verifyPass=="" && validCaptcha==false){
    alert("Please register yourself");
  }
  else if(username==""){
    alert("Please enter your username");
  }
  else if(email==""){
    alert("Please enter a valid email address");
  }
  else if(password==""){
    alert("Please enter your password");
  }
  else if(verifyPass==""){
    alert("Please confirm your password");
  }
  else if(password!=verifyPass){
    alert("Password doesn't match");
  }
  else if(validCaptcha==false){
    alert("Please Submit Captcha");
  }
  else{
    document.getElementById("berhasilRegister").setAttribute("data-dismiss","modal");
    alert("Welcome to IFirstRow Sports! Enjoy!");
    document.getElementById("userRegister").value="";
    document.getElementById("emailRegister").value="";
    document.getElementById("passRegister").value="";
    var verifyPass = document.getElementById("verifyPass").value="";
    addElement("captchaField","form","form_captcha","<div id='captcha'></div><input type='text' placeholder='Captcha' id='captchaTextBox'><i onclick='createCaptcha()' class='fa fa-refresh' aria-hidden='true'></i><input type='submit' class='btn btn-secondary btn_submit' value='SUBMIT'>");
    document.getElementById("form_captcha").setAttribute("onsubmit","validateCaptcha()");
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
function showTime(){
  var date = new Date();
  var h = date.getHours(); 
  var m = date.getMinutes(); 
  var s = date.getSeconds(); 
  var session = "AM";
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
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
$('#myInput').keyup(function(){
  var valThis = $(this).val().toLowerCase();
      if(valThis == ""){
          $('.panel').show();
          $('div.carousel').show();
      } else {
          $('.panel').each(function(){
          var text = $(this).find("a").text().toLowerCase();
          $('div.carousel').hide();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
      });
  };
});

// videobasket
var elem = document.getElementById("videobasket");
function openFullscreen(){
  if(elem.requestFullscreen){
    elem.requestFullscreen();
  }
  else if(elem.mozRequestFullScreen){//firefox
    elem.mozRequestFullScreen();
  }
  else if(elem.webkitRequestFullscreen){//chrome 
    elem.webkitRequestFullscreen();
  }
  else if (elem.msRequestFullscreen){//edge
    elem.msRequestFullscreen();
  }
}