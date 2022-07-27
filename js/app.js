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

//********************** Consructor Function *********************/

function OddDuck(name, photoTag = 'jpg'){
  this.name = name;
  this.photo = `img/${name}.${photoTag}`;
  this.votes = 0;
  this.views = 0;

  allOddDucks.push(this);

}





//************************ Object Creation ************************/



//*********************** Helper Function *********************** */

let productIndexArr = [];

function randomIndexGenerator(){
  return Math.floor(Math.random() * allOddDucks.length);

}



function duckArray() {
  for(let i=0; i < duckNames.length; i++){
    if(duckNames[i] === 'sweep'){
      new OddDuck(duckNames[i], 'png');
    } else {
      new OddDuck(duckNames[i]);
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

  console.log(productIndexArr);

  let imgRenderOne = productIndexArr.pop();
  let imgRenderTwo = productIndexArr.pop();
  let imgRenderThree = productIndexArr.pop();

  // while(imgRenderOne === imgRenderTwo || imgRenderTwo === imgRenderThree || imgRenderOne === imgRenderThree){
  //   imgRenderTwo = randomIndexGenerator();
  //   imgRenderThree = randomIndexGenerator();
  // }


  imgOne.src = allOddDucks[imgRenderOne].photo;
  imgOne.alt = allOddDucks[imgRenderOne].name;
  allOddDucks[imgRenderOne].views++;

  imgTwo.src = allOddDucks[imgRenderTwo].photo;
  imgTwo.alt = allOddDucks[imgRenderTwo].name;
  allOddDucks[imgRenderTwo].views++;

  imgThree.src = allOddDucks[imgRenderThree].photo;
  imgThree.alt = allOddDucks[imgRenderThree].name;
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
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: chartVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
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
console.log(renderMyChart);
// const myChart = new Chart(canvasElement, myObj);

//**************************Event Listeners *********************** */

imgContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleResults);


