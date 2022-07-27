


// get data out of local storage
let retreivedDucks = localStorage.getItem('myDucks');

console.log('retreivedDucks', retreivedDucks);

let parsedDucks = JSON.parse(retreivedDucks);

console.log('parsed ducks>>>', parsedDucks)







console.log('allOddDucksfromConstructo<<<<')

remove button click

//*******************************local storage starts heere**********


//****************************step 1 stringify data the array allodduck

let stringifiedDucks = JSON.stringify(allOddDucks);

console.log('stringed ducks>>>', stringifiedDucks);

//************************add to localStorage*******************
localStorage.setItem('myDucks', stringifiedDucks);

imgContainer.removeEventListener('click', handleClick);

