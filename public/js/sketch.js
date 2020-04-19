console.log('hi')
function setup() {

	// var myDiv = document.getElementByID('sketch-div');
	// console.log('myDiv',myDiv.style)
	// var myWidth = myDiv.style.width;


    var canvas = createCanvas(windowWidth/8, windowWidth/8,WEBGL);
    canvas.parent('sketch-div');
    stroke(0)
    noFill()

}

function draw() {
    background('#F04E30')
    rotateX(frameCount*0.001+mouseX*0.001)
    rotateZ(frameCount*0.001+mouseY*0.001)
    sphere(width/4)

}