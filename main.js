img = "";
Status = "";
objects = [];

function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video,gotResults);
    for (i = 0; i < objects.length; i++)
    {
    document.getElementById("status").innerHTML = "Status : Object Detected"
    document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected : " + objects.length
    fill(rgb);
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%",objects[i].x,objects[i].y);
    noFill();
    stroke(rgb);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
    }
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
}

function gotResults(error,results){
if (error){
    console.error(error);
}else{
    console.log(results);
    objects = results;
}
}