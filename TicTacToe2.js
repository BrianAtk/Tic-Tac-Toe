//$(document).ready(function()
//    {    alert('got here');}
//)

// set up array of possibilities
// A B C
// D E F
// G H I
///////////////////////
var possibilities = ['abc', 'def', 'ghi', 'adg', 'beh', 'cfi', 'aei', 'ceg'];
var computerChoices = [];
var playerChoices = [];
var playing = false;
var XorO = 'X';
var goFirst = false;
var gameOver = false;
$(".yourTurn").text("Press play button to begin");
$("#goFirstDot").hide();
$("#playerFirstMessage").hide();
testResults();
resetTiles();

$('#playAgainYes').click(function () {
    $("#playAgainPrompt").hide();
    reset();
    gameOver = false;
    if (playing) {
        if (!goFirst) {
            XorO = "O"
            computerMove();
            //return;
        } else {
            XorO = "X"
        }

    }
})

$('#playAgainNo').click(function () {
    $("#playAgainPrompt").hide();
})

//$('#playerGoesFirstOk').click(function () {
//    $("#playerFirstMessage").hide();
//})




function resetTiles() {
    $("#a").text("");
    $("#b").text("");
    $("#c").text("");
    $("#d").text("");
    $("#e").text("");
    $("#f").text("");
    $("#g").text("");
    $("#h").text("");
    $("#i").text("");
}


function testResults() {
    $("#testChoices").text(possibilities);
    $("#humanChoices").text(playerChoices);
    $("#computerChoices").text(computerChoices);
}

function readOnlyTiles() {
    if ((playing) && (!gameOver)) {
        return false;
    } else {
        return true;
    }
}

$("#play").click(function () {
    if (!playing) {
        gameOver = false;
        playing = true;
        $(".yourTurn").text("YOUR TURN");

        if (!goFirst) {
            XorO = 'O';
            computerMove();
        }
    }
});



$("#goFirst").click(function () {

    if (!goFirst) {
        //userCanWin();
        goFirst = true;
        $("#goLastDot").hide();
        $("#goFirstDot").show();
        XorO = 'X';
        reset();
    }
});

$("#goLast").click(function () {

    if (goFirst) {
        goFirst = false;
        $("#goLastDot").show();
        $("#goFirstDot").hide();
        reset();
        XorO = 'O';

        if (playing) {
            computerMove();
        }
    }
});


$("#reset").click(function () {
    gameOver = false;
    reset();
    if (playing) {
        if (!goFirst) {
            XorO = 'O';
            computerMove();
        }
    }

});



$("#a").click(function () {
    if (tileSelectable('a')) {
        $("#a").text(XorO);
        playerChoices.push('a');
        computerMove();
    }

});

$("#b").click(function () {
    if (tileSelectable('b')) {
        $("#b").text(XorO);
        playerChoices.push('b');
        computerMove();

    }

});

$("#c").click(function () {
    if (tileSelectable('c')) {
        $("#c").text(XorO);
        playerChoices.push('c');
        computerMove();
    }

});


$("#d").click(function () {
    if (tileSelectable('d')) {
        $("#d").text(XorO);
        playerChoices.push('d');
        computerMove();
    }


});

$("#e").click(function () {
    if (tileSelectable('e')) {
        $("#e").text(XorO);
        playerChoices.push('e');
        computerMove();
    }

});

$("#f").click(function () {
    if (tileSelectable('f')) {
        $("#f").text(XorO);
        playerChoices.push('f');
        computerMove();
    }

});

$("#g").click(function () {
    if (tileSelectable('g')) {
        $("#g").text(XorO);
        playerChoices.push('g');
        computerMove();
    }

});

$("#h").click(function () {
    if (tileSelectable('h')) {
        $("#h").text(XorO);
        playerChoices.push('h');
        computerMove();
    }

});

$("#i").click(function () {
    if (tileSelectable('i')) {
        $("#i").text(XorO);
        playerChoices.push('i');
        computerMove();
    }

});


function reset() {

    resetTiles();
    computerChoices = [];
    playerChoices = [];

    if (playing) {
        $(".yourTurn").text("YOUR TURN");
    }
}


function playerMatch(value, index, array) {
    if (playerChoices.indexOf(value) >= 0) {
        return true;
    } else {
        return false;
    }
}

function computerMatch(value, index, array) {
    if (computerChoices.indexOf(value) >= 0) {
        return true;
    } else {
        return false;
    }
}


function bothMatch(value, index, array) {
    if ((playerChoices.indexOf(value) < 0) && (computerChoices.indexOf(value) < 0)) {
        return true;
    } else {

        return false;
    }
}


