module.exports = class Board {

    constructor({ snake, width, height }) {
        this.snake = snake
        this.width = width
        this.height = height
        this.apple = null
    }

    update() {
        if (this.snake.isAlive()) this.snake.move()
        
        if (this.snakeShouldEat()) {
            this.snake.eat()
            this.apple = null
        }
        if (!this.apple)
            this.placeApple()
    }

    snakeShouldEat() {
        const head = this.snake.getHead()
        return this.apple && head[0] === this.apple[0] && head[1] === this.apple[1]
    }

    placeApple() {
        const x = rand(0, this.width)
        const y = rand(0, this.height)
        const newApple = [x, y]
        const isInsideSnake = this.snake.getPosition().some(position =>
            position[0] === newApple[0] && position[1] === newApple[1])
        if (isInsideSnake) this.placeApple()
        else this.apple = newApple
    }

    hasCollision() {
        const head = this.snake.getHead()
        const x = head[0]
        const y = head[1]
        if (y < 0) return true
        if (y >= this.height) return true
        if (x >= this.width) return true
        if (x < 0) return true
        return false
    }

    getApplePosition() {
        return this.apple
    }
}

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
