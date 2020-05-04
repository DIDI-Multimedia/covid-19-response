var currentKey = 'outline' // by default
var shapes = []
var nodes = []
var img
var mode
var measure = true
var data = {}
var rulerTool = {
    visible: false
}

// const SwatchBlue=0x029DAF
// const SwatchOrange=0xF07C19
// const SwatchYellow=0xFFC219
// const SwatchPink=0xE42251
// const SwatchGreen=0xE5D599
// const SwatchGold=0x118AB2
// const pGreen='#2FC2A1'
// const pYellow='#F8EE84'
// const pOrange='#F8EE84'
// const pPink='#CE3049'
// const pGrey='#888888'
// const indego='#01091F'

var colorScheme = {

    'outline': '#029DAF',
    'zones': '#F8EE84',
    'service': '#888888',
    'furniture': '#CE3049'
}




const elements = ["#measurement", "#myModal", "#sketch-div", "#shapes", "#layers"]
hideArr(elements)
// showAll()

function hideArr(arr) {

    arr.forEach(id => $(id).hide())
    rulerTool.visible = false

}



var currentKey = null

const drawingKeys = ['outline', 'zones', 'service', 'furniture', 'measurement']

initializeButtons()

// showAll() // for debugging purposes 


function showAll() {

    $("#scale").show()
    $("#draw").show()
    $("#generate").show()
    $("#layers").show()
    $("#shapes").show()
    $("#sketch-div").show()


}

function initializeButtons() {

    // $("#scale").hide()
    // $("#draw").hide()
    // $("#generate").hide()
    // $('#scale').prop('disabled', true);
    $('#draw').prop('disabled', true);



}


// <input type="number" id="length" name="quantity" min="0" max="100"></span>



// $("#btn-meters").click(function() 

//     // console.log('')

//     // $('#generate').prop('disabled', false);


$("#eraser").click(function() {

  data[currentKey] = []

})

$("#btn-meters").click(function() {

    var value = $("#length").val()
    rulerTool.scale = parseFloat(value)
    activateDraw()


})

$("#btn-feet").click(function() {

    var value = $("#length").val()
    rulerTool.scale = parseFloat($("#length").val()) * (3.28084) // convert to feet 
    activateDraw()

})

function activateDraw() {

    $('#draw').prop('disabled', false)
    $("#draw").css("background-color", "yellow");
    $("#scale").css("background-color", "#d3d3d3");
    $("#draw").trigger("click");

}
// })

// $("#btn-ft").click(function() {

//     // $('#generate').prop('disabled', false);

// })

$("#load").click(function() {

    hideArr(elements)
        // $("#description").hide()
    $("#myModal").show()
    $("#scale").show()

})

$("#draw").click(function() {

    hideArr(elements)

    $("#layers").show()
    $("#shapes").show()
    $("#sketch-div").show()
    $("#generate").show()

    currentKey = 'outline' // should this be outline?
    $("#outline").addClass('btn-selected-outline')

})

$("#scale").click(function() {

    // rule mode r
    hideArr(elements)
    currentKey = 'measurement'
    $("#measurement").show()
    $("#sketch-div").show()
    $("#draw").show()
    $("#load").css("background-color", "#d3d3d3");

    if (data[currentKey].length == 0) {

        // if ruler tool hasnt been initialized 
        rulerTool = new Ruler(100, 300, 400, 500)
        data[currentKey].push(rulerTool)

        return
    }

    rulerTool.visible = true

})

$("#generate").click(function() {

    // hideArr(elements)

    $("#sketch-div").show()

    let e = {}

    for (key in data) {

        let vertices = data[key].map(a => a.nodes.map(b => r = {
            x: b.x,
            y: b.y
        }))
        e[key] = vertices

    }

    e['button']=[{x1:0,y1:0},{y2:width,y2:height}]
    e['image'] = {

        url: 'https://static.dezeen.com/uploads/2019/05/pocket-living-offices-threefold-architects-london-uk_dezeen_floor-plan.jpg',
        scalePixel: rulerTool.length,
        scaleM: rulerTool.scale,

        px: {
            width: width,
            height: height
        }

    }

    console.log(JSON.stringify(e, null, 4))

    alert(JSON.stringify(e, null, 4))

});



$("#outline").click(function() {

    console.log('outline selected')

    // hideArr(elements)
    currentKey = 'outline'
    $("#outline").addClass('btn-selected-outline')
        // $("#shapes").show()
        // $("#sketch-div").show()

});