function addSuggestedMoves(patternArray, suggestedMoves) {

    openTile = patternArray.filter(bothMatch);
    // return the tile we need to fill in    
    suggestedMoves = suggestedMoves.concat(openTile);
    return suggestedMoves;
}

function findComputerMatches(patternArray) {
    var match = [];
    for (var i = 0; i < patternArray.length; i++) {
        for (var j = 0; j < computerChoices.length; j++) {
            if (patternArray[i] == computerChoices[j]) {
                match += patternArray[i];
            }
        }
    }
    return match;
}

function checkPatterns(who) {
    // this is processed for both the computer and the player
    //  go through the options that are available, and see if they have 2 slots filled
    var computerMatches = [];
    var playerMatches = [];
    var suggestedMoves = [];
    var weWin = '';
    var blockThem = '';
    var draw = true;
    var youWin = false;
    // suggested move only pertain to the following conditions
    // 1. computer has 0 or 1 of the pattern and the player is not blocking it
    // 2. player has 0 or 1 of the pattern and the computer is not blocking it
    // 3. no one has any of the pattern.

    var openTile = [];
    var pattern = "";
    var patternArray = [];
    var remainingMoves = 0;
    for (var i = 0; i < possibilities.length; i++) {
        pattern = possibilities[i];
        patternArray = pattern.split('');
        //store items that match up for the players selections to playerMatches 

        playerMatches = patternArray.filter(playerMatch);
        //store items that match up for the computers selections to computerMatches 
        if (playerMatches.length === 3) {
            youWin = true;
            $(".yourTurn").text("You win!!!");
            break;
        }
        computerMatches = findComputerMatches(patternArray);

        // start of with draw set to true.  Then loop through until we see a case that shows that draw is false
        // if it never happens then draw is true and we declare a draw

        if (computerMatches.length === 0 || playerMatches.length === 0) {
            // if the number of available moves will not let either computer or player  get all 3 then it is a draw

            // there are a total of 9 moves
            remainingMoves = Math.round((9 - computerChoices.length - playerChoices.length) / 2);
            if ((computerMatches.length + remainingMoves >= 3) || (playerMatches.length + remainingMoves >= 3)) {
                draw = false;
            }

        }


        if (computerMatches.length === 2) {
            //if we have 2 of them see if the player has the 3rd
            if (playerMatches.length === 0) {
                // we win
                // we have 2 and player is not blocking
                // return back the spot we need to fill in

                openTile = patternArray.filter(function (value, index, array) { return computerChoices.indexOf(value) < 0; });
                // filter returns an array and we need a string
                weWin = openTile[0];
                // return the tile we need to fill in
                $('#' + openTile).text(XorO);
                //$(".yourTurn").text("I win!!! Press Reset to play again");
                $(".yourTurn").text("I win!!!");
                break;

            }
        } else {
            // if computer matches.length is 1 we are not concerned, they cant get that pattern
            // if computer matches.length is 0 we need to make sure they cant get all three on their next move
            if (computerMatches.length === 0) {
                if (playerMatches.length === 2) {
                    //  we need to block them or they will win their next move

                    openTile = patternArray.filter(function (value, index, array) { return playerChoices.indexOf(value) < 0; });
                    blockThem = openTile[0];
                    // return the tile we need to fill in
                    //$('#' + openTile).text(XorO);

                    $('#' + blockThem).text(XorO);
                    //break;
                    //return openTile;
                } else {
                    // they either have 0 or one in both cases we want to move this to the suggested moves array
                    suggestedMoves = addSuggestedMoves(patternArray, suggestedMoves);
                }
            } else {
                // computer matches.length === 1
                //player can either have 2, 1, or 0 matches                
                //if (playerMatches.length === 0) {
                // computer has one and the player has none
                // this is a suggested pattern
                //  we need to add the 2 empty slots to our suggested moves array
                if (playerMatches.length === 0) {
                    openTile = patternArray.filter(function (value, index, array) { return computerChoices.indexOf(value) < 0; });
                    suggestedMoves.concat(openTile);

                }
            }
        }

    }
    if (youWin) {
        return '-3'
    } else {
        if (draw) {
            //$(".yourTurn").text("Draw!! Press Reset to play again");
            $(".yourTurn").text("Draw!!");
            //return;
            openTile = '-1';
        } else {
            // there are no matching pairs

            // tally the suggestedMoves array and find out which slot was selected the most
            if (weWin) {
                // openTile = weWin;
                openTile = '-2';
            } else {
                if (blockThem) {
                    openTile = blockThem;
                } else {
                    openTile = makeSuggestedMove(suggestedMoves);
                }
            }

        }
        return openTile;
    }
}

