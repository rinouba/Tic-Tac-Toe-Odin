const startGameNow = document.querySelector("#startGame")

const Gameboard = (()=> {
    let board = ['', '', '', '', '', '', '', '', '']
    let currentMove = 'X'
    // numbers
    let tie = 0
    let isXwin = 0;
    let isOwin = 0;
    // make move
    const makeMove = (cell,index) =>{
      const ties = document.querySelector("#ties")
      if (board[index] === '') {
       const player = board[index] = currentMove;
        // Update the DOM to display the move
        // Switch to the next player
        //  Tie Game
        if (currentMove === 'X') 
        {
          currentMove = 'O'
          cell.innerText = player
          tie++
          isVictory()
        } else 
        {
          currentMove = 'X'
          cell.innerText = player
          tie++
          isVictory()
        }
        if(tie==9){
          alert("Tie Game !")
          ties.innerText = tie
        }

      }
    }
    // render 
    const render = () => {
      const x_o = document.querySelectorAll(".x-o")
      x_o.forEach(item => {
        item.innerText = ""
      });
      board = ['', '', '', '', '', '', '', '', '']
      tie = 0
    }
    // Put Names players from input into divs + update player name result
    const putNamesPlayers = (ply1,ply2,inpt1,inpt2) => {
      ply1.innerText = inpt1          
      ply2.innerText = inpt2
      // update
      const playerNameResult1 = document.getElementsByClassName("names-bottem")[0]
      const playerNameResult2 = document.getElementsByClassName("names-bottem")[2]
      playerNameResult1.innerHTML = `${inpt1} - X`
      playerNameResult2.innerHTML = `${inpt2} - O`
    }
    // start game
    const startGame = () => {
      const cells = document.querySelectorAll('.x-o');
      // get names values
      const playerName1 = document.querySelector("#playerName1")
      const playerName2 = document.querySelector("#playerName2")
      // get inputs values playerInput
      const playerInput1 = document.getElementsByClassName("playerInput")[0].value
      const playerInput2 = document.getElementsByClassName("playerInput")[1].value
      // Add event listeners to the grid cells to handle player moves
        if (playerInput1==="") {
          alert("Put Name Of Player 1 !")
        }else if (playerInput2===""){
          alert("Put Name Of Player 2 !")
        }
        else{      
          cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
              makeMove(cell,index)
            });
          })
          // put the name we get from inputs to name player
          putNamesPlayers(playerName1,playerName2,playerInput1,playerInput2)
        }
    }
    // restart game
    const restartGame = () => {
      location.reload()
    }
    // check for a who won a round
    const isVictory = () => {
      const linesToCheck = [
        // Rows
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Columns
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // Diagonals
        [0, 4, 8], [2, 4, 6]
      ];

      // inputs results 
      const player = document.querySelector("#player")
      const computer = document.querySelector("#computer")
      // check for winner
      for (let i = 0; i < linesToCheck.length; i++) {
        const [a,b,c] = linesToCheck[i];
        if (board[a]==="X"&&board[b]==="X"&&board[c]==="X") {
        alert("Player X Won!")
        isXwin++
        player.innerText = isXwin
        // render array 
        render()
        whoWon()
       }else if (board[a]==="O"&&board[b]==="O"&&board[c]==="O"){
        alert("Player O Won!")
        isOwin++
        computer.innerText = isOwin
        // render array 
        render()
        whoWon()
       }
      }
    }
    // check who won a game 
    const whoWon = () => {
      if (tie==3) {
        alert("No One Win! Restarting Game Again ..")
        restartGame()
      }else if (isXwin==3){
        alert(`Player X Win`)
        restartGame()
      }else if (isOwin==3){
        alert(`Player O Win`)
        restartGame()
      }
    }

  return{
    startGame: startGame,
    restartGame: restartGame,
  }
})();


// Restart Game
const restartGame = document.querySelector("#restartGame")
restartGame.addEventListener("click",Gameboard.restartGame)
// Start Game
startGameNow.addEventListener("click",Gameboard.startGame)




