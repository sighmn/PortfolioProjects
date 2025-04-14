
/*I used W3Schools as a reference. It helped tremendously with CSS properties and HTML elements and a bit with JS(function openCharBg) */
let GS1Convo = []; 
const initialImg = document.getElementById("initialImg");
const paraStory = document.getElementById("story");
const decisionpara = document.getElementById("decisionText");
const backgroundImg = document.getElementById("bg-image");
let gameState = 1;
let resetState = false;
let progState = false;
let index = 0;
let story = true;

//I Do NOT own the music/images used in this game. 
//The Images are from Bing AI and the Music is From SMT3: NOCTURNE owned by ATLUS"

//All buttons logic 
function buttons() {

   const audio = document.getElementById("audio");
   const playButton = document.getElementById("playButton");
   const prog = document.getElementById("progButton");
   const yesButton = document.getElementById("yesButton");
   const noButton = document.getElementById("noButton");
   const promptContainer = document.getElementById("prompt");
   const paraPrompt = document.getElementById("paraPrompt");
   const reset = document.getElementById("resetButton");
   const charBg = document.getElementById("charBg");
   const characterBg = document.getElementById("characterBg");


        playButton.addEventListener("click", () => {

            if (audio.paused) {
                audio.play();
                playButton.textContent = 'Pause Audio';
            } else {
                audio.pause();
                playButton.textContent = 'Play Audio';
            }

        });
       
        prog.addEventListener("click", () => {
            progState = true 
            promptContainer.style.display = "block";
            paraPrompt.innerText = "Progress The Story?";

        }); 
      
        reset.addEventListener("click", () => {
           resetState = true;
           promptContainer.style.display = "block";
           paraPrompt.innerText = "Reset The Game?";

        }); 

        let buttonClicked = 0;
        charBg.addEventListener("click", () => {
            buttonClicked++

            if(buttonClicked === 1) {
            characterBg.style.display = "block";
            }

            if(buttonClicked === 2) {
                characterBg.style.display = "none";
                buttonClicked = 0;
            }
        })

        yesButton.addEventListener("click", () => {
             promptContainer.style.display = "none";
             if(resetState) {
                location.reload(); 
            }

             if(progState) {
                gameState +=1;
                gameStateChange();
                progState = false;
            }
        });

        noButton.addEventListener("click", () => {
            promptContainer.style.display = "none";
        }); 
}
//Uses a switch to determine which function to call. 
function gameStateChange() {

    switch(gameState) {
    case 1 : 
    gameState1(); 
    break; 

    case 2 :  
    gameState2(); 
    break; 
}   

}

function gameState1() {
    initialImg.src = "Images/lyra.jpg";
    GS1Convo = [ 
    `Its the year 2543; you're a detective with the Intergalactic Bureau of Investigations.
You've been assigned case #45020. Orbital Ore Solutions mining freighter Lyra has gone silent.
Last registered in an isolated sector of deep space, its 2000-odd crew members current status is unknown.
Your mission is to uncover the mystery surrounding Lyra and restore contact`, 

`<br><br><span class="narrator">NARRATOR</span>: Lawrence, is a 43 year old special investigator. His AI assistant Titus briefs him about data its collected
concerning rumors regarding "cult like" behavior surrounding Lyra and its crew.`,
      
`<br><br><span class="titus">TITUS</span>: ETA 2 Minutes...Preparing Ship Auto Docking Parameter.`,
     
`<br><br><span class="vincent">VINCENT</span>: About damn time...before we dock, check for life signs.`,
     
`<br><br><span class="titus">TITUS</span>: Scanning....27 vitals confirmed.`,

`<br><br><span class="instructionStats">Click continue to venture forward!</span>` ];

    document.addEventListener("keypress", (event) => {

        if(event.code === "Space") {
            event.preventDefault(); 

            if(story) {
                paraStory.innerHTML += GS1Convo[index]; 
                index++; 

                if(index >= GS1Convo.length - 1) {
                    story = false; 
                    index = 0; 
                }
            }
        }
    })
}

function gameState2() {
    decision(); 
    decisionpara.innerHTML = `<ol><li>Left Path?</li><li>Right Path?</li></ol>`; 
    story = true; 
    initialImg.src = "Images/twoPaths.jpg"; 
    backgroundImg.style.backgroundImage = "url('Images/twoPaths.jpg')"; 
    paraStory.innerHTML = `<span class="instructionStats">Press Space To Continue Text.</span>`; 
    GS1Convo = [ 
`<br><br><span class="narrator">NARRATOR</span>: Vincent Manually lands his ship at the docking station.`,
      
`<br><br><span class="titus">TITUS</span>: Running Lyra diagnostics, jump drive failed, auto repair system failed, 50% loss of power...hmm strange.`,
     
`<br><br><span class="vincent">VINCENT</span>: Whats Strange?.`,
     
`<br><br><span class="titus">TITUS</span>: A large amount of power is being drawn to the center of the ship...Almost all of it.`,

`<br><br><span class="instructionStats">Click continue to venture forward!</span>`
];

    //the user presses SPACE and the dialogue/story appears
    document.addEventListener("keypress", (event) => {

        if(event.code === "Space") {
            event.preventDefault(); 

            if(story) {
                paraStory.innerHTML += GS1Convo[index]; 
                index++; 
 
                if(index > GS1Convo.length - 1) {
                    story = false;
                    index = 0; 
                }
            }
        }
    });
}

//character background info//As you progress through the story, this will update will new info. 
function openCharBg(event, CharName) {

    coverPicture = document.getElementById("coverPicture").style.display = "none";
    let i
    let tablinks = document.getElementsByClassName("tablinks");
    let tabcontent = document.getElementsByClassName("tabcontent");

        for (i = 0; i < tabcontent.length; i++) {    
            tabcontent[i].style.display = "none";
        }
        
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

    document.getElementById(CharName).style.display = "block";
    event.currentTarget.className += " active";

}

//deals with the decisions throughout the game 
function decision() {
    let submitDecision = document.getElementById("decisionButton");
    let inputDecision = document.getElementById("decision");

    submitDecision.addEventListener("click", () => {
        let userChoice = Number(inputDecision.value);
        switch(userChoice) {
            case 1: 
                initialImg.src = "Images/RightPath.jpg";
                backgroundImg.style.backgroundImage = "url('Images/RightPath.jpg')";
                inputDecision.disabled = true;
                break;
            case 2: 
                initialImg.src = "Images/LeftPath.jpg";
                backgroundImg.style.backgroundImage = "url('Images/LeftPath.jpg')";
                inputDecision.disabled = true ;
                break; 
            default: 
                alert("Please Choose A Valid Option!");
             
        }
    });
}

gameStateChange(); 
buttons(); 