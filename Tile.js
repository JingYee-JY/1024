export default class Tile{
    #tileElement
    #x
    #y
    #value
  
    constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
      this.#tileElement = document.createElement("div")
      this.#tileElement.classList.add("tile")
      tileContainer.append(this.#tileElement)
      this.value = value
    }

    get value() {
        return this.#value
    }

    set value(v) {
        this.#value = v
        this.#tileElement.textContent = v
        const power = Math.log2(v)
        //2
        if(power == 1){
            const backgroundColor = "#F2B17B";
            this.#tileElement.style.setProperty("--background-color", backgroundColor)
        }
        //4
        if(power == 2){
            const backgroundColor = "#C3D5BD";
            this.#tileElement.style.setProperty("--background-color", backgroundColor)
        }
        //8
        if(power == 3){
            const backgroundColor = "#DFB0B6";
            this.#tileElement.style.setProperty("--background-color", backgroundColor)
        }
        //16
        if(power == 4){
            const backgroundColor = "#DFB992";
            this.#tileElement.style.setProperty("--background-color", backgroundColor)
        }
        //32
        if(power == 5){
            const backgroundColor = "#F2B17B";
            this.#tileElement.style.setProperty("--background-color",backgroundColor)
        }
        //64
        if(power == 6){
            const backgroundColor = "#C3D5BD";
            this.#tileElement.style.setProperty("--background-color",backgroundColor)
        }
        //128
        if(power == 7){
            const backgroundColor = "#DFB0B6";
            this.#tileElement.style.setProperty("--background-color",backgroundColor)
        }
        //256
        if(power == 8){
            const backgroundColor = "#DFB992";
            this.#tileElement.style.setProperty("--background-color",backgroundColor)
        }
        //512
        if(power == 9){
            const backgroundColor = "#F2B17B";
            this.#tileElement.style.setProperty("--background-color",backgroundColor)
        }
        //1024
        if(power == 10){
            const backgroundColor = "#C3D5BD";
            this.#tileElement.style.setProperty("--background-color",backgroundColor)
        }
    }

    set x(value){
        this.#x = value
        this.#tileElement.style.setProperty("--x", value)
    }

    set y(value){
        this.#y = value
        this.#tileElement.style.setProperty("--y", value)
    }

    remove(){
        this.#tileElement.remove()
    }

    waitForTransition(animation = false){
        return new Promise(resolve => {
            this.#tileElement.addEventListener(
                animation ? "animationend" : "transitionend", resolve, {
                once: true,
            })
        })
    }
}