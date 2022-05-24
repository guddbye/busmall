'use strict';

console.log('Hi.');

//***************** GLOBAL VARIABLES **********

let voteCount = 25;
let allProducts = [];


//***************** DOM REFERENCES **************

let productContainer = document.getElementById('product-container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');

let showResultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-list');

//***************** CONSTRUCTOR *****************

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;

  allProducts.push(this);
}


new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-Can');
new Product('wine-Glass');


//***************** HELPER FUNCTIONS/EXECUTABLE CODE ************


function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderImgs() {
  let productOneIndex = getRandomIndex();
  let productTwoIndex = getRandomIndex();
  let productThreeIndex = getRandomIndex();

  while (productOneIndex === productTwoIndex || productOneIndex === productThreeIndex || productTwoIndex === productThreeIndex) {
    productTwoIndex = getRandomIndex();
    productThreeIndex = getRandomIndex();
  }

  imgOne.src = allProducts[productOneIndex].photo;
  imgOne.alt = allProducts[productOneIndex].name;
  allProducts[productOneIndex].views++;

  imgTwo.src = allProducts[productTwoIndex].photo;
  imgTwo.alt = allProducts[productTwoIndex].name;
  allProducts[productTwoIndex].views++;

  imgThree.src = allProducts[productThreeIndex].photo;
  imgThree.alt = allProducts[productThreeIndex].name;
  allProducts[productThreeIndex].views++;

}

renderImgs();


//******************* EVENT HANDLERS *********************


function handleClick(event) {
  voteCount--;
  let imgClicked = event.target.alt;
  for (let i = 0; i < allProducts.length; i++) {
    if (imgClicked === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }

  renderImgs();
  if (voteCount === 0) {
    productContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults() {
  if (voteCount === 0) {
    for (let i = 0; i < allProducts.length; i++) {
      let liElement = document.createElement('li');
      liElement.textContent = `${allProducts[i].name} was shown ${allProducts[i].views} times and voted for ${allProducts[i].votes} times`;
      resultsList.appendChild(liElement);
    }
  }
}


//********************* EVENT LISTENERS *********************


productContainer.addEventListener('click', handleClick);
showResultsBtn.addEventListener('click', handleShowResults);