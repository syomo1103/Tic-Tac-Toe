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

    // board.forEach(function(item, index) {
    //   if (item === null) {
    //     computerArr.push(index);
    //   }
    // });
    // compChoiceIdx = Math.floor((Math.random() * computerArr.length - 1) + 1);
    // computerArr.forEach(function(item, index) {
    //   if (index === compChoiceIdx) {
    //     computerChoice = item;
    //   }
    // });
    // computerArr = [];
    //checkWinner(evt);
    //checkCats(evt);
    // if (gameOverStatus != true) {
    //   switchPlayer();
    //   playerMessage();
    //   computerMove();
    // }
    // for(var i = 0; i < board.length; i++) {
    //   if (board[i] != null) {
    //     $('#reset').attr('disabled', false);
    //   };
    // }
  });

  $('#start').on('click', function() {
    $('#start').text("Let's Play").attr('disabled', true);
    resetGame();
    pickPlayer();
    playerMessage();
  });

  $('#reset').on('click', function() {
    $('#reset').attr('disabled', true);
    $('#start').attr('disabled', false);
;    resetGame();
  });
/*--Functions--*/

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
    //console.log(computerChoice); logs undefined
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
      setTimeout(computerMove, 2000);
      //computerMove();
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
    //if (currentPlayer === 'O') {
     // board[computerChoice] = 'X';
      board[computerChoice] = currentPlayer;
      $('#' + computerChoice).text(currentPlayer).addClass('disabled');
      //$('#' + computerChoice).text('X');
      console.log(board);
      checkWinner();
      checkCats();
      if (gameOverStatus != true) {
        switchPlayer();
        playerMessage();
      }
      //switchPlayer();
      //$(clickedEl).text(currentPlayer).addClass('disabled');
    // } else if (currentPlayer === 'X') {
    //   board[computerChoice] = 'O';
    //   $('#' + computerChoice).text('O');
    //   console.log(board);
      //$(clickedEl).text(currentPlayer).addClass('disabled');
    //}
  };

  function switchPlayer() {
    if (currentPlayer === 'O') {
      currentPlayer = 'X';
    } else if (currentPlayer === 'X') {
      currentPlayer = 'O';
    }
  };

  function checkWinner(evt) {
    console.log(currentPlayer);
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