$("#service").click(function() {

    currentKey = 'service'
    $("#service").addClass('btn-selected-service')

});

$("#zones").click(function() {

    currentKey = 'zones'
    $("#zones").addClass('btn-selected-zones')

});

$("#furniture").click(function() {

    currentKey = 'furniture'
    $("#furniture").addClass('btn-selected-furniture')

});


$('#myFormSubmit').click(function(e) {

    console.log('IMAGE LOADED')
    var formdata = new FormData()
    formdata.append('photo', $('#input-image').files[0])
    $.ajax({
        method: 'POST',
        processData: false,
        contentType: false,
        url: '/imageupload',
        data: formdata,
        success: function(o) {
            //callback here on success
            console.log('image sucessfully loaded')
        },
        error: function(e) {
            //callback here on error
            alert('image error')
        }
    })
});

$("#polygon").click(function() {

    let outline = new Outline(width / 2, height / 2, width / 8, 4, currentKey)
    current = outline
    console.log('currentKey', currentKey)
    data[currentKey].push(outline)

})


$("#rectangle").click(function() {

    let outline = new Rectangle(width / 2, height / 2, width / 8, width / 8, currentKey)
    current = outline
    data[currentKey].push(outline)

})


var w, h

function preload() {

    img = loadImage('https://static.dezeen.com/uploads/2019/05/pocket-living-offices-threefold-architects-london-uk_dezeen_floor-plan.jpg')


}



function setup() {

    let scaleFactor = windowWidth / img.width * 0.7
    h = img.height * scaleFactor
    w = img.width * scaleFactor

    img.resize(w, h)

    var canvas = createCanvas(w, h);
    canvas.parent('sketch-div');

    reset()
}

function draw() {

    image(img, 0, 0, width, height)


    drawingKeys.forEach(key => {



        data[key].forEach(a => a.display())


    })
}


function mouseMoved() {

    if (data[currentKey]) {
        data[currentKey].forEach(a => a.mouseMoved(mouseX, mouseY))


    }


}

function mousePressed() {
    if (data[currentKey]) {
        data[currentKey].forEach(a => a.mousePressed())
    }
}

function mouseDragged() {


    if (exceedBoundary(mouseX, mouseY)) return false

    if (data[currentKey]) {


        data[currentKey].forEach(a => a.mouseDragged())
    }

}

function exceedBoundary(x, y) {

    if (x > width) return true
    if (x < 0) return true
    if (y < 0) return true
    if (y > height) return true

    return false

}



function doubleClicked() {

    if (data[currentKey]) {

        data[currentKey].forEach(a => a.doubleClicked(mouseX, mouseY))

    }

}



function Rectangle(x, y, w, h, key) {

    this.key = key

    this.x = x
    this.y = y
    this.angle = 0
    this.w = w
    this.h = h
        // this.hoverPt = null

    this.a = new Node(this.x, this.y)
    this.b = new Node(this.x + this.w, this.y + this.h)
    this.c = new Node(this.w / 2 + this.x, this.y + this.h / 2)

    this.nodes = [this.a, this.b, this.c]

    this.display = function() {

        fill(0, 50)
        stroke(colorScheme[this.key])
        strokeWeight(5)

        push()
        rect(this.a.x, this.a.y, this.w, this.h)
        pop()

        this.nodes.forEach(n => n.display())


    }

    this.mouseMoved = function() {

        //

        this.nodes.forEach(n => n.hover = false)
        this.nodes.forEach(n => {

            let d = dist(mouseX, mouseY, n.x, n.y)

            if (d < n.radius) {

                n.hover = true

            }

        })

    }


    this.mousePressed = function() {

        this.nodes.forEach(n => n.selected = false)

        this.nodes.forEach(n => {

            let d = dist(mouseX, mouseY, n.x, n.y)

            if (d < n.radius) {

                n.selected = true
                return

            }

        })

    }

    this.mouseDragged = function() {

        this.nodes.forEach(n => {

            if (n.selected) {

                n.x = mouseX
                n.y = mouseY

                let a = this.nodes[0]
                let b = this.nodes[1]
                let c = this.nodes[2]


                if (n.x === c.x) {

                    a.x = c.x - this.w / 2
                    a.y = c.y - this.h / 2
                    b.x = c.x + this.w / 2
                    b.y = c.y + this.h / 2

                } else {

                    this.x = a.x
                    this.y = a.y
                    this.w = b.x - a.x
                    this.h = b.y - a.y

                }

                // c.x = a.x + this.w/2
                // c.y = a.y + this.h/2
            }

        })


    }
    this.doubleClicked = function() {
        this.nodes.forEach(n => n.selected = false)
    }

    this.copy = function() {

        let rectangle = new Rectangle(this.a.x, this.a.y, this.w, this.h)

        return rectangle


    }

}

