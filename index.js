const sketchContainer = document.getElementById("sketchContainer");
const allSketchDivs = document.getElementsByClassName("sketchDiv");
const clearButton = document.getElementById("clearButton");
const newButton = document.getElementById("newButton");
const divArray = [];

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

// skapar nytt board utifrån användarens önskemål om storlek
function makeNewBoard() {
    let side = prompt("Skriv in storlek");

    divArray.length = 0;

    for (let i = 0; i < side * side ; i++) {
        divArray.push(document.createElement("div"));
        divArray[i].setAttribute("class", "sketchDiv");
        sketchContainer.appendChild(divArray[i]);  
    }
    for (let i = 0; i < allSketchDivs.length; i++) {
        allSketchDivs[i].addEventListener("mouseover", colorChange);
    }
}

// Startar sidan med ett 4x4 grid
for (let i = 0; i < 16; i++) {
    divArray.push(document.createElement("div"));
    divArray[i].setAttribute("class", "sketchDiv");
    sketchContainer.appendChild(divArray[i]);
}

// Ger alla startrutor event listeners för klick så de ändrar färg
for (let i = 0; i < allSketchDivs.length; i++) {
    allSketchDivs[i].addEventListener("mouseover", colorChange);
}

// Kör respektive funktion vid knappklick
clearButton.addEventListener("click", clearAll);
newButton.addEventListener("click", makeNewBoard);


