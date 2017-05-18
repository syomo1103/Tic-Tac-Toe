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
var optionsArr;
var bestArr;
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
    $('.box').addClass('disabled');
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
      setTimeout(function() {
        computerMove(evt);
      }, 1500)
    }
  };

  function computerMove(evt) {
    var narrowArr = [];
    board.forEach(function(item, index) {
      if (item === null) {
        computerArr.push(index);
      }
    });
    findOptions(evt);
    setOptions(narrowArr);
    pickOption(narrowArr);
    clearArrays(narrowArr);
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

  function findOptions(evt) {
    clickedElId = evt.target.id;
    optionsArr = [];
    bestArr = [];
    switch (clickedElId) {
    case '0':
      bestArr = [1, 3, 4];
      optionsArr = [2, 6, 8];
      break;
    case '1':
      bestArr = [0, 2, 4];
      optionsArr = [7];
      break;
    case '2':
      bestArr = [1, 4, 5];
      optionsArr = [0, 6, 8];
      break;
    case '3':
      bestArr = [0, 4, 6];
      optionsArr = [5];
      break;
    case '4':
      optionsArr = [0, 1, 2, 3, 5, 6, 7, 8];
      bestArr = optionsArr;
      break;
    case '5':
      bestArr = [2, 4, 8];
      optionsArr = [3];
      break;
    case '6':
      bestArr = [3, 4, 7];
      optionsArr = [0, 2, 8];
      break;
    case '7':
      bestArr = [6, 4, 8];
      optionsArr = [1];
      break;
    case '8':
      bestArr = [7, 4, 5];
      optionsArr = [0, 2, 6];
      break;
    }
  }

  function setOptions(narrowArr) {
    for (var i = 0; i < bestArr.length; i++) {
      for (var j = 0; j < computerArr.length; j++) {
        if (bestArr[i] === computerArr[j]) {
          narrowArr.push(bestArr[i]);
        }
      }
    }
    if (narrowArr.length === 0) {
      for (var i = 0; i < optionsArr.length; i++) {
        for (var j = 0; j < computerArr.length; j++) {
          if (optionsArr[i] === computerArr[j]) {
            narrowArr.push(optionsArr[i]);
          }
        }
      }
      console.log('bestArr results were empty');
    }
  };

  function pickOption(narrowArr) {
    compChoiceIdx = Math.floor((Math.random() * narrowArr.length - 1) + 1);
    narrowArr.forEach(function(item, index) {
      if (index === compChoiceIdx) {
        computerChoice = item;
      }
    });
  }

  function clearArrays(narrowArr) {
    computerArr = [];
    optionsArr = [];
    narrowArr = [];
  }

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
    } else if (board[0] === currentPlayer && board[3] === currentPlayer && board[6] === currentPlayer) {
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
