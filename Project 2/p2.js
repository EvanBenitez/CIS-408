var slideIndex=2;
var running=false;

//video play functions
function playVideo() {
  var myVideo = document.getElementById("eagle");
  var pButton = document.getElementById("pbutton");
  var controlwidth = document.querySelector('.controls');

  if(myVideo.paused) {
    myVideo.play();
    controlwidth.style.width = "222px";
    pButton.innerHTML = "Pause ||";
  }
  else {
    myVideo.pause();
    controlwidth.style.width = "210px";
    pButton.innerHTML = "Play >";
  }
}

function restart() {
  var myVideo = document.getElementById("eagle");
  myVideo.currentTime = 0;
}

function back() {
  var myVideo = document.getElementById("eagle");
  myVideo.currentTime = myVideo.currentTime - 10;
}

function forward() {
  var myVideo = document.getElementById("eagle");
  myVideo.currentTime = myVideo.currentTime + 10;
}
// video play functions end here

// Start the slide show
function startSlides() {
  var slides = document.getElementsByClassName("slide");

  slides[slideIndex].style.display = "none";
  slideIndex++;
  if(slideIndex > 2){
    slideIndex = 0;
  }
  slides[slideIndex].style.display = "block";
  setTimeout(startSlides,3000);
}

// Display form data
function showInfo() {
  var form = document.getElementById("formData").getElementsByTagName("input");
  var data = document.getElementById("data").getElementsByTagName("p");

  data[0].innerHTML = "<b>" + form[0].getAttribute("name") + ": </b>" + form[0].value;
  data[1].innerHTML = "<b>" + form[1].getAttribute("name") + ": </b>" + form[1].value;
  data[2].innerHTML = "<b>" + form[2].getAttribute("name") + ": </b>" + form[2].value;
  data[3].innerHTML = "<b>Info sent to: </b>" + window.location.href + document.getElementById("formData").getAttribute("action");
}

  //animation script
  async function runAnimation() {
  var i=0;
  var x=0;
  var sketch = document.getElementById("runner").getContext("2d");
  var imgArray = [];


  sketch.fillStyle="#ffffff";

  for(var j=1; j <= 5; j++) {
    var pic = new Image();
    pic.src="imageset/run-" + j + ".png";
    imgArray.push(pic);
  }

  // To only start the animationg once
  // setInterval Used to control speed
  if(running == false){
    running = true;
    setInterval(draw,100);
  }
  function draw() {
    sketch.fillRect(0,0,300,150);
    sketch.drawImage(imgArray[i],10,10,190,190,x,0,150,150);
    i += 1;
    x +=15
      if(i>4){
      i=0;
    }
    if(x>350){
      x=-150;
    }
  }
}


/*async function runAnimation() {
  var i=0;
  var x=0;
  var inter;
  var sketch = document.getElementById("runner").getContext("2d");
  var imgArray = [];

  sketch.fillStyle="#ffffff";
  imgArray.push(document.getElementById("run1"));
  imgArray.push(document.getElementById("run2"));
  imgArray.push(document.getElementById("run3"));
  imgArray.push(document.getElementById("run4"));
  imgArray.push(document.getElementById("run5"));
  if(running == false){
    running = true;
    inter = setInterval(draw,100);
  }
  function draw() {
    sketch.fillRect(0,0,300,150);
    sketch.drawImage(imgArray[i],10,10,190,190,x,0,150,150);
    i += 1;
    x +=15
    if(i>4){
      i=0;
    }
    if(x>350){
      x=-150;
    }
  }*/
