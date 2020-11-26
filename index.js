"use strict";

const sketchContainer = document.getElementById("sketchContainer");
const allSketchDivs = document.getElementsByClassName("sketchDiv");
const clearButton = document.getElementById("clearButton");
const newButton = document.getElementById("newButton");
const randomColorButton = document.getElementById("randomColorButton");
const gradualColorButton = document.getElementById("gradualColorButton");
let colorFunction;
let divArray = [];

// tar bort existerande event listener
function removeLastMouseoverEvent(colorFunction) {
    for (let i = 0; i < divArray.length; i++) {
        divArray[i].removeEventListener("mouseover", colorFunction);
    }
}

// lägger till en event listener, tar in en färg-funktion sparad i variabeln colorFunction
function assignMouseoverEvent(colorFunction) {
    for (let i = 0; i < divArray.length; i++) {
        divArray[i].addEventListener("mouseover", colorFunction);
    }
}

// Gör så rutorna i grid ändrar till startfärg
function startColor() {
    this.style.backgroundColor = "peachpuff";
}

// Ändrar rutans färg till en random
function randomColor() {
    let color = (Math.random() * 0xfffff * 1000000).toString(16); // slumpar en hexkod
    color = "#" + color.slice(0, 6); // kortar den till rätt storlek o gör till string med # 
    this.style.backgroundColor = color;
}

// Ändrar rutans färg till 10% svart vid varje hover
function gradualColor() {
    this.style.opacity = Number(this.style.opacity) + 0.1;
    this.style.backgroundColor = "black";
}

// Ändrar alla rutors färg till vit 
function clearBoard() {
    for (let i = 0; i < allSketchDivs.length; i++) {
        allSketchDivs[i].style.backgroundColor = "#e7e4df";
    }
}

// Tar bort alla appended children från Sketch container
function removeAllDivs() {
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
    clearBoard();
    removeAllDivs();
    divArray.length = 0;
    let side = readNumber();
    makeDivs(side);
}

// ger divar en storlek utifrån antal rutor användaren skrivit in
function divSize(side) {
    let size = 100 / side;
    let sizeString = size + "%";

    for (let i = 0; i < divArray.length; i++) {
        divArray[i].style.width = sizeString;
    }
}

function makeDivs(side) {
    // skapar divar och ger dem klassen sketchDiv
    for (let i = 0; i < side * side; i++) {
        divArray.push(document.createElement("div"));
        divArray[i].setAttribute("class", "sketchDiv");
        sketchContainer.appendChild(divArray[i]);
    }

    assignMouseoverEvent(startColor); // ger dem event listeners så de ändrar färg

    divSize(side); // Sätter bredd/höjd på div:arna
}

// Startar sidan med ett 4x4 grid
makeDivs(4);


// Kör respektive funktion vid knappklick
clearButton.addEventListener("click", clearBoard);
newButton.addEventListener("click", makeNewBoard);
randomColorButton.addEventListener("click", () => { 
    clearBoard(); 
    removeLastMouseoverEvent(gradualColor); 
    assignMouseoverEvent(randomColor); });
gradualColorButton.addEventListener("click", () => { 
    clearBoard(); 
    removeLastMouseoverEvent(randomColor); 
    assignMouseoverEvent(gradualColor); })

