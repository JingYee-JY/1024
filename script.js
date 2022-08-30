import Grid from "./Grid.js"
import Tile from "./Tile.js"
import {endGame} from "./Grid.js"

const gameBoard = document.getElementById("game-board")
let grid;
let win;
let swipe = false;
let startGame = false;
let seeingInstruction = false;

setupInput()

function setupInput() {
    window.control = control;
  }

export async function control() {
   if(startGame == true){
    console.log(startingX)
    console.log(movingX)
    if(startingX + 100 < movingX && movingX !== null && startingY + 100 > movingY && startingY-100 < movingY){
      console.log("right")
      if(!canMoveRight()){
        return
    }
    await moveRight()
    swipe = true;
    }
    else if(startingX-100 > movingX && movingX !== null && startingY + 100 > movingY && startingY-100 < movingY){
      console.log("left")
      if(!canMoveLeft()){
        return
    }
    await moveLeft()
    swipe = true;
    }
    if(startingY + 100 < movingY && movingY !== null && startingX + 100 > movingX && startingX-100 < movingX){
      console.log("down")
      if(!canMoveDown()){
        return
    }
    await moveDown()
    swipe = true;
    }
    else if(startingY-100 > movingY && movingY !== null){
      console.log("up")
      if(!canMoveUp()){
              return
          }
              await moveUp()
              swipe = true;
  }
  else if(swipe != true){
    console.log("f")
      return
  }
  grid.cells.forEach(cell => cell.mergeTiles(win))

  console.log(endGame)
  if(endGame == true){
    console.log("C")
    startGame = false;
  }

  const newTile = new Tile(gameBoard)

  grid.randomEmptyCell().tile = newTile
  setupInput()

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
      newTile.waitForTransition(true).then(() => {
        let delay = setTimeout(() => {
          lose.classList.add("overlay")
          lose.classList.remove("hide")
          startGame = false;
        }, 400);
      })
      return
    }
    swipe = false
    movingY = null;
    movingX = null;
  }
    }

function moveUp() {
    return slideTiles(grid.cellsByColumn)
  }
  
  function moveDown() {
    return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
  }
  
  function moveLeft() {
    return slideTiles(grid.cellsByRow)
  }
  
  function moveRight() {
    return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
  }
  
  function slideTiles(cells) {
    return Promise.all(
      cells.flatMap(group => {
        const promises = []
        for (let i = 1; i < group.length; i++) {
          const cell = group[i]
          if (cell.tile == null) continue
          let lastValidCell
          for (let j = i - 1; j >= 0; j--) {
            const moveToCell = group[j]
            if (!moveToCell.canAccept(cell.tile)) break
            lastValidCell = moveToCell
          }
  
          if (lastValidCell != null) {
            promises.push(cell.tile.waitForTransition())
            if (lastValidCell.tile != null) {
              lastValidCell.mergeTile = cell.tile
            } else {
              lastValidCell.tile = cell.tile
            }
            cell.tile = null
          }
        }
        return promises
      })
    )
  }

  function canMoveUp() {
    return canMove(grid.cellsByColumn)
  }  

  function canMoveDown() {
    return canMove(grid.cellsByColumn.map(column => [...column].reverse()))
  }  

  function canMoveLeft() {
    return canMove(grid.cellsByRow)
  }  

  function canMoveRight() {
    return canMove(grid.cellsByRow.map(row => [...row].reverse()))
  }  

  function canMove(cells) {
    return cells.some(group => {
        return group.some((cell, index) => {
            if (index === 0) return false
            if (cell.tile == null) return false
            const moveToCell = group[index - 1]
            return moveToCell.canAccept(cell.tile)
        })
    })
  }

  const startBtn = document.querySelector(".start");
  const startcontainer = document.querySelector(".start-container");
  const selectContainer = document.querySelector(".select-container")
  const easy = document.querySelector(".easy");
  const normal = document.querySelector(".normal");
  const hard = document.querySelector(".hard");
  const game = document.querySelector(".game");
  const condition = document.querySelector(".condition");
  const winPop = document.querySelector(".win-container");
  const lose = document.querySelector(".lose-container");
  const tryAgain = document.querySelectorAll(".again");

startBtn.addEventListener("click", () => {
  if(seeingInstruction == false){
    startcontainer.classList.add("hide");
    selectContainer.classList.remove("hide")
  }
})
easy.addEventListener("click", () => {
  selectContainer.classList.add("hide");
  game.classList.remove("hide");
  grid = new Grid(gameBoard)
  grid.randomEmptyCell().tile = new Tile(gameBoard)
  grid.randomEmptyCell().tile = new Tile(gameBoard)
  setupInput()
  win = 64;
  swipe = false;
  startGame = true;
  condition.innerHTML = `
  <img class="difficultyCondition" src="./img/easyGoal.png">`
})

normal.addEventListener("click", () => {
  selectContainer.classList.add("hide");
  game.classList.remove("hide");
  grid = new Grid(gameBoard)
  grid.randomEmptyCell().tile = new Tile(gameBoard)
  grid.randomEmptyCell().tile = new Tile(gameBoard)
  setupInput()
  win = 256;
  swipe = false;
  startGame = true;
  condition.innerHTML = `
  <img class="difficultyCondition" src="./img/normalGoal.png">`
})
hard.addEventListener("click", () => {
  selectContainer.classList.add("hide");
  game.classList.remove("hide");
  grid = new Grid(gameBoard)
  grid.randomEmptyCell().tile = new Tile(gameBoard)
  grid.randomEmptyCell().tile = new Tile(gameBoard)
  setupInput()
  win = 1024;
  swipe = false;
  startGame = true;
  condition.innerHTML = `
  <img class="difficultyCondition" src="./img/hardGoal.png">`
})

tryAgain.forEach((again) => {
  again.addEventListener("click", () => {
  console.log("again")
  removeTiles();
  removeTiles();
  removeTiles();
  removeTiles();
  removeTiles();
  removeTiles();
  removeTiles();
  removeTiles();
  removeTiles();
  startGame = false;
    gameBoard.style.setProperty("--grid-size", null)
    gameBoard.style.setProperty("--cell-size", `${0}vmin`)
    gameBoard.style.setProperty("--cell-gap", `${0}vmin`)
  game.classList.add("hide")
    winPop.classList.add("hide")
  lose.classList.add("hide")
  selectContainer.classList.remove("hide")
})
})

function removeTiles(){
  var parent = gameBoard;
  var child = parent.getElementsByClassName("cell")[0];
  var child2 = parent.getElementsByClassName("tile")[0]
  console.log(child);
  if(child == null ) return
  var removed2 = parent.removeChild(child);
  if(child2 == null) return
  var removed = parent.removeChild(child2);
}