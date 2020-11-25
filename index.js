const sketchContainer = document.getElementById("sketchContainer");
const allSketchDivs = document.getElementsByClassName("sketchDiv");
const clearButton = document.getElementById("clearButton");
const newButton = document.getElementById("newButton");
let divArray = [];

// Gör så rutorna i grid ändrar färg
function colorChange() {
    this.style.backgroundColor = "peachpuff";
}

// Ändrar alla rutors färg till vit 
function clearColor() {
    for (let i = 0; i < allSketchDivs.length; i++) {
        allSketchDivs[i].style.backgroundColor = "white";
    }
}

// Tar bort alla appended children från Sketch container
function clearDivs() {
    sketchContainer.innerHTML = " ";
}

// Läser in en siffra mellan 4 och 100 från användaren
function readNumber() {
    let number = 0;
    while (number < 4 || number > 100) {
        number = Number(prompt("Give your Etch-A-Sketch a size between 4 and 100:"));

        if (typeof number != "number" || Math.round(number) < 4 || Math.round(number) > 100) {
            number = Number(prompt("You have to give a whole number between 4 and 100:"));
        }
    }
    return number;
}

// skapar nytt board utifrån användarens önskemål om storlek
function makeNewBoard() {
    clearColor();
    clearDivs();
    divArray.length = 0;
    let side = readNumber();
    setDivs(side);  
}

function setDivs(side) {
    // skapar divar och ger dem klassen sketchDiv
    for (let i = 0; i < side * side; i++) {
        divArray.push(document.createElement("div"));
        divArray[i].setAttribute("class", "sketchDiv");
        sketchContainer.appendChild(divArray[i]);
    }

    // Ger alla startrutor event listeners för klick så de ändrar färg
    for (let i = 0; i < allSketchDivs.length; i++) {
        allSketchDivs[i].addEventListener("mouseover", colorChange);
    }

    divSize(side); // Sätter bredd/höjd på div:arna
}

// tilldelar varje div en storlek i procent
function divSize(side) {
    let size = 100 / side;
    let sizeString = size + "%";

    for (let i = 0; i < divArray.length; i++) {
        divArray[i].style.width = sizeString;
    }
}

// Startar sidan med ett 4x4 grid
setDivs(4);


// Kör respektive funktion vid knappklick
clearButton.addEventListener("click", clearColor);
newButton.addEventListener("click", makeNewBoard);

