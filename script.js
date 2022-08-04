import Grid from "./Grid.js"
import Tile from "./Tile.js"

const gameBoard = document.getElementById("game-board")
let grid;
let win;
let swipe = false;
let startGame = false;

setupInput()

function setupInput() {
    window.control = control;
  }

export async function control() {
   if(startGame == true){
    if(startingX + 100 < movingX){
      console.log("right")
      if(!canMoveRight()){
        return
    }
    await moveRight()
    swipe = true;
    }
    else if(startingX-100 > movingX){
      console.log("left")
      if(!canMoveLeft()){
        return
    }
    await moveLeft()
    swipe = true;
    }
    if(startingY + 100 < movingY){
      console.log("down")
      if(!canMoveDown()){
        return
    }
    await moveDown()
    swipe = true;
    }
    else if(startingY-100 > movingY){
      console.log("up")
      if(!canMoveUp()){
              return
          }
              await moveUp()
              swipe = true;
  }
  if(swipe != true){
    console.log("f")
      return
  }
  grid.cells.forEach(cell => cell.mergeTiles(win))

  if(win.classList == "hide"){
    startGame = false;
  }

  const newTile = new Tile(gameBoard)
  console.log(swipe)
  grid.randomEmptyCell().tile = newTile
  setupInput()

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
      newTile.waitForTransition(true).then(() => {
        lose.classList.add("overlay")
        lose.classList.remove("hide")
      })
      return
    }
    swipe = false
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

  const startButton = document.querySelector(".startButton");
  const startContainer = document.querySelector(".start");
  const selectContainer = document.querySelector(".select");
  const easy = document.querySelector(".easy");
  const normal = document.querySelector(".normal");
  const hard = document.querySelector(".hard");
  const background = document.querySelector(".container")
  const startText = document.querySelector(".start-text");
  const selectionText = document.querySelector(".selection-text");
  const easyText = document.querySelector(".easy-text");
  const normalText = document.querySelector(".normal-text");
  const hardText = document.querySelector(".hard-text");
  const lose = document.querySelector(".lose");
  const tryAgain = document.querySelector(".tryAgainButton");
  const playAgain = document.querySelector(".PlayAgainButton");
  const cell = document.querySelectorAll(".cell");
  const winPop = document.querySelector(".win");

  startButton.addEventListener("click", () => {
    startContainer.classList.add("hide");
    startContainer.classList.remove("overlay");
    startText.classList.add("hide");
    selectionText.classList.remove("hide");
    selectContainer.classList.remove("hide");
    selectContainer.classList.add("overlay")
})
easy.addEventListener("click", () => {
  selectContainer.classList.add("hide");
  selectContainer.classList.remove("overlay");
  background.classList.add("hide");
  selectionText.classList.add("hide");
  easyText.classList.remove("hide");
  grid = new Grid(gameBoard)
  grid.randomEmptyCell().tile = new Tile(gameBoard)
  grid.randomEmptyCell().tile = new Tile(gameBoard)
  setupInput()
  win = 64;
  swipe = false;
  startGame = true;
})

normal.addEventListener("click", () => {
  selectContainer.classList.add("hide");
  selectContainer.classList.remove("overlay");
  background.classList.add("hide");
  selectionText.classList.add("hide");
  normalText.classList.remove("hide");
  grid = new Grid(gameBoard)
  grid.randomEmptyCell().tile = new Tile(gameBoard)
  grid.randomEmptyCell().tile = new Tile(gameBoard)
  setupInput()
  win = 256;
  swipe = false;
  startGame = true;
})
hard.addEventListener("click", () => {
  selectContainer.classList.add("hide");
  selectContainer.classList.remove("overlay");
  background.classList.add("hide");
  selectionText.classList.add("hide");
  hardText.classList.remove("hide");
  grid = new Grid(gameBoard)
  grid.randomEmptyCell().tile = new Tile(gameBoard)
  grid.randomEmptyCell().tile = new Tile(gameBoard)
  setupInput()
  win = 1024;
  swipe = false;
  startGame = true;
})

tryAgain.addEventListener("click", () => {
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
  normalText.classList.add("hide");
  hardText.classList.add("hide");
  easyText.classList.add("hide");
  lose.classList.remove("overlay")
  lose.classList.add("hide")
  background.classList.remove("hide");
  startContainer.classList.add("hide");
    startContainer.classList.remove("overlay");
    startText.classList.add("hide");
    selectionText.classList.remove("hide");
    selectContainer.classList.remove("hide");
    selectContainer.classList.add("overlay")
})

playAgain.addEventListener("click", () => {
  removeTiles();
  removeTiles();
  removeTiles();
  removeTiles();
  removeTiles();
  removeTiles();
  removeTiles();
  removeTiles();
  removeTiles();
    gameBoard.style.setProperty("--grid-size", null)
    gameBoard.style.setProperty("--cell-size", `${0}vmin`)
    gameBoard.style.setProperty("--cell-gap", `${0}vmin`)
  normalText.classList.add("hide");
  hardText.classList.add("hide");
  easyText.classList.add("hide");
  winPop.classList.remove("overlay")
  winPop.classList.add("hide")
  background.classList.remove("hide");
  startContainer.classList.add("hide");
    startContainer.classList.remove("overlay");
    startText.classList.add("hide");
    selectionText.classList.remove("hide");
    selectContainer.classList.remove("hide");
    selectContainer.classList.add("overlay")
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