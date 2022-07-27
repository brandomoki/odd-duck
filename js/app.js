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
let resultsList = document.getElementById('results-list');



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
    for(let i = 0; i < allOddDucks.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${allOddDucks[i].name}, views: ${allOddDucks[i].views}, votes: ${allOddDucks[i].votes}`;
      resultsList.append(liElem);
    }
    resultsButton.removeEventListener('click', handleResults);
  }
}


//**************************Event Listeners *********************** */

imgContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleResults);


