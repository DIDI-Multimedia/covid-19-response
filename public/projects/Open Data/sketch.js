console.log('sketch.js')


function setup() {

    createCanvas(800, 800)
    background(0)
    drawData()
    textAlign(CENTER)


}


function drawData() {

    console.log('hi')

    j = 0 


    for (var month in data) {

        noStroke()
        let y = height/4+j/5*height 
        fill(255)
        textSize(12)
        text(month,width/8,y)
        noFill()
           textSize(9)

        for (var day = 1; day < 31; day ++){

        // for (var day in data[month]) {

        //     // console.log(month, day, data[month][day] + 'd')
        //     console.log(day)
        //     console.log(month)
        //     // console.log(x)
            let x = width/4 + day/31*(width*0.66)




            if (data[month][day]){
                let r = data[month][day]*20
                circle(x, y, r)
                stroke(255,0,0)
                text(nf(day,2),x,y)
            } else {
                stroke(0,255,0)
                text(nf(day,2),x,y)
            }



        // }


        }


        j++

    }
}