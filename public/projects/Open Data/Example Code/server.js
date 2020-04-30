console.log('example code')

const request = require('request');
const fs = require('fs')

let url = 'https://opendata.ecdc.europa.eu/covid19/casedistribution/json/'

let GCC = ['AE', 'JO', 'EG', 'IQ', 'SA', 'OM', 'BH', 'QA', 'KW']

request(url, function(error, response, body) {


    if (!error && response.statusCode == 200) {

        console.log('data was returned correctly')
        let importedJSON = JSON.parse(body)
        let records = importedJSON['records']

        for (id = 0; id < GCC.length; id++) {


            let country = GCC[id]
            let countryData = records.filter(a => a.geoId === country)

            let fileName = 'GCCDataset'+ country + '.txt'

            fs.writeFile(fileName, JSON.stringify(countryData, null, 4), (err) => {
                if (err) throw err;
                console.log('file saved!');
            });


        }


    }


})





// request('https://opendata.ecdc.europa.eu/covid19/casedistribution/json/', function(error, response, body) {

// if (!error && response.statusCode == 200) {


//     var importedJSON = JSON.parse(body);

//     GCC.forEach(country => {

//         console.log('filtering result results')
//         let result = importedJSON['records'].filter(a => a.geoId === country)
//         let filterResult = result.map(a => setEntry(a))
//         sortedData[country] = filterResult

//     })

// });


// function setEntry(a) {


//     let obj = {}
//     obj.day = a.day
//     obj.month = a.month
//     obj.deaths = a.deaths
//     obj.country = a.countriesAndTerritories

//     return obj

// }


// request('https://opendata.ecdc.europa.eu/covid19/casedistribution/json/', function(error, response, body) {

//     let sortedData = {}


//     GCC.forEach(country => {
//         sortedData[country] = null
//     })

//     if (!error && response.statusCode == 200) {

//         console.log('JSON loaded!')
//         var importedJSON = JSON.parse(body);

//         GCC.forEach(country => {

//             console.log('filtering result results')
//             let result = importedJSON['records'].filter(a => a.geoId === country)
//             let filterResult = result.map(a => setEntry(a))
//             sortedData[country] = filterResult

//         })

//         let start = {month:3, day:0}
//         let end ={month:4, day:27}
//         let days = 31 

//         let dateSort = []
//         for (month = start.month; month < end.month+1; month++){



//           for (day = 0; day < 32; day++){

//           	     	let arr = []

//         	for (country in sortedData){

//         		arr.push(sortedData[country].filter(a => checkDate(a.day,a.month,day,month)))

//         	}

//         	dateSort.push(arr)
//            }

//         }

//         function checkDate(d1,m1,d2,m2){

//         	if (d1 != d2 ) return false 
//         	if (m1 != m2) return false 
//         		return true 
//         }

//         console.log(JSON.stringify(dateSort,null,4))
//         fs.writeFile('sortedData.txt', JSON.stringify(dateSort,null,4), (err) => {
//     // throws an error, you could also catch it here
//     if (err) throw err;

//     // success case, the file was saved
//     console.log('Lyric saved!');
// });

//         // console.log(JSON.stringify(sortDate,null,4))


//     }

// })

// function setEntry(a) {


//     let obj = {}
//     obj.day = a.day
//     obj.month = a.month
//     obj.deaths = a.deaths
//     obj.country = a.countriesAndTerritories

//     return obj

// }