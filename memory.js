var nrOfMemoryCards = 36;
var iconsBatch = ["🐝", "🐛", "🦋", "🐷", "🐥", "🐢", "🐬", "🐭", "🦁", "🦊", "🐠", "🦔", "🐶", "🐗", "🐙", "🐑", "🐴", "🐼", "🐞", "🦀"];

var waitingForAnimationToFinish;
var selectedMemoryCardElement;
var nrOfCardsMatchesFound;
var nrOfTries;

//------------- MEMORY ------------//
function onLoaded() {
    setTimeout(initApp, 2000);
}

function initApp() {
    resetValues();
    initMemoryBoard();
    fadeHeaderAndTitle();
}

function resetValues() {
    waitingForAnimationToFinish = false;
    selectedMemoryCardElement = null;
    nrOfCardsMatchesFound = 0;
    nrOfTries = 0;
}

function initMemoryBoard() {
    var grid = document.querySelector(".grid");
    grid.innerHTML = null;
    var iconsList = getIconsList();
    for(var i = 0; i < nrOfMemoryCards; i++) {
        var gridItem = createGridItem(iconsList[i]);

        grid.appendChild(gridItem);
    }
}

function shuffle(list) {
    var j, x, i;
    for (i = list.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = list[i];
        list[i] = list[j];
        list[j] = x;
    }
}

function getIconsList() {
    var list = [];
    for(var i = 0; i < nrOfMemoryCards; i++) {
        list[i] = iconsBatch[i % (nrOfMemoryCards / 2)];
    }
    shuffle(list);
    return list;
}

function createGridItem(emoji) {
    var paragraph = document.createElement("p");
    paragraph.className = "centered no-select";
    paragraph.innerText = emoji;

    var memoryCard = document.createElement("div");
    memoryCard.className = "memory-card";
    memoryCard.onclick = function () {
        if (!waitingForAnimationToFinish && !memoryCard.classList.contains("show")) {
            revealCard(memoryCard);
            setTimeout(function() {
                checkCardMatch(memoryCard);
                checkEndCondition();
                waitingForAnimationToFinish = false;
            }, 500);
        }
    };
    memoryCard.appendChild(paragraph);

    var gridItem = document.createElement("div");
    gridItem.className = "item";
    gridItem.appendChild(memoryCard);

    return gridItem;
}

function revealCard(memoryCard) {
    memoryCard.classList.add("show");
    waitingForAnimationToFinish = true;
}

function checkCardMatch(memoryCard) {
    if (selectedMemoryCardElement == null) {
        selectedMemoryCardElement = memoryCard;
    }
    else if (selectedMemoryCardElement !== memoryCard) {
        
        var selectedCardIcon = selectedMemoryCardElement.children[0].innerText;
        var thisCardIcon = memoryCard.children[0].innerText;
        
        if (selectedCardIcon === thisCardIcon) {
            nrOfCardsMatchesFound++;
        } else {
            selectedMemoryCardElement.classList.remove("show");
            memoryCard.classList.remove("show");
        }

        nrOfTries++;
        selectedMemoryCardElement = null;
    }
}

function checkEndCondition() {
    if (nrOfCardsMatchesFound === nrOfMemoryCards / 2) {
        var paragraph = document.querySelector(".centered.information");
        paragraph.innerText = "All pairs found in " + nrOfTries + " tries";
        fadeHeaderAndTitle();
        setTimeout(initApp, 4000);
    }
}

function fadeHeaderAndTitle() {
    var header = document.querySelector("header");
    header.children[0].classList.toggle("fade");
    header.children[1].classList.toggle("fade");
    header.classList.toggle("fade");
}