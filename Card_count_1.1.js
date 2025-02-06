/*
"""
Created on Sat Mar  9 15:57:10 2024

@author: dwalker

Ai Black Jack website
java

hit and stand fixed dealer plays a s17 game
"""
*/

let dealerCards = [];
let playerCards = [];
let canHit = true;
let cardsPlayed = 0;
let deck = [];

function buildDeck() {
    let decks = 1;
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    
    for (let i = 0; i < decks; i++) {
        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < values.length; j++) {
                deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
            }
        }
    }
}
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    //console.log(deck);
}

function startGame() {
    buildDeck();
    shuffleDeck();
    console.log(deck)
    let shown = deck.pop();
    cardsPlayed += 1;
    //let dealerCards = [];
    dealerCards.push(shown);
    let dealerShowSum = getValue(dealerCards);

    let hidden = deck.pop();
    dealerCards.push(hidden);
    cardsPlayed += 1;

    let cardImg = document.createElement("img");
    cardImg.src = "./cards/" + shown + ".png";

    document.getElementById("dealer-shown-sum").innerText = "" + dealerShowSum;
    document.getElementById("shown").src = "./cards/" + shown + ".png";

    //let playerCards = [];
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let cards = deck.pop();
        playerCards.push(cards);
        cardImg.src = "./cards/" + cards + ".png";
        document.getElementById("your_hidden"+i).src = "./cards/" + cards + ".png";
    }

    let PlayerSum = getValue(playerCards);
    document.getElementById("your-sum").innerText = "" + PlayerSum;
}

function startHand() {

    //console.log(deck);
    let cardImg = document.createElement("img");
    let shown = deck.pop();
    let hidden = deck.pop();
    cardImg.src = "./cards/" + shown + ".png";
    dealerCards.push(shown);
    let dealerShowSum = getValue(dealerCards);
    dealerCards.push(hidden);

    document.getElementById("dealer-shown-sum").innerText = "" + dealerShowSum;
    document.getElementById("shown").src = "./cards/" + shown + ".png";

    let yourSum
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        playerCards.push(card);
        cardImg.src = "./cards/" + card + ".png";
        document.getElementById("your_hidden" +i+1).append(cardImg);
    }
    yourSum = getValue(playerCards);
    document.getElementById("your-sum").innerText = yourSum;

}
function hit() {

    let dealerSum = getValue(dealerCards);
    let playerSum = getValue(playerCards);

    console.log(dealerCards);
    console.log(playerCards);

    if(playerSum > 21){
        document.getElementById("your-sum").innerText = "you busted";
        return
    }
    else{
        let card = deck.pop();
        playerCards.push(card);
        console.log(playerCards);
        let cardImg = document.createElement("img");
        cardImg.src = "./cards/" + card + ".png";
        document.getElementById("your-cards").append(cardImg);
        playerSum = getValue(playerCards);
        document.getElementById("your-sum").innerText = " "+ playerSum;

        if(playerSum > 21) {
            document.getElementById("your-sum").innerText = "you busted with " + playerSum;
            document.getElementById("hidden").src = "./cards/" + dealerCards[1] + ".png";
            document.getElementById("dealer-shown-sum").innerText = "" + dealerSum;
        }

        return
    }
}

function double(){
    hit()
}

function stay() {
    let dealerSum = getValue(dealerCards);
    let playerSum = getValue(playerCards);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + dealerCards[1] + ".png";

    while (dealerSum < 17) {
        let card;
        card = deck.pop();
        dealerCards.push(card);
        let cardImg = document.createElement("img");
        cardImg.src = "./cards/" + card + ".png";
        document.getElementById("dealer-cards").append(cardImg);
        dealerSum = getValue(dealerCards);

    }

    let message = "";
    if (playerSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //both you and dealer <= 21
    else if (playerSum == dealerSum) {
        message = "Tie!";
    }
    else if (playerSum > dealerSum) {
        message = "You Win!";
    }
    else if (playerSum < dealerSum) {
        message = "You Lose!";
    }

    document.getElementById("dealer-shown-sum").innerText = "" + dealerSum;
    document.getElementById("your-sum").innerText = "" + playerSum;
    document.getElementById("results").innerText = message;


}

/*
function test(){
    let hand = [];
    for (let i = 0; i < 5; i++) {
        let card = deck.pop();
        hand.push(card);
    }
    console.log(hand);
    getValue(hand);
}
*/

function getValue(Hand) {
    let HandValues = [];
    let AceCount = 0;
    let hand_total = 0;
    for (let i = 0; i < Hand.length; i++) {
        let data = Hand[i].split("-");
        HandValues.push(data[0])
    }
    for (let i = 0; i < Hand.length; i++) {
        if(HandValues[i] === 'J' || HandValues[i] === 'Q' || HandValues[i] === 'K') {
            HandValues[i] = '10';
        }
        if(HandValues[i] === 'A'){
            AceCount += 1;
            HandValues[i] = '11';
        }
    }
    const intHandValues = HandValues.map(str => parseInt(str, 10));
    for (let i = 0; i < intHandValues.length; i++) {
        hand_total = intHandValues[i] + hand_total;
    }
    while(hand_total > 21 && AceCount > 0){
        hand_total = hand_total - 10
        AceCount = AceCount - 1
    }
    //console.log(hand_total);
    return hand_total
}


