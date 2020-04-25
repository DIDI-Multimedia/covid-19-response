console.log('my node.js server is running')

// creating a server

let express = require('express')
let app = express()
let server = app.listen(3000)
const fs = require('fs')


app.use(express.static('public'))

console.log('my socket server is running')

// creating weather app... 





let filterData = parseRawData( fs.readFileSync('../TWITTER/ae_eng_tweets_20200325-20200331.json'))
filterData[0].sort((a, b) => b.date - a.date)
// console.log(JSON.stringify(filterData,null,4))


var io = require('socket.io')(server);

io.sockets.on('connection',

    // We are given a websocket object in our function
    function(socket) {

        console.log(' connected to client ')

        socket.on('get', function(data) {

        	console.log('transmit')

            io.emit('transmission', filterData)

        })


    })


function parseRawData(rawData) {

    var Sentiment = require('sentiment');
    var sentiment = new Sentiment()

    let tweets = JSON.parse(rawData)
    let arr = Object.values(tweets)


    let mentions = []
    let filterTweets = []

    arr.map(a => {

    	let b = {}

        let text = a['cc_text']
        let loc = a['cc_user_loc']

        if (!loc.includes('AE')) return

        if (text.length > 0) {



            a.sentiment = sentiment.analyze(a['text'])
            b.date = a.date
            b.loc = loc
            b.discussed = text
            b.score = a.sentiment.score

            filterTweets.push(b)
        }

        text.forEach(country => {

            if (!mentions.includes(country)) {

                mentions.push(country)

            }

        })

    })

    return [filterTweets,mentions]

}