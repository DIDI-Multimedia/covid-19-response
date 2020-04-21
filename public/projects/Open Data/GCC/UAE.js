let data =  {

    MAR: {

        20: 2,
        29: 1,
        30: 2,
        31: 1,

    },

    APR: {

        1: 2,
        3: 1,
        4: 1,
        6: 1,
        7: 1,
        9: 2,
        10: 2,
        11: 4,
        12: 2,
        13: 3,
        14: 3,
        15: 5,
        16: 2,
        17: 2,
        17: 2,

    },

    MAY: {},
    JUN: {},

}

console.log(data)

// console.log('Deaths on April 10 were ' + data['APR']['10'])

for (var month in data){

	for (var day in data[month]){

		console.log(month,day,data[month][day]+'d')


	}





}