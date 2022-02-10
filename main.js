noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristY = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.position(50, 200);
    //video.hide();
    canvas = createCanvas(500, 370);
    canvas.position(660, 120);
    poseNet =  ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet has been Initialized!');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX +" noseY = " + noseY);
        leftWristX =  results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);

        console.log("leftWristX = " + leftWristX + "rightWristX = " + rightWristX + "difference = " + difference);
    }
}

function draw()
{
    background('skyblue');

    document.getElementById("circle").innerHTML = "Radius of the circle  will be = " + difference + "px";
    fill('F90093');
    stroke('white');
    strokeWeight(4);
    circle(noseX, noseY, difference);
}
