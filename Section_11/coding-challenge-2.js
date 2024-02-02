// const calcAverageHumanAge = function(ages){
//     const hummanAges = ages.map(age => (age <= 2 ? 2* age: 16+ age*4))
//     const adults = hummanAges.filter(age => age >= 18);
//     console.log(hummanAges);
//     console.log(adults);

//     // const average = adults.reduce((acc,age) => acc+age, 0) / adults.length;
//     const average = adults.reduce((acc,age,i,arr)=> acc + age / arr.length, 0 );
//     return average
// }
//  const avg1=calcAverageHumanAge([5,2,4,1,15,8,3]);
//  const avg2 = calcAverageHumanAge([16,6,10,5,6,1,4]);
//  console.log(avg1,avg2);

var voters = [
{name:'Bob' , age: 30, voted: true},
{name:'Jake' , age: 32, voted: true},
{name:'Kate' , age: 25, voted: false},
{name:'Sam' , age: 20, voted: false},
{name:'Phil' , age: 21, voted: true},
{name:'Ed' , age:55, voted:true},
{name:'Tami' , age: 54, voted:true},
{name: 'Mary', age: 31, voted: false},
{name: 'Becky', age: 43, voted: false},
{name: 'Joey', age: 41, voted: true},
{name: 'Jeff', age: 30, voted: true},
{name: 'Zack', age: 19, voted: false}
];

var count = voters.reduce(function (acc, voter) {
    if (voter.age >= 20 && voter.age <= 30 && voter.voted) {
      return acc + 1;
    }
    return acc;
  }, 0);
  console.log('Số người vote có độ tuổi > 20 và nhỏ hơn 30 là:', count);