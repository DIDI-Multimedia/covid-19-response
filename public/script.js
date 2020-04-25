// DEFINE JQUERY ELEMENTS
console.log('load JQUERY')

let toggle = true

const description = "In December 2019, a novel coronavirus strain (SARS-CoV-2) emerged in the city of Wuhan, China. This website documents the response of the Dubai Instute of Design and Innovation  (DIDI) to the global crisis."



$("#test").click(function() {

    if (toggle) {
        $("#testText").fadeOut();
        console.log('hide')

    } else {
        $("#testText").fadeIn();
        console.log('show')
    }

    toggle = !toggle



});

const projects = ["OPEN DATA INTERFACES", "DESIGN FOR EMERGENCY", "HACKING MANUFACTURE"]

const descriptions = [

	"This project uses interactive design, emerging technologies and data gathering, processing and visualization to articulate better sense-making tools and generate new insights about Covid-19 as a glocal challenge [global + local]", 
	"This project uses an agile approach to the quick mapping of problem-spaces and the design of fast solutions that can unblock the bottlenecks of current social infrastructures in the areas of health, transportation, and logistics.", 
	"This project curates open source resources and hacks for agile manufacturing of urgent solutions to Covid-19 that take into account the advantages of distributed manufacturing to address the urgent needs of healthcare professionals."

]

const teams = [

	"Shamma, Rafif, Nivea Noronha, Abdelrahman, Rana, Alyazia, Asma, Anika, Jawahir, Hussain D., Moza, Hala, Noora, Shouq, Akshat, Hussain A., Maryam H., Dalal",
	"Hoor Bakhit, Ahsan Murad, Baazim, Phillip, Shahzaadee, Fatima A, Maryam, Shamma A, Latifa Alsuwaidi, Meera, Mariam A, Aysha A, Arnav, Zeina, Mohammad, Yangkai",
	"Sana, Aditi, Noor, Nour, Agma, Waleed, Latifa Alkhouri, Valeria, Alexandra, Media, Zaver, Dalilah"

]



var BLOCKS_PER_CHART = 10;

function generateChart(chartContainer) {

    var text = "Hello World!";
    var blockDiv; // used in the for loop

    for (var i = 0; i < BLOCKS_PER_CHART; i++) {
        blockDiv = $("<div>").addClass("block").appendTo(container);
        $('<span>').text(text).appendTo(blockDiv);
    }
}

window.onload = function() {
    //Call .loadTemplate() on the target container
// var fullscreen = document.getElementById('play-fullscreen'),
// player = document.getElementById('player');

// fullscreen.addEventListener('click', function (e) {
//     if (~player.src.indexOf('?')) player.src += '&autoplay=1';
//     else player.src += '?autoplay=1';

//     var req = player.requestFullscreen
//         || player.webkitRequestFullscreen
//         || player.mozRequestFullScreen
//         || player.msRequestFullscreen;

//     req.call(player);
//     e.preventDefault();
// });



    var typed = new Typed('#message', {

        strings: ['<i>jQuery</i> Script.', description],
        typeSpeed: 0,


    });

    // $("#message").Loadingdotdotdot({
    //     "speed": 400,
    //     "maxDots": 4,
    //     "word": description
    // });

    var template = document.getElementById("template").text;
    var content = document.getElementById("target");

    for (i = 0; i < projects.length; i++) {


        var element = document.createElement("div"); // make a list item


        var a = document.getElementById("template").text;
        a = a.replace('project title', projects[i])
            .replace('_A', i + '_desc')
            .replace('_A1', i + '_desc_text')
            .replace('_B', i + '_team')
            .replace('_B1', i + '_team_text')
            .replace('_C', i + '_proj')
            .replace('Description Text', descriptions[i])
            .replace('Team Text', teams[i])




        element.innerHTML = a
        target.appendChild(element)

        let hidden = "#" + i + '_desc_text'
        $(hidden).hide()
         hidden = "#" + i + '_team_text'
        $(hidden).hide()


    }


    $(".link").click(function() {
        //your JS here
        console.log('click')
        let data = this.id.split('_')
        console.log(data)
   
        let element = "#" + data[0] + '_' + data[1] + '_text'


        if ($(element).is(":visible")){

        	$(element).fadeOut()

        } else {

        	$(element).fadeIn()

        }

    });




    // $('#target').loadTemplate(

    //   //Specify the template container (or file name of external template)
    //   $('#template'),

    //   //Specify the data to render
    //   {
    //     title: "Luke"
    //   }
    // );

}

