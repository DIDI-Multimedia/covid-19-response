console.log('app.js')



let express = require('express')
var pickle = require('pickle')
const fs = require('fs')


let app = express()
    // creates a new instance of express exported by the Express module:

let server = app.listen(3000)
    // Starts a UNIX socket and listens for connections on the given path. This method is identical to Node’s http.Server.listen().





app.use(express.static('public'))

let io = require('socket.io').listen(server);
// Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
// serve static content 
console.log('my socket server is running')
console.log('my node.js server is running')



io.sockets.on('connection',

    function(socket) {
        console.log("We have a new client: " + socket.id)
        socket.on('disconnect', function() {
            console.log("Client has disconnected");
        });
    })

let rawData = fs.readFileSync('../TWITTER/ae_eng_tweets_20200325-20200331.json')
var Sentiment = require('sentiment');
var sentiment = new Sentiment()

let tweets = JSON.parse(rawData)
let arr = Object.values(tweets)


let mentions = []
let filterTweets = []

arr.map(a => {

    let text = a['cc_text']
    let loc = a['cc_user_loc']

    if (!loc.includes('AE')) return

    if (text.length > 0) {

        a.sentiment = sentiment.analyze(a['text'])
        filterTweets.push(a)
    }

    text.forEach(country => {

        if (!mentions.includes(country)) {

            mentions.push(country)

        }

    })

})

// console.log(filterTweets)
// console.log(mentions)
//     // j = 0
//     // for (tweet in tweets){
//     // 	console.log(JSON.stringify(tweets[tweet],null,4))
//     // 	j++
//     // }

// console.log('done!')