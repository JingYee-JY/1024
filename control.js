//import { control } from "./script";

var startingX, startingY, movingX, movingY;
//var script = require("./script");
  function touchstart(evt) {
    startingX = evt.touches[0].clientX
    startingY = evt.touches[0].clientY
  }
  function touchmove(evt) {
    movingX = evt.touches[0].clientX
    movingY = evt.touches[0].clientY
  } 
  async function handleInput() {
    control();
}