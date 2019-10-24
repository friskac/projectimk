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

function validateCaptcha() {
  event.preventDefault();
  debugger
  if (document.getElementById("captchaTextBox").value == code) {
    alert("Valid Captcha")
  }else{
    alert("Invalid Captcha. try Again");
    createCaptcha();
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
  for(i = 0; i < x.length ; i++){
      tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(idContentContainer).style.display = "block";
  obj.className += " active";
}

// function showCont(id){
//   var x = document.getElementById(id);
//   if(x.className.indexOf("w3-show") == -1){
//       x.className += " w3-show";
//   }
//   else{
//       x.className = x.className.replace(" w3-show", "");
//   }
// }


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
    return true;
  }
  return false;
}