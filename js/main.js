/*Game Logic

reset game
  -score = 0
  -no x's or o's (board reset)
  -player turn = null

let's play button
  on click:
  - randomly pick player
  - update text to _'s turn

if current player is X
 on click:
  - update square with same value as player (X)
  - checkWinner()
  - switch player turn
  - update text to O's turn

if current player is O
 on click:
  - update square with same value as player (O)
  - checkWinner()
  - switch player turn
  - update text to X's turn

check winner
 if value in box is same for 3 consec:
  - player wins
  - game over
*/

$(document).ready(function() {

/*--Variables--*/
var score;
var computerArr = [];
var computerChoice;
var currentPlayer;
var winner;
var gameOverStatus;
var catsGameStatus;
var compChoiceIdx;
var board = [null, null, null, null, null, null, null, null, null];

/*--Event Handlers--*/

  $('.box').on('click', function(evt) {
    makeMove(evt);
  });

  $('#start').on('click', function() {
    $('.box').removeClass('disabled');
    $('#start').text("Let's Play").attr('disabled', true);
    $('#reset').attr('disabled', false);
    resetGame();
    pickPlayer();
    openingMessage();
  });

  $('#reset').on('click', function() {
    $('#reset').attr('disabled', true);
    $('#start').attr('disabled', false);
;    resetGame();
  });

/*--Functions--*/

  function openingMessage() {
    $('#message').html("<h3 id='open-message' style='font-size:25px;' class='text-center'>You're " + currentPlayer + " <br>and you're up first!</h3>");
  };

  function playerMessage() {
    $('#message').html("<h3 class='text-center'>It's " + currentPlayer + "'s turn!</h3>");
  };

  function pickPlayer() {
    var randomNum = Math.floor((Math.random() * 2) + 1);
    if (randomNum === 1) {
      currentPlayer = 'X';
    } else if (randomNum === 2) {
      currentPlayer = 'O';
    }
  };

  function makeMove(evt) {
    var clickedEl = evt.target;
    var clickedElId = evt.target.id;
    if (currentPlayer === 'O') {
      board[clickedElId] = currentPlayer;
      $(clickedEl).text(currentPlayer).addClass('disabled');
    } else if (currentPlayer === 'X') {
      board[clickedElId] = currentPlayer;
      $(clickedEl).text(currentPlayer).addClass('disabled');
    }
    checkWinner();
    checkCats();
    if (gameOverStatus != true) {
      switchPlayer();
      playerMessage();
      $('.box').addClass('disabled');
      setTimeout(computerMove, 2000);
    }
  };

  function computerMove() {
    board.forEach(function(item, index) {
      if (item === null) {
        computerArr.push(index);
      }
    });
    compChoiceIdx = Math.floor((Math.random() * computerArr.length - 1) + 1);
    computerArr.forEach(function(item, index) {
      if (index === compChoiceIdx) {
        computerChoice = item;
      }
    });
    computerArr = [];
      board[computerChoice] = currentPlayer;
      $('#' + computerChoice).text(currentPlayer).addClass('disabled');
      checkWinner();
      checkCats();
      if (gameOverStatus != true) {
        $('.box').removeClass('disabled');
        switchPlayer();
        playerMessage();
      }
  };

  function switchPlayer() {
    if (currentPlayer === 'O') {
      currentPlayer = 'X';
    } else if (currentPlayer === 'X') {
      currentPlayer = 'O';
    }
  };

  function checkWinner(evt) {
    if (board[0] === currentPlayer && board[1] === currentPlayer && board[2] === currentPlayer) {
      winner = currentPlayer;
      gameOver();
    } else if (board[3] === currentPlayer && board[4] === currentPlayer && board[5] === currentPlayer) {
      winner = currentPlayer;
      gameOver();
    } else if (board[6] === currentPlayer && board[7] === currentPlayer && board[8] === currentPlayer) {
      winner = currentPlayer;
      gameOver();
    } else if (board[1] === currentPlayer && board[3] === currentPlayer && board[6] === currentPlayer) {
      winner = currentPlayer;
      gameOver();
    } else if (board[1] === currentPlayer && board[4] === currentPlayer && board[7] === currentPlayer) {
      winner = currentPlayer;
      gameOver();
    } else if (board[2] === currentPlayer && board[5] === currentPlayer && board[8] === currentPlayer) {
      winner = currentPlayer;
      gameOver();
    } else if (board[0] === currentPlayer && board[4] === currentPlayer && board[8] === currentPlayer) {
      winner = currentPlayer;
      gameOver();
    } else if (board[2] === currentPlayer && board[4] === currentPlayer && board[6] === currentPlayer) {
      winner = currentPlayer;
      gameOver();
    } else {
      winner = null;
    }
  };

  function winnerMessage() {
    $('#message h3').text("Player " + currentPlayer + " Wins!");
  }

  function catsMessage() {
    $('#message h3').text("Gah! Cat's game!");
  }

  function gameOver() {
    if (winner) {
      winnerMessage();
      gameOverStatus = true;
      $('#board').children().find('.box').addClass('disabled');
      $('#start').text('Play Again?').attr('disabled', false);
      $('#reset').attr('disabled', true);
    } else if (catsGameStatus) {
      catsMessage();
      gameOverStatus = true;
      $('#board').children().find('.box').addClass('disabled');
      $('#start').text('Play Again?').attr('disabled', false);
      $('#reset').attr('disabled', true);
    }
    //add to score
  };

  function resetGame() {
    $('#board').children().find('.box').removeClass('disabled');
    board = [null, null, null, null, null, null, null, null, null];
    winner = null;
    gameOverStatus = false;
    catsGameStatus = false;
    $('#message h3').text('');
    $('#board').children().find('.box').text('');
  };

  function checkCats() {
    var catsArr = [];
    for(var i = 0; i < board.length; i++) {
      if (board[i] != null) {
        catsArr.push(board[i]);
      }
    }
    if (catsArr.length === 9) {
        catsGameStatus = true;
        gameOver();
    }
  };

});
