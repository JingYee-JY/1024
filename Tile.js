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
            const backgroundColor = "#FFC2EE";
            const textColor = "#DD1E1E"
            this.#tileElement.style.setProperty("--background-color", backgroundColor)
            this.#tileElement.style.setProperty("--text-color", textColor)
        }
        //4
        if(power == 2){
            const backgroundColor = "#67CEFF";
            const textColor = "#019321"
            this.#tileElement.style.setProperty("--background-color", backgroundColor)
            this.#tileElement.style.setProperty("--text-color", textColor)
        }
        //8
        if(power == 3){
            const backgroundColor = "#FFA7A7";
            const textColor = "#EA07AA"
            this.#tileElement.style.setProperty("--background-color", backgroundColor)
            this.#tileElement.style.setProperty("--text-color", textColor)
        }
        //16
        if(power == 4){
            const backgroundColor = "#80EAA3";
            const textColor = "#026392"
            this.#tileElement.style.setProperty("--background-color", backgroundColor)
            this.#tileElement.style.setProperty("--text-color", textColor)
        }
        //32
        if(power == 5){
            const backgroundColor = "#FFC2EE";
            const textColor = "#019321"
            this.#tileElement.style.setProperty("--background-color",backgroundColor)
            this.#tileElement.style.setProperty("--text-color", textColor)
        }
        //64
        if(power == 6){
            const backgroundColor = "#67CEFF";
            const textColor = "#DD1E1E"
            this.#tileElement.style.setProperty("--background-color",backgroundColor)
            this.#tileElement.style.setProperty("--text-color", textColor)
        }
        //128
        if(power == 8){
            const backgroundColor = "#FFA7A7";
            const textColor = "#026392"
            this.#tileElement.style.setProperty("--background-color",backgroundColor)
            this.#tileElement.style.setProperty("--text-color", textColor)
        }
        //256
        if(power == 9){
            const backgroundColor = "#80EAA3";
            const textColor = "#EA07AA"
            this.#tileElement.style.setProperty("--background-color",backgroundColor)
            this.#tileElement.style.setProperty("--text-color", textColor)
        }
        //512
        if(power == 10){
            const backgroundColor = "#FFA7A7";
            const textColor = "#026392"
            this.#tileElement.style.setProperty("--background-color",backgroundColor)
            this.#tileElement.style.setProperty("--text-color", textColor)
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