console.log('sketch.js')
let spores = []

function setup() {

    var canvas = createCanvas(windowWidth / 8, windowWidth / 8, WEBGL);
    canvas.parent('sketch-div');
    stroke(0)
    noFill()
    for (i = 0; i < TWO_PI; i += PI / 6) {
        for (j = 0; j < TWO_PI; j += PI / 4) {
            for (k = 0; k < TWO_PI; k += PI / 4) {
                spores.push(new Spore(i, j, k))
            }
        }


    }
}

function draw() {
    background('#F04E30')
    scale(Math.abs(sin(frameCount * 0.01)) * 0.5 + 0.75)
    rotateX(frameCount * 0.005 + mouseX * 0.001)
    rotateZ(frameCount * 0.005 + mouseY * 0.001)
    let radius = width / 4
    stroke(0,100)
    sphere(radius, 24, 24)
    strokeWeight(1)

    spores.forEach(s => s.display(radius))

}

function Spore(i, j, j) {

    this.rx = i
    this.ry = j
    this.rz = k
    this.display = function(radius) {
        push()
        rotateZ(this.rz)
        rotateX(this.rx)
        rotateY(this.ry)

        translate(0, -radius, 0)
        cone(radius / 16, radius / 3, 4);
        push()
        stroke(255, 100)
        translate(0, -radius * 0.2, 0)
        sphere(radius/8,4,4)
        pop()
        pop()


    }

}


function windowResized() {

  resizeCanvas(windowWidth / 8, windowWidth / 8, WEBGL)

}