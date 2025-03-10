


document.addEventListener("DOMContentLoaded", function () { 
//the starting canvas with all warrior ability images
const sourceCanvas = document.getElementById("sourceCanvas"); 
const sourceCtx = sourceCanvas.getContext("2d"); 


  
//the images that will be used in the "game"
const images = [
"rotationImages/image1.png","rotationImages/image2.png","rotationImages/image3.png","rotationImages/image4.png","rotationImages/image5.png","rotationImages/image6.png","rotationImages/image7.png","rotationImages/image8.png","rotationImages/image9.png","rotationImages/image10.png","rotationImages/image11.png","rotationImages/image12.png","rotationImages/image13.png"]; 



//store images in the maps. 
let imagesMap = new Map();  

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
loadImages(); 
});
