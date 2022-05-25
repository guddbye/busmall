'use strict';

console.log('Hi.');

// ***************** GLOBAL VARIABLES ********** //

let voteCount = 25;
let allProducts = [];

// ***************** DOM REFERENCES ************** //

let productContainer = document.getElementById('product-container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');

let showResultsBtn = document.getElementById('show-results-btn');
// eslint-disable-next-line no-unused-vars
let resultsList = document.getElementById('results-list');

let ctx = document.getElementById('my-chart').getContext('2d');

// ***************** CONSTRUCTOR ***************** //

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
new Product('water-can');
new Product('wine-Glass');

// ***************** HELPER FUNCTIONS/EXECUTABLE CODE ***************** //

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}


let tempArray = [];

function renderImgs() {

  while (tempArray.length < 6) {
    let randoNum = getRandomIndex();
    if (!tempArray.includes(randoNum)) {
      tempArray.push(randoNum);
    }
  }

  let productOneIndex = tempArray.shift();
  let productTwoIndex = tempArray.shift();
  let productThreeIndex = tempArray.shift();

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

// ******************** FUNCTION RENDER CHART ************** //

function renderChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productVotes.push(allProducts[i].votes);
    productViews.push(allProducts[i].views);
  }

  let myChartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
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
        label: '# of Views',
        data: productViews,
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
  };

  new Chart(ctx, myChartObj);
}

// ******************* RENDERS NEW IMAGE ******************* //

renderImgs();

// ******************* EVENT HANDLERS ********************* //


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
    renderChart();
    showResultsBtn.removeEventListener('click', handleShowResults);
  }
}

// ********************* EVENT LISTENERS ********************* //

productContainer.addEventListener('click', handleClick);
showResultsBtn.addEventListener('click', handleShowResults);
