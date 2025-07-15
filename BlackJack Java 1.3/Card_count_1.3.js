/*
"""
Created on thur March 20 3:00 pm

@author: dwalker

Black Jack website
java

hit and stand fixed dealer plays a s17 game
"""
*/

let dealerCards = [];
let playerCards = [];
let canHit = false;
let cardsPlayed = [];
let deck = [];
let bankroll = 1000;
let canBet = false;
let bet_in = false;
let total_bet = 0;
let can_stay = false;
let canDouble = false;


/*
Builds Deck as a list of num-suit
 */
function buildDeck() {
    let decks = 1;
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["C", "D", "H", "S"];
    
    for (let i = 0; i < decks; i++) {
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < values.length; j++) {
                deck.push(values[j] + "-" + suits[i]); //A-C -> K-C, A-D -> K-D
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
    return deck
    //console.log(deck);
}
//takes string of hand values and returns number result
function getValue(Hand) {
    let HandValues = [];
    let AceCount = 0;
    let hand_total = 0;
    for (let i = 0; i < Hand.length; i++) {
        let data = Hand[i].split("-");
        HandValues.push(data[0]);
    }
    /*
    #changes face cards to 10 and ace to 11 and adds one to ace count
     */
    for (let i = 0; i < Hand.length; i++) {
        if(HandValues[i] === 'J' || HandValues[i] === 'Q' || HandValues[i] === 'K') {
            HandValues[i] = '10';
        }
        if(HandValues[i] === 'A'){
            AceCount += 1;
            HandValues[i] = '11';
        }
    }
    /*
    splits hand from string to int for math and while loop to get proper value when ace is present
     */
    const intHandValues = HandValues.map(str => parseInt(str, 10));
    for (let i = 0; i < intHandValues.length; i++) {
        hand_total = intHandValues[i] + hand_total;
    }
    while(hand_total > 21 && AceCount > 0){
        hand_total = hand_total - 10;
        AceCount = AceCount - 1;
    }
    //console.log(hand_total);
    return hand_total;
}

//card count returns running count
function cardCount(cardsPlayed){
    let running_Count = 0;
    let card_Count = [];
    for (let i = 0; i < cardsPlayed.length; i++) {
        let data = cardsPlayed[i].split("-");
        card_Count.push(data[0]);
    }
    console.log(card_Count)
    //subtracting from the count
    for (let i = 0; i < card_Count.length; i++) {
        if (card_Count[i] === 'A') {
        running_Count -= 1;
        }
        else if (card_Count[i] === 'K') {
            running_Count -= 1;
        }
        else if (card_Count[i] === 'Q') {
            running_Count -= 1;
        }
        else if (card_Count[i] === 'J') {
            running_Count -= 1;
        }
        else if (card_Count[i] === '10') {
            running_Count -= 1;
        }

        //adding to the count
        else if (card_Count[i] === '6') {
            running_Count += 1;
        }
        else if (card_Count[i] === '5') {
            running_Count += 1;
        }
        else if (card_Count[i] === '4') {
            running_Count += 1;
        }
        else if (card_Count[i] === '3') {
            running_Count += 1;
        }
        else if (card_Count[i] === '2') {
            running_Count += 1;
        }
    }

    return running_Count;
}
//for html chips returns the
function bet_amount(bet){
    if (bet === -1){
        bankroll = bankroll + total_bet;
        total_bet = 0;
        document.getElementById("bankroll").innerText = "" + bankroll;
        document.getElementById("bet_number").innerText = "" + 0;
        bet_in = false;
        return total_bet;
    }
    total_bet = total_bet + bet;
    bankroll = bankroll - bet;
    document.getElementById("bankroll").innerText = "" + bankroll;
    document.getElementById("bet_number").innerText = "" + total_bet;
    console.log(total_bet);
    bet_in = true;
    return total_bet;
}
//for html for card count
function Stats() {
    console.log(cardsPlayed);
    let running_Count = cardCount(cardsPlayed);
    console.log(running_Count);
    document.getElementById("your-stats").innerText = "" + running_Count;
}
//this should be the function to shuffle a new shoe to play out of
function Build_Game() {
    buildDeck();
    shuffleDeck();
    document.getElementById("bankroll").innerText = "" + bankroll;
    if (bankroll > 0) {
            playHand();
    }
}


function playHand(){
    if (bet_in === true) {
        console.log("bet in")
        document.getElementById("results").innerText = "";
        canHit = true;
        dealerCards = [];
        let shownCard = deck.at(-1);
        cardsPlayed.push(shownCard);
        dealerCards.push(shownCard);
        let dealerShowSum = getValue(dealerCards);
        deck.pop();

        let hiddenCard = deck.at(-1);
        deck.pop();
        dealerCards.push(hiddenCard);
        document.getElementById("hidden").src = "./cards/BACK.png";

        console.log(dealerCards);

        let cardImg = document.createElement("img");
        cardImg.src = "./cards/" + shownCard + ".png";
        document.getElementById("dealer-shown-sum").innerText = "" + dealerShowSum;
        document.getElementById("shown").src = "./cards/" + shownCard + ".png";

        playerCards = [];
        for (let i = 0; i < 2; i++) {
            let cardImg = document.createElement("img");
            let cards = deck.pop();
            playerCards.push(cards);
            cardsPlayed.push(cards);
            cardImg.src = "./cards/" + cards + ".png";
            document.getElementById("your_hidden" + i).src = "./cards/" + cards + ".png";
        }
        let PlayerSum = getValue(playerCards);
        document.getElementById("your-sum").innerText = "" + PlayerSum;
    }
    //document.getElementById("hit").addEventListener("click", hit);
    if (bet_in === false){
        console.log("bet nigga")
        document.getElementById("hidden").src = "./cards/BACK.png";
        document.getElementById("shown").src = "./cards/BACK.png";
        document.getElementById("your_hidden0").src = "./cards/BACK.png";
        document.getElementById("your_hidden1").src = "./cards/BACK.png";
        removeElementsByClass('trash');
    }
}



// recently imported need to be edited
function hit() {
    if (canHit === false){
        console.log("no click yet, hit")
        return;
    }
    let dealerSum = getValue(dealerCards);
    let playerSum = getValue(playerCards);

    console.log(dealerCards);
    console.log(playerCards);

    if(playerSum > 21){
        document.getElementById("your-sum").innerText = "you busted with " + playerSum;
        document.getElementById("hidden").src = "./cards/" + dealerCards[1] + ".png";
        document.getElementById("dealer-shown-sum").innerText = "" + dealerSum;
        cardsPlayed.push(dealerCards[1]);
        can_stay = false;
    }
    else{
        let cards = deck.at(-1);
        //console.log(cards);
        cardsPlayed.push(cards);

        let card = deck.pop();
        playerCards.push(card);
        console.log(playerCards);

        let cardImg = document.createElement("img");
        cardImg.className = "trash";
        cardImg.src = "./cards/" + card + ".png";
        document.getElementById("your-cards").append(cardImg);

        playerSum = getValue(playerCards);
        document.getElementById("your-sum").innerText = " "+ playerSum;
    }
}

function stay(bet) {
    if (can_stay === false){
        console.log("no click yet, stay")
        return;
    }
    if(can_stay === true){
        let dealerSum = getValue(dealerCards);
        let playerSum = getValue(playerCards);

        //console.log(dealerCards);

        let card = dealerCards.at(-1);
        cardsPlayed.push(card);
        canHit = false;
        document.getElementById("hidden").src = "./cards/" + dealerCards[1] + ".png";

        while (dealerSum < 17) {
            let card;
            card = deck.pop();
            dealerCards.push(card);
            let cards = dealerCards.at(-1);
            cardsPlayed.push(cards);
            let cardImg = document.createElement("img");
            cardImg.className = "trash";
            cardImg.src = "./cards/" + card + ".png";

            document.getElementById("dealer-cards").append(cardImg);
            dealerSum = getValue(dealerCards);
        }
        results(dealerSum,playerSum,bet)
        console.log(dealerCards);
    }
}

function double() {
    if (canHit === false){
        console.log("no click yet, hit")
        return;
    }
    if (canDouble === false){
        console.log("no click yet, double")
        return;
    }
    let dealerSum = getValue(dealerCards);
    let playerSum = getValue(playerCards);

    console.log(dealerCards);
    console.log(playerCards);

    if(playerSum > 21){
        document.getElementById("your-sum").innerText = "you busted with " + playerSum;
        document.getElementById("hidden").src = "./cards/" + dealerCards[1] + ".png";
        document.getElementById("dealer-shown-sum").innerText = "" + dealerSum;
        cardsPlayed.push(dealerCards[1]);
        can_stay = false;
    }
    else{
        let cards = deck.at(-1);
        //console.log(cards);
        cardsPlayed.push(cards);

        let card = deck.pop();
        playerCards.push(card);
        console.log(playerCards);

        let cardImg = document.createElement("img");
        cardImg.className = "trash";
        cardImg.src = "./cards/" + card + ".png";
        document.getElementById("your-cards").append(cardImg);

        playerSum = getValue(playerCards);
        document.getElementById("your-sum").innerText = " "+ playerSum;
    }
}

//let result = 0;      //0=tie, 1=win, 2=lose
function results(dealerSum,playerSum,bet){
    console.log(bankroll);
    console.log(bet);

    let message = "";
    if (playerSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
        bankroll = bankroll + 2*bet;
    }
    //both you and dealer <= 21
    else if (playerSum === dealerSum) {
        message = "Tie!";
        bankroll = bankroll + bet;
    }
    else if (playerSum > dealerSum) {
        message = "You Win!";
        bankroll = bankroll + 2*bet;
    }
    else if (playerSum < dealerSum) {
        message = "You Lose!";
    }
    console.log("ummm hi")
    console.log(bankroll)

    bet = 0;
    document.getElementById("bankroll").innerText = "" + bankroll;
    document.getElementById("bet_number").innerText = "" + bet;
    document.getElementById("dealer-shown-sum").innerText = "" + dealerSum;
    document.getElementById("your-sum").innerText = "" + playerSum;
    document.getElementById("results").innerText = message;
    bet_in = false;
}

function test() {
    console.log("hi");
}


//some garbage that I found online to clear a class
function removeElementsByClass(className) {
    let elements = document.getElementsByClassName(className);
    while(elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function moveToBack() {
    document.getElementById("my-overlay").style.zIndex = "1"; // Moves it to a lower layer
}