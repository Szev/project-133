img="";
status= "";
objects= [];

function setup()
{
    canvas= createCanvas(600, 400);
    canvas.center();
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: detecting object";
}
function preload()
{
    img= loadImage('bottle.jpg');
}
function draw()
{
    if(status!=undefined)
    {
        image(img, 0 , 0, 600, 400);
       
        for(var i= 0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML= "statusObjectDetected";
            fill("#f70202"); 
            percent= floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%", objects[i].x+5, objects[i].y+15);
            noFill();
            stroke("#f70202");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    
}
function modelLoaded()
{
    console.log("modelLoaded");
    status= true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects= results;
    }
}