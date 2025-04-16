//References that helped with canvas and images and some adjustments to the code.

//https://stackoverflow.com/questions/14757659/loading-an-image-onto-a-canvas-with-javascript

//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

//https://www.geeksforgeeks.org/how-to-display-images-from-an-array-in-javascript/

//I used this website for help with everything. It provided a refresher and additional insights into each. 
//https://www.w3schools.com/


document.addEventListener("DOMContentLoaded", function () { 

const sourceCanvas = document.getElementById("sourceCanvas"); 
const sourceCtx = sourceCanvas.getContext("2d"); 

const destinationCanvas = document.getElementById("destinationCanvas"); 
const destinationCtx = destinationCanvas.getContext("2d"); 


//Jquery DOM Manipulation 
let $allParas = $("p")
$allParas.addClass("design")
$("p strong").addClass("important")

//Jquery css object literal
$("body").css({
  "background-color": "#FAF9F6"
});


  //error and win messages variable 
let message = "";

//JSON with object and DOM manipulation.
let text = ""
  
const descriptionJSON =  '{"Ability1":"Tomahawk,","Ability2":"Infuriate,","Ability3":"Heavy Swing,","Ability4":"Maim,","Ability5":"Storms Eye,","Ability6":"Inner Release,","Ability7":"Inner Chaos,","Ability8":"Inner Focus,","Ability9":"Upheavel,","Ability10":"Onslaught,","Ability11":"Primal Rend,","Ability12":"Primal Ruination,","Ability13":"Fell Cleave,","Ability15":"Primal Wrath."}'
  
const descriptionObject = JSON.parse(descriptionJSON);
  
for(const value in descriptionObject) {
  text += descriptionObject[value] + " ";
}

document.getElementById("desc").innerHTML = text; 
  
//the images that will be used in the "game"
const images = [
"images/image1.png","images/image2.png","images/image3.png","images/image4.png","images/image5.png","images/image6.png","images/image7.png"]; 

//the order that the images need to be clicked in. 
const correctOrder = [0, 1, 2, 3, 4, 5, 6,];
let currentOrderIndex  = 0; 

//store images in the maps. 
let imagesMap = new Map();  
let clickedImages = new Map(); 

//load images into the imagesMap and call drawImages to display the loaded images. 
function loadImages() {
  let loadedCount = 0; 
  images.forEach(function(path, index) {
    const img = new Image(); 
    img.onload = function() {
      loadedCount++; 
      imagesMap.set(index, img); 
      if (loadedCount === images.length) {
        drawImages(); 
      }

    };
    img.src = path; 
  }); 
}

//draw the images onto the left canvas
function drawImages() {
  imagesMap.forEach(function(img, index) {
    sourceCtx.drawImage(img, 10 + (index % 7) * 55, 10 + Math.floor(index / 7) * 55, 50, 50); 

  }); 
  }

//reset game
function resetGame() {
  clickedImages.clear(); 
  destinationCtx.clearRect(0, 0, destinationCanvas.width, destinationCanvas.height);
drawImages(); 
  currentOrderIndex = 0;
   message = ""
}

//check to see if the images in the clicked images map match the correct sequence, which equals a win. 
function checkWin() {
  if (clickedImages.size === correctOrder.length) {
  message = "Congratulations! You win!";
   setTimeout(resetGame, 2000) 
  }
}

//leap motion rigged hands code. 
const controller = new Leap.Controller().use('riggedHand', {
  boneLabels: function(boneMesh, leapHand) {

  }
});

controller.on("frame", function(frame) {
  if (frame.valid && frame.gestures.length > 0) {
    frame.gestures.forEach(function(gesture) {
      if (gesture.type === "keyTap" || gesture.type ==="screenTap"){
        handleTapGesture(gesture);
      }
    });
  }
});

controller.on("gesture", function(gesture) {
  console.log("Gesture detected:", gesture);
});




controller.on("connect", function() {
  console.log("Leap Motion connected");
});

controller.connect();


//Leap motion device "keyTap" and "screenTap" draw the image in the destination canvas.
//Also, the checkWin function is called to check needed order with current order. 
//error messages/reset if order is wrong. 
function handleTapGesture(gesture) {
  const position = gesture.position;
  const x = position[0];
  const y = position[1];


  imagesMap.forEach(function(img, index) {
    const imgY = 10 + Math.floor(index / 7) * 35;
    const imgX = 10 + (index % 7) * 35;
   
    if  (x >= imgX && x <= imgX + 160 && y >= imgY && y <= imgY + 160 ) {
      if (index === correctOrder[currentOrderIndex]) {
        if (!clickedImages.has(index)) {
          destinationCtx.drawImage(img, 10 + currentOrderIndex * 55, 10, 50, 50); // Adjust destination position
          clickedImages.set(index, img);
          currentOrderIndex++;
          checkWin();
        } 
      } else {
        //uncommment these to actaully start the game. I took them out due to the leap motion device not being good for precision. 
        message = "Wrong sequence! Please try again.";
        setTimeout(resetGame, 2000);
      }
    }
  });

  document.getElementById("message").textContent = message;
}

loadImages();
});