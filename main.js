song="";

function preload(){
song=loadSound("Billie Eilish - bad guy.mp3");
}

scoreRightWrist=0;
scoreLefttWrist=0;

RightWristX=0;
RightWristY=0;

LeftWristX=0;
LeftWristY=0;

function setup(){
canvas=createCanvas(500,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

posenet=ml5.poseNet(video,modelLoaded);
posenet.on('pose',gotPoses);
}

function modelLoaded(){
console.log("╰(*°▽°*)╯ posenet is initialed ╰(*°▽°*)╯");
}

function draw(){
image(video,0,0,500,500);

fill('rgb(87, 226, 180)');
stroke('rgb(87, 226, 180)');

if(scoreRightWrist>0.2){
  circle(RightWristX,RightWristY,30);


if(RightWristY>0 && RightWristY<=100){
  document.getElementById("speeed").innerHTML="speed=0.5x";
  song.rate(0.5);
}
else if(RightWristY>100 && RightWristY<=200){
  document.getElementById("speeed").innerHTML="speed=normal";
  song.rate(1);
}
else if(RightWristY>200 && RightWristY<=300){
  document.getElementById("speeed").innerHTML="speed=1.5";
  song.rate(1.5);
}
else if(RightWristY>300 && RightWristY<=400){
  document.getElementById("speeed").innerHTML="speed=2x";
  song.rate(2);
}
else if(RightWristY>400){
  document.getElementById("speeed").innerHTML="speed=2.5x";
  song.rate(2.5);
}
}
if(scoreLeftWrist>0.2){
circle(LeftWristX,LeftWristY,20);
leftwristnumber=Number(LeftWristY);
removedecimal=floor(leftwristnumber);
volume=removedecimal/500;
document.getElementById("vooolumme").innerHTML="volume = "+volume;
song.setVolume(volume);
}
}

function gotPoses(results){
  if(results.length>0){
  console.log(results);
  LeftWristX=results[0].pose.leftWrist.x;
  LeftWristY=results[0].pose.leftWrist.y;
 RightWristX=results[0].pose.righttWrist.x;
 RightWristY=results[0].pose.rightWrist.y;
scoreRightWrist=results[0].pose.keypoints[10].score;
scoreLeftWrist=results[0].pose.keypoints[9].score;
  }

}

function play_dj(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}