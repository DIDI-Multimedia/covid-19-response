console.log('sketch.js')


let socket
let tweets
let display = []
let start = false
let nodes
let totalTweets = 1

let cols = {

    '-6': [255, 0, 34],
    '-2': [255, 0, 0],
    '-1': [0, 255, 0],
    '0': [255],
    '1': [255, 0, 255],
    '2': [255, 255, 0],


}

function preload() {
    f = loadFont(
        "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf"
    )
}


function setup() {

    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    textFont(f);
    textSize(width / 3);
    textAlign(CENTER, TOP);
    background(0)
    connectSocket()
    socket.emit('get', null)

    noStroke()

}

let count = 0

function draw() {

    push()

    rotateX(PI / 4)
    rotateZ(frameCount * 0.0005)
    translate(-width / 2, -height / 2)

    background(0)

    if (start) {

        if (count % 2 === 0) update(tweets)
        count++
    }

    display.forEach(a => {

        // console.log('haha')
        a.update()


    })

    fill(255)

    updateNodes(nodes)
    for (c in nodes) {
        let a = nodes[c]
        fill(255)
            // push()
            // translate(width / 2, height / 2)
            // rotateZ(-a.ang)

        // console.log(a.x,a.y)
        // translate(a.rad,0)
        push()
            // rotateZ(a.ang)

        translate(a.x, a.y)
        // rotateY(PI/2)
        rotateZ(-frameCount * 0.0005)

        textSize(constrain(a.tot, 3, 24))

        if (a.scr < 0){
        	fill(255,0,0)
        }
        if (a.scr >= 0){
        	fill(0,255,0)
        }

        text(a.id + '(' + a.scr + ')', 0, 0)
        pop()
    }

    pop()

}

function updateNodes(data) {

    let angle = 0

    for (n in data) {

        angle += TWO_PI * data[n].tot / totalTweets
        data[n].ang = angle
        var r = data[n].rad
        data[n].x = r * sin(angle) + width / 2
        data[n].y = r * cos(angle) + height / 2


    }




}

function update() {

    if (tweets.length < 1) start = false;

    let value = tweets.shift()

    value.discussed.forEach(a => {

        let tweet = new Tweet(a, value.score)
        display.push(tweet)
        totalTweets++


    })

    document.getElementById("time").innerHTML = value.data;



}

function Tweet(a, s) {

    nodes[a].tot++

    let t = nodes[a]

    this.x = width / 2
    this.y = height / 2
    this.z = 0
    nodes[a].scr += s

    this.r = (t.rad)

    var x = this.r * sin(t.ang) + width / 2
    var y = this.r * cos(t.ang) + height / 2
    this.a = a

    this.tar = {
        x: x,
        y: y,
        z: t.tot * 3
    }

    if (s<0){
    	this.tar.z*=-1
    }
    this.col = [255]

    if (s < 0) {
        this.col = [255, 0, 0,100]
    }
    if (s > 0) {
        this.col = [0, 255, 0,100]
    }
    // console.log('color:', this.col, s)
    // this.ty = height 
    this.v = 0.01

    this.update = function() {

        let t = nodes[this.a]

        // this.x = nodes['AE'].x
        // this.y = nodes['AE'].y

        var x = this.r * sin(t.ang) + width / 2
        var y = this.r * cos(t.ang) + height / 2

        // console.log(x,y,t.tot)

        this.tar.x = x
        this.tar.y = y

        this.x = this.x + (this.tar.x - this.x) * this.v
        this.y = this.y + (this.tar.y - this.y) * this.v
        this.z = this.z + (this.tar.z - this.z) * this.v

        noStroke()
        fill(this.col)
        push()
        translate(this.x, this.y, this.z)
        sphere(3)
        pop()

    }



}




function connectSocket() {

    console.log('connect socket')

    socket = io.connect('http://localhost:3000') // Start a socket connection to the server

    socket.on('transmission', function(data) {

        // console.log('transmit')
        drawConnections(data)


    });



}

function drawConnections(data) {

    tweets = data[0]
    let countries = data[1]
    fill(255)
    textSize(6)
    start = true

    nodes = {}

    var r = height / 3

    //convert polar coordinates to cartesian coordinates


    //draw ellipse at every x,y point
    ellipse(x, y, 30);


    for (var i = 0; i < countries.length; i++) {

        let country = countries[i]

        let angle = TWO_PI * i / countries.length

        var x = r * sin(angle) + width / 2
        var y = r * cos(angle) + height / 2

        text(country, x, y)

        nodes[country] = {
            x: x,
            y: y,
            id: country,
            pos: 0,
            neg: 0,
            neu: 0,
            ang: angle,
            rad: r,
            tot: 0,
            scr: 0
        }

    }

    // return nodes 


}