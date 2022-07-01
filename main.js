var status = "";
objects = [];

function preload() {
   // img = loadImage("baby.jpg");
    alarm = new Audio('alarm.mp3');
}
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    camera = createCapture(VIDEO);
    camera.hide();
    Coco = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    alarm.play();
}
function draw() {
    image(camera, 0, 0, 640, 480);
    if (status != "") {
        Coco.detect(camera, gotResults);
        for (var i = 0; i < objects.length; i++) {
            label = objects[i].label;
            confidence = objects[i].confidence;
            x = objects[i].x;
            y = objects[i].y;
            height = objects[i].height;
            width = objects[i].width;
            fill("sienna");
            text(label, x, y);
            noFill();
            stroke("teal");
            rect(x - 90, y, width, height + 10);
            if (label == "person") {
                document.getElementById("status").innerHTML = "Status: Baby Detected";
                document.getElementById("objects").innerHTML = "How many people : " + objects.length;
                alarm.stop();
            }
            else {
                document.getElementById("status").innerHTML = "Status: Baby Not Detected";
                document.getElementById("objects").innerHTML = "How many objects : " + objects.length;
                alarm.play();
            }
            if (objects.length == 0) {
                document.getElementById("status").innerHTML = "Status: Baby Not Detected";
                document.getElementById("objects").innerHTML = "No Objects Detected";
                alarm.play();
            }

        }
    }
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}