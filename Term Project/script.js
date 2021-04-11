
// profile.html functions
function fill() {
  var php = new XMLHttpRequest();
  php.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      pop(JSON.parse(this.responseText));
    }
  }
  php.open("GET", "profile.php?name=" + user, true);
  php.send();
}

function pop(info) {
  document.getElementById("avatar").src = "Avatars/" + info.avatar;
  document.getElementById("user_id").innerHTML = info.name;
  document.getElementById("bday").innerHTML = "<h3>Birthday:</h3>" + info.bday;
  document.getElementById("gender").innerHTML = "<h3>Gender:</h3>" + info.gender;
  document.getElementById("weight").innerHTML = "<h3>Weight:</h3>" + info.weight;
  document.getElementById("height").innerHTML = "<h3>Height:</h3>" + info.height;
}

// index scripts
function login() {
  var user = document.getElementById("user").value.toLowerCase();
  var pass = document.getElementById("password").value;

  var php = new XMLHttpRequest();
  php.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      //alert(this.responseText);
      if(this.responseText){
        sessionStorage.setItem("user_id",user);
        sessionStorage.setItem("password",pass);
        location.href = "feed.html";
      }
      else {
        document.getElementById("fail").innerHTML = "Password does not match given user name";
      }
    }
  }
  php.open("POST", "authenticate.php", true);
  php.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  php.send("name="+user+"&password="+pass);
}


// feed scripts
function loadFeed(){
  var user = sessionStorage.getItem("user_id");
  var pass = sessionStorage.getItem("password");

  // hide the disabled control in the script
  document.getElementById("emoji-area").setAttribute("disabled",true);
  var php = new XMLHttpRequest();
  php.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      if(this.responseText){
        document.getElementById("user_name").innerHTML=user;
        document.getElementById("user_pic").src="Avatars/" + this.responseText;
        feeder();
      }
      else {
        location.href="denied.html";
      }
    }
  }
  php.open("POST", "authenticate.php", true);
  php.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  php.send("name="+user+"&password="+pass);
}

function feeder() {
  var input = document.getElementById("emoji-input");

  var php = new XMLHttpRequest();
  php.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      input.innerHTML = this.responseText;
    }
  }
  php.open("GET", "emoji_populator.php", true);
  php.send();
}

function emojiSelect() {
  var area = document.getElementById("emoji-area");

  // for the last charater
  if(event.target.innerHTML.length > 2)
    area.value += event.target.innerHTML.slice(0,-1);
  else {
    area.value += event.target.innerHTML;
  }
}

function back() {
  var area = document.getElementById("emoji-area");
  area.value = area.value.slice(0,-2);
}

function postIt() {
  var user = sessionStorage.getItem('user_id');
  var pass = sessionStorage.getItem('password');
  var text = document.getElementById("emoji-area");

  var php = new XMLHttpRequest();
  php.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      if(this.responseText){
        alert("Posted!");
        text.value = "";
      }
      else {
        alert("fail");
      }
    }
  }
  php.open("POST", "poster.php", true);
  php.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  php.send("name=" + user + "&password=" + pass + "&text=" + text);
}

// account functions
function accountInit() {
  var user = sessionStorage.getItem("user_id");
  var pass = sessionStorage.getItem("password");
  var list = document.getElementById("listing");

  var php = new XMLHttpRequest();
  php.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      if(this.responseText){
        list.innerHTML=this.responseText;
      }
      else {
        location.href="denied.html";
      }
    }
  }
  php.open("POST", "follower_pop.php", true);
  php.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  php.send("name="+user+"&password="+pass);
}

function follow() {
    var user = sessionStorage.getItem('user_id');
    var pass = sessionStorage.getItem('password');
    var follow = document.getElementById("follow").value;

    var php = new XMLHttpRequest();
    php.onreadystatechange = function () {
      if(this.readyState == 4 && this.status == 200) {
        var ver = document.getElementById("addver");
        if(this.responseText == 1){
          ver.innerHTML = "Now following " + follow;
          accountInit();
        }
        else if(this.responseText == -1) {
          location.href="denied.html";
        }
        else {
          if(this.responseText == 0){
            ver.innerHTML = follow + " is not a registered user";
          }
          else if(this.responseText == -1){
            ver.innerHTML = "Cannot follow self";
          }
          else {
            ver.innerHTML = "You are already following " + follow;
          }
        }
      }
    }
    php.open("POST", "add.php", true);
    php.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    php.send("name="+user+"&follow="+follow+"&password="+pass);
}

function unfollow() {
  var user = sessionStorage.getItem('user_id');
  var pass = sessionStorage.getItem('password');
  var follow = document.getElementById("listing").value;

  var php = new XMLHttpRequest();
  php.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      var ver = document.getElementById("delver");
      alert(this.responseText);
      if(this.responseText == 1){
        ver.innerHTML = "No longer following " + follow;
        accountInit();
      }
      else if(this.responseText == -1){
        location.href="denied.html";
      }
      else {
        ver.innerHTML = "Failed to remove " + follow + " from list";
      }
    }
  }
  php.open("POST", "del.php", true);
  php.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  php.send("name="+user+"&follow="+follow+"&password="+pass);
}
