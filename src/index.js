// write your code here
let ramenRepository
let ramenRepositoryLength = 0

document.addEventListener("DOMContentLoaded", () => {
   
  requestRamen();
  debugger
 
})

function requestRamen() 
{
  debugger
  console.log("requestRamen")
  fetch( "http://localhost:3000/ramens")
  .then (res => res.json())
 // .then (ramenData => console.log(ramenData))
  .then ( (ramenData) => {
    debugger
    ramenRepository = Array.from(ramenData)
    // ramenRepository = {...ramenData}
    ramenData.forEach((ramen) => {
      ramenRepositoryLength++;
      // Total hack here.  ramanRepositoryLength - 1 is the index into the JSON array of all things
      // ramen.  This will be used to index into the ramenRepository structure.
      renderImagesAndCreateListener(ramen, ramenRepositoryLength - 1);
      
    })
    createRamenInputFormListener();
  }) 
    
}

function createRamenInputFormListener()
{
  let newRamenForm = document.querySelector("form#new-ramen")
  newRamenForm.addEventListener("submit", (event) => {
    debugger
    event.preventDefault();
    // Pull out all the input values.
    let newName = newRamenForm.querySelector("input#new-name").value
    let newRestaurant = newRamenForm.querySelector("input#new-restaurant").value
    let newImage = newRamenForm.querySelector("input#new-image").value;
    let newRating = newRamenForm.querySelector("input#new-rating").value
    let newComment = newRamenForm.querySelector("textarea#new-comment").value
    // Create a new entry in ramenRepository
    ramenRepositoryLength++
    let newRamenEntry = {id : ramenRepositoryLength, name : newName, restaurant: newRestaurant, image:newImage, rating: newRating, comment: newComment};
    ramenRepository.push(newRamenEntry);
    renderImagesAndCreateListener(ramenRepository[ramenRepository.length-1], ramenRepository.length - 1)
    
  })
}

function renderImagesAndCreateListener(ramen, ramenRepositoryIndex) {

  // First - load a node for the new image
  // div id="ramen-menu"

  let insertionPoint = document.querySelector("div#ramen-menu");
  let image = document.createElement("img")  
  image.src = ramen.image;
  insertionPoint.appendChild(image)

  // 2nd - Create a listener
  image.addEventListener("click", (event) => {
    debugger

    let ramenIndex = ramenRepositoryIndex;
    let detailInsertionPoint = document.querySelector("div#ramen-detail");

    // Fill in the detail image
    let detailImage = detailInsertionPoint.querySelector("img");
    detailImage.src = event.target.src;
    detailImage.alt = ramenRepository[ramenIndex].name;

    // Fill in the detail name
    let detailName = detailInsertionPoint.querySelector("h2.name");
    detailName.innerText = ramenRepository[ramenIndex].name;

    // Fill in the detail restaurant
    let detailRestaurant = detailInsertionPoint.querySelector("h3.restaurant")
    detailRestaurant.innerText = ramenRepository[ramenIndex].restaurant;

    // Fill in the comment paragraph
    let commentParagraph = document.querySelector("p#comment-display");
    commentParagraph.innerText = ramenRepository[ramenIndex].comment
    // Fill in the rating span
    let ratingSpan = document.querySelector("span#rating-display");
    ratingSpan.innerText = ramenRepository[ramenIndex].rating

    debugger
    
  })
        
}
