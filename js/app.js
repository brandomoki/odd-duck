'use strict';

console.log('hello world');
//********************* Global variables *************************/

let totalRounds = 25;
let allOddDucks = [];
let duckNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

//********************** DOM Refrence ****************************/
let imgContainer = document.getElementById('img-container');

let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsButton = document.getElementById('show-results-btn');
// let resultsList = document.getElementById('results-list');

let canvasElement = document.getElementById('myChart');


//********************** LocalStorage continues


let retreivedDucks = localStorage.getItem('myDucks');
console.log('retreivedDucks', retreivedDucks);

let parsedDucks = JSON.parse(retreivedDucks);
console.log('parsed ducks>>>', parsedDucks);


//********************** Consructor Function *********************/

function OddDuck(name, photoTag = 'jpg'){
  this.name = name;
  this.photo = `img/${name}.${photoTag}`;
  this.votes = 0;
  this.views = 0;

  allOddDucks.push(this);

}





//************************ Object Creation ************************/

console.log('allOddDucks >>>>>>>', allOddDucks);

//*********************** Helper Function *********************** */

let productIndexArr = [];

function randomIndexGenerator(){
  return Math.floor(Math.random() * allOddDucks.length);

}





// duckArray();

function duckArray() {
  if(retreivedDucks){
    allOddDucks = parsedDucks;
  } else {
  
    for(let i=0; i < duckNames.length; i++){
      if(duckNames[i] === 'sweep'){
        new OddDuck(duckNames[i], 'png');
      } else {
        new OddDuck(duckNames[i]);
      }
    }
  }



  
}
duckArray();
function renderImg() {



  while(productIndexArr.length < 6){
    let randomNum = randomIndexGenerator();
    if(!productIndexArr.includes(randomNum)){
      productIndexArr.push(randomNum);
    }
  }

  // console.log(productIndexArr);

  let imgRenderOne = productIndexArr.shift();
  let imgRenderTwo = productIndexArr.shift();
  let imgRenderThree = productIndexArr.shift();

  // while(imgRenderOne === imgRenderTwo || imgRenderTwo === imgRenderThree || imgRenderOne === imgRenderThree){
  //   imgRenderTwo = randomIndexGenerator();
  //   imgRenderThree = randomIndexGenerator();
  // }


  imgOne.src = allOddDucks[imgRenderOne].photo;
  imgOne.alt = allOddDucks[imgRenderOne].name;
  imgOne.name = allOddDucks[imgRenderOne].name;
  allOddDucks[imgRenderOne].views++;

  imgTwo.src = allOddDucks[imgRenderTwo].photo;
  imgTwo.alt = allOddDucks[imgRenderTwo].name;
  imgTwo.name = allOddDucks[imgRenderTwo].name;
  allOddDucks[imgRenderTwo].views++;

  imgThree.src = allOddDucks[imgRenderThree].photo;
  imgThree.alt = allOddDucks[imgRenderThree].name;
  imgThree.name = allOddDucks[imgRenderThree].name;
  allOddDucks[imgRenderThree].views++;

}

renderImg();


//************************ Event Handler ************************* */

function handleClick(event){
  let imgClicked = event.target.name;
  console.dir(imgClicked);

  for(let i=0; i < allOddDucks.length; i++){
    if(imgClicked === allOddDucks[i].name){
      allOddDucks[i].votes++;
    }
  }

  totalRounds--;

  renderImg();

  if(totalRounds === 0){

    /*******************************local storage starts heere**********/
    //****************************step 1 stringify data the array allodduck

    let stringifiedDucks = JSON.stringify(allOddDucks);
    console.log('stringed ducks>>>', stringifiedDucks);

    //************************add to localStorage*******************
    localStorage.setItem('myDucks', stringifiedDucks);

    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleResults(){
  if(totalRounds === 0){
    renderMyChart();

    // for(let i = 0; i < allOddDucks.length; i++){
    //   let liElem = document.createElement('li');
    //   liElem.textContent = `${allOddDucks[i].name}, views: ${allOddDucks[i].views}, votes: ${allOddDucks[i].votes}`;
    //   resultsList.append(liElem);
    // }
    resultsButton.removeEventListener('click', handleResults);
  }
}

const ctx = document.getElementById('myChart').getContext('2d');
//***************************** Add display chart ************************** */

function renderMyChart(){
  let chartName = [];
  let chartVotes = [];
  let chartViews = [];


  for(let i = 0; i < allOddDucks.length; i++){
    chartName.push(allOddDucks[i].name);
    chartVotes.push(allOddDucks[i].votes);
    chartViews.push(allOddDucks[i].views);
  }





  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartName,
      datasets: [{
        label: '# of Views',
        data: chartViews,
        backgroundColor: [
          'purple',
          'purple',
          'purple',
          'purple',
          'purple',
          'purple'
        ],
        borderColor: [
          'yellow',
          'yellow',
          'yellow',
          'yellow',
          'yellow',
          'yellow'
        ],
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: chartVotes,
        backgroundColor: [
          'yellow',
          'yellow',
          'yellow',
          'yellow',
          'yellow',
          'yellow'
        ],
        borderColor: [
          'black',
          'black',
          'black',
          'black',
          'black',
          'black'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}
// renderMyChart();
// console.log(renderMyChart);
// const myChart = new Chart(canvasElement, myObj);

//**************************Event Listeners *********************** */

imgContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleResults);