function reset() {

    // order is the order u want to draw them

    data = {}

    data.furniture = []
    data.service = []
    data.zones = []
    data.outline = []
    data.measurement = []
        // data.image = "https://static.dezeen.com/uploads/2019/05/pocket-living-offices-threefold-architects-london-uk_dezeen_floor-plan.jpg"

}

function Ruler(x1, y1, x2, y2) {


    this.a = new Node(x1, y2)
    this.b = new Node(x2, y2)

    this.nodes = [this.a, this.b]
    this.visible = true
    this.length = 0

    this.mousePressed = function() {

        this.nodes.forEach(n => n.selected = false)

        this.nodes.forEach(n => {

            let d = dist(mouseX, mouseY, n.x, n.y)

            if (d < n.radius) {

                n.selected = true

                return

            }

        })

    }

    this.mouseDragged = function() {

        let id = 0

        this.nodes.forEach(n => {

            if (n.selected) {
                n.x = mouseX
                n.y = mouseY

            }

        })


    }

    this.doubleClicked = function(x, y) {

        // do nothing 
    }

    this.mouseMoved = function(x, y) {

        // do nothing

    }

    this.display = function() {

        // console.log('display ruler!', this.a, this.b)


        if (!this.visible) return

        fill(0, 50)
        stroke(255, 0, 0)
        strokeWeight(6)
        beginShape();
        this.nodes.forEach(n => vertex(n.x, n.y))
        endShape(CLOSE)
        this.nodes.forEach(n => n.display())

        if (this.nodes.length == 2) {

            let a = this.nodes[0]
            let b = this.nodes[1]
            this.length = dist(a.x, a.y, b.x, b.y)
            let midX = (b.x - a.x) / 2 + a.x
            let midY = (b.y - a.y) / 2 + a.y
            stroke(255)
            fill(255, 0, 0)

            var value = $("#length").val()
            // console.log('value::', value)
            textSize(24)

            if (value == '') {

                value = '?'

            }


            text(value + ' meters', midX, midY)


        }


    }

}


function Outline(x, y, radius, npoints, key) {

    this.key = key
    this.nodes = []
    this.current = true
    this.hoverPt = null


    let angle = TWO_PI / npoints;

    for (let a = 0; a < TWO_PI; a += angle) {

        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        this.nodes.push(new Node(sx, sy))

    }

    let sx = x + cos(0) * radius;
    let sy = y + sin(0) * radius;

    this.nodes.push(new Node(sx, sy))


    this.mouseMoved = function(x, y) {



        this.nodes.forEach(n => n.hover = false)
        this.nodes.forEach(n => n.selected = false)
        this.nodes.forEach(n => {

            let d = dist(mouseX, mouseY, n.x, n.y)

            if (d < n.radius) {

                n.hover = true

            }

        })

        console.log('check hover point')
        this.hoverPt = null

        for (var i = 0; i < this.nodes.length - 1; i++) {

            let a = this.nodes[i]
            let b = this.nodes[i + 1]

            let cpp = closestPolyLinePoint(x, y, a.x, a.y, b.x, b.y)
            let distance = dist(cpp.x, cpp.y, x, y)

            if (distance < 25) {

                this.hoverPt = {
                    x: cpp.x,
                    y: cpp.y
                }

                return


            }

        }

    }

    this.mousePressed = function() {

        this.nodes.forEach(n => n.selected = false)

        this.nodes.forEach(n => {

            let d = dist(mouseX, mouseY, n.x, n.y)

            if (d < n.radius) {

                n.selected = true
                return

            }

        })

    }

    this.mouseDragged = function() {


        this.hoverPt = null



        this.nodes.forEach(n => {

            if (n.selected) {
                n.x = mouseX
                n.y = mouseY
            }

        })


    }

    this.doubleClicked = function(x, y) {

        for (var i = 0; i < this.nodes.length - 1; i++) {

            let a = this.nodes[i]
            let b = this.nodes[i + 1]

            let cpp = closestPolyLinePoint(x, y, a.x, a.y, b.x, b.y)
            let distance = dist(cpp.x, cpp.y, x, y)

            if (distance < 10) {

                // this.nodes.forEach(n => n.hover = true)
                let node = new Node(cpp.x, cpp.y)
                node.hover = true
                this.nodes.insert(i + 1, node)
                return


            }

        }



    }


    this.display = function() {

        if (this.hoverPt) {
            noStroke()
            fill(colorScheme[this.key])
            circle(this.hoverPt.x, this.hoverPt.y, 12.5)
        }

        fill(0, 50)
        stroke(colorScheme[this.key])
        strokeWeight(6)
        beginShape();
        this.nodes.forEach(n => vertex(n.x, n.y))
        endShape(CLOSE)
        this.nodes.forEach(n => n.display())



    }

}


function Node(x, y) {

    this.dragged = false
    this.selected = false
    this.x = x
    this.y = y
    this.radius = 25
    this.show = true
    this.hover = false


    this.display = function() {

        noStroke()

        if (this.hover) {

            noFill()
            strokeWeight(3)
            stroke(0, 255, 0)
            circle(this.x, this.y, this.radius)

        }

        noStroke()
        fill(255, 0, 0)

        if (this.selected) {
            // noStroke()
            fill(0, 255, 0)

        }

        circle(this.x, this.y, this.radius / 2)

    }

    this.copy = function() {

        return new Node(this.x, this.y)

    }


}



function closestPolyLinePoint(px, py, x0, y0, x1) {

    function dotLineLength(x, y, x0, y0, x1, y1, o) {
        function lineLength(x, y, x0, y0) {
            return Math.sqrt((x -= x0) * x + (y -= y0) * y);
        }
        if (o && !(o = function(x, y, x0, y0, x1, y1) {
                if (!(x1 - x0)) return {
                    x: x0,
                    y: y
                };
                else if (!(y1 - y0)) return {
                    x: x,
                    y: y0
                };
                var left, tg = -1 / ((y1 - y0) / (x1 - x0));
                return {
                    x: left = (x1 * (x * tg - y + y0) + x0 * (x * -tg + y - y1)) / (tg * (x1 - x0) + y0 - y1),
                    y: tg * left - tg * x + y
                };
            }(x, y, x0, y0, x1, y1), o.x >= Math.min(x0, x1) && o.x <= Math.max(x0, x1) && o.y >= Math.min(y0, y1) && o.y <= Math.max(y0, y1))) {
            var l1 = lineLength(x, y, x0, y0),
                l2 = lineLength(x, y, x1, y1);
            return l1 > l2 ? l2 : l1;
        } else {
            var a = y0 - y1,
                b = x1 - x0,
                c = x0 * y1 - y0 * x1;
            return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
        }
    };
    for (var args = [].slice.call(arguments, 0), lines = []; args.length > 4; lines[lines.length] = {
            y1: args.pop(),
            x1: args.pop(),
            y0: args.pop(),
            x0: args.pop()
        });
    if (!lines.length)
        return {
            x: px,
            y: py
        };
    for (var l, i = lines.length - 1, o = lines[i],
            lower = {
                i: i,
                l: dotLineLength(px, py, o.x0, o.y0, o.x1, o.y1, 1)
            }; i--; lower.l > (l = dotLineLength(px, py,
            (o = lines[i]).x0, o.y0, o.x1, o.y1, 1)) && (lower = {
            i: i,
            l: l
        }));
    py < Math.min((o = lines[lower.i]).y0, o.y1) ? py = Math.min(o.y0, o.y1) :
        py > Math.max(o.y0, o.y1) && (py = Math.max(o.y0, o.y1));
    px < Math.min(o.x0, o.x1) ? px = Math.min(o.x0, o.x1) :
        px > Math.max(o.x0, o.x1) && (px = Math.max(o.x0, o.x1));
    Math.abs(o.x0 - o.x1) < Math.abs(o.y0 - o.y1) ?
        px = (py * (o.x0 - o.x1) - o.x0 * o.y1 + o.y0 * o.x1) / (o.y0 - o.y1) :
        py = (px * (o.y0 - o.y1) - o.y0 * o.x1 + o.x0 * o.y1) / (o.x0 - o.x1);
    return {
        x: px,
        y: py
    };
};


Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
};
