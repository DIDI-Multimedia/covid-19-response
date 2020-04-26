// DEFINE JQUERY ELEMENTS
console.log('load JQUERY')

let toggle = true

const description = ["In December 2019, a novel coronavirus strain (SARS-CoV-2) emerged in the city of Wuhan, China.", " This website documents the response of the Dubai Instute of Design and Innovation  (DIDI) to the Corona Virus Pandemic."]



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

const subProjects = ['CoLive20', null, 'ProteC19']

const projectDescriptions = [

 'coming soon',
    "CoLive 20 is a digital platform that serves as an online interactive community and emotional data repository. During this unusual experience of social isolation, our service aims to connect community members through online activities. While promoting inclusion and connection in this era of social isolation, Colive-20 simultaneously serves as a digital museum for future reflection by documenting the emotional impacts of this new normal. The collected emotional data will also be useful for examining mental health impacts of the epidemic. Our solution is responding to the current mental health emergency by providing people an elevated method to form connections, empathize with others and encourage shared experiences in this time of crisis.",

    'coming soon'

]


const projectLinks = {

    CoLive20: 'https://www.youtube.com/embed/cte12oz9wBE',
    ProteC19: null

}



const projects = ["OPEN DATA INTERFACES", "DESIGN FOR EMERGENCY", "HACKING MANUFACTURE"]

const descriptions = [

    "This project uses interactive design, emerging technologies and data gathering, processing and visualization to articulate better sense-making tools and generate new insights about Covid-19 as a glocal challenge [global + local]",
    "This project uses an agile approach to the quick mapping of problem-spaces and the design of fast solutions that can unblock the bottlenecks of current social infrastructures in the areas of health, transportation, and logistics.",
    "This project curates open source resources and hacks for agile manufacturing of urgent solutions to Covid-19 that take into account the advantages of distributed manufacturing to address the urgent needs of healthcare professionals."

]

const teams = [
    "Aysha, Shamma, Rafif, Nivea Noronha, Abdelrahman, Rana, Alyazia, Asma, Anika, Jawahir, Hussain D., Moza, Hala, Noora, Shouq, Akshat, Hussain A., Maryam H., Dalal",

    "Amber, Hoor Bakhit, Ahsan Murad, Baazim, Phillip, Shahzaadee, Fatima A, Maryam, Shamma A, Latifa Alsuwaidi, Meera, Mariam A, Aysha A, Arnav, Zeina, Mohammad, Yangkai",

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


    $('#project').hide()

    // Call.loadTemplate() on the target container
    var fullscreen = document.getElementById('play-fullscreen'),
    player = document.getElementById('player');

    fullscreen.addEventListener('click', function(e) {
        if (~player.src.indexOf('?')) player.src += '&autoplay=1';
        else player.src += '?autoplay=1';

        var req = player.requestFullscreen ||
            player.webkitRequestFullscreen ||
            player.mozRequestFullScreen ||
            player.msRequestFullscreen;

        req.call(player);
        e.preventDefault();
    });



    var typed = new Typed('#message', {

        strings: ['<i>jQuery</i> Script.', description[0], description[1]],
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

        bol = false

        let element = "#" + data[0] + '_' + data[1] + '_text'

        if (data[1] === 'proj') {

            element = '#project'
            bol = true

        }


        if ($(element).is(":visible")) {

            $(element).fadeOut()

            if (bol) fadeOutArr(['#message', '#sketch-div'])


        } else {

            $(element).fadeIn()

            updateProject(parseInt(data[0]))

            if (bol) fadeInArr(['#message', '#sketch-div'])


        }

    });


    $("#project-close").click(function() {

        $('#project').fadeOut()
        $('#sketch-div').fadeIn()
        $('#message').fadeIn()


    });

    function updateProject(id) {

        console.log('update project: ', id)

        let key = subProjects[id]

        $("#project-title").text(key)
        $("#project-description").text(projectDescriptions[id])
        console.log('src:', projectLinks[key], key, projectLinks['CoLive20'])
        document.getElementById('player').src = projectLinks[key]

    }

    function fadeInArr(arr) {

        arr.forEach(id => $(id).fadeIn())

    }

    function fadeInArr(arr) {

        arr.forEach(id => $(id).fadeOut())

    }



}