let rawData = ['65 F', '25 M', '32 M', '25 M', '32 M']
let jsonData = []

// JSON.load('www.spain.com/data.json')

// for (i = 0; i < rawData.length; i++){

// 	let data = rawData[i]
// 	let item = data.split(" ") // item = ['65','F']
// 	let memorial = new Memorial( {  age:item[0], gender:item[1] })
// 	jsonData.push(memorial)

// }

let arr = rawData.map(a=>a.split(' '))
arr.forEach(a => jsonData.push(new Memorial( {  age:a[0], gender:a[1] })))


function Memorial( params ){

	this.age = null || params.age
	this.gender = null || params.gender 
	this.nationality = null || params.nationality

}