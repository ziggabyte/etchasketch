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
function clearAll() {
    for (let i = 0; i < allSketchDivs.length; i++) {
        allSketchDivs[i].style.backgroundColor = "white";
    }
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
    clearAll();
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

    divSize(side);
}

function divSize(side) {
    let containerWidth = window.getComputedStyle(sketchContainer, null).getPropertyValue("width");
    containerWidth = Number(containerWidth.replace(/\D/g,''));

    for (let i = 0; i < divArray.length; i++) {
        divArray[i].style.width = Math.round(containerWidth/side);
        divArray[i].style.height = Math.round(containerWidth/side);
    }
}

// Startar sidan med ett 4x4 grid
setDivs(4);


// Kör respektive funktion vid knappklick
clearButton.addEventListener("click", clearAll);
newButton.addEventListener("click", makeNewBoard);