function makeSuggestedMove(suggestedMoves) {
    //var one, two, three, four, five, six, seven, eight, nine = 0;
    // 
    var bestChoice = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var choice = 0;
    var index = 1;
    for (var i = 0; i < suggestedMoves.length; i++) {
        // 
        switch (suggestedMoves[i]) {
            case 'a':
                bestChoice[0]++;
                break;
            case 'b':
                bestChoice[1]++;
                break;
            case 'c':
                bestChoice[2]++;
                break;
            case 'd':
                bestChoice[3]++;
                break;
            case 'e':
                bestChoice[4]++;
                break;
            case 'f':
                bestChoice[5]++;
                break;
            case 'g':
                bestChoice[6]++;
                break;
            case 'h':
                bestChoice[7]++;
                break;
            default:
                //i
                bestChoice[8]++;
                break;
        }
    }

    // find largest

    for (var j = 0; j < bestChoice.length; j++) {
        if (bestChoice[j] > choice) {
            choice = bestChoice[j];
            //choice = j;
            index = j;
        }

    }

    // return the index of the array slot containing the greatest number of options
    return convertToLetter(index);
}


function switchX() {
    // switch from x to o as we switch from player to computer
    if (XorO == "X") {
        XorO = "O"
    } else {
        XorO = "X"
    }
}

function convertToLetter(index) {

    switch (index) {
        case 0:
            $("#a").text(XorO);
            return 'a';

        case 1:
            $("#b").text(XorO);
            return 'b';
        case 2:
            $("#c").text(XorO);
            return 'c';
        case 3:
            $("#d").trigger("click");
            return 'd';
        case 4:
            $("#e").text(XorO);
            return 'e';
        case 5:
            $("#f").text(XorO);
            return 'f';
        case 6:
            $("#g").text(XorO);
            return 'g';
        case 7:
            $("#h").text(XorO);
            return 'h';
        default:
            $("#i").text(XorO);
            //i
            return 'i';
    }
}


function seeIfPlayerWon() {
    var pattern = '';
    var patternArray = [];
    for (var i = 0; i < possibilities.length; i++) {
        pattern = possibilities[i];
        patternArray = pattern.split('');
        playerMatches = patternArray.filter(playerMatch);
        //store items that match up for the computers selections to computerMatches 
        if (playerMatches.length === 3) {
            youWin = true;
            $(".yourTurn").text("You win!!!");
            return true;
        }
    }
    return false;
}


//function userCanWin() {
//    //confirm("Please note: When the Computer starts the Player cannot win.  When the Player starts, the Player should be able to win.");
//    $("#playerFirstMessage").show();
//}

function askToPlayAgain() {
    gameOver = true;
    $("#playAgainPrompt").show();

}


function goFirstComputerMove() {
    // in this case the player is going first so the computer move will vary depending on what the user selects
    var playerFirstMove = playerChoices[0];

    switch (playerFirstMove) {
        case 'a':
            $('#i').text(XorO);
            return 'i';
        case 'c':
            $('#g').text(XorO);
            return 'g';

        case 'i':
            $('#a').text(XorO);
            return 'a';
        case 'g':
            $('#c').text(XorO);
            return 'c';

    }

}

function choseMove() {
    // if this is the first move we handle the move differently then if it is after that move
    if (computerChoices.length === 0) {
        // computer is making its first move
        if (goFirst && playerChoices.length === 1) {
            // the player has chosen to go first and has made his first move
            return goFirstComputerMove();
        } else {
            // the player has chosen not to go first and has not made his first move
            // this will be the computers first move
            $('#e').text(XorO);
            return "e";

        }
    } else {
        // not computers first move
        return checkPatterns();
    }

}

function computerMove() {
    // first confirm player did not win this turn
    if (seeIfPlayerWon()) {
        askToPlayAgain();

    } else {
        var newMove = '';
        // switch from x's to o's depending on if player goes first
        switchX();
        newMove = choseMove();
        if (typeof newMove == 'string' || newMove instanceof String) {

            if ((newMove == "-1") || (newMove == "-2") || (newMove == "-3")) {
                askToPlayAgain();

            } else {
                // not over yet
                computerChoices.push(newMove);
                switchX();
                testResults();
            }
        } else {
            alert("newMove not a string");
        }
    }


}

function tileSelectable(tile) {
    if (!readOnlyTiles()) {
        // search to see if selection in playerChoices
        if ((playerChoices.indexOf(tile) < 0) && (computerChoices.indexOf(tile) < 0)) {
            return true;
        } else {
            return false;
        }
        // search to see if selection in computerChoices
    } else {
        return false;
    }
}
