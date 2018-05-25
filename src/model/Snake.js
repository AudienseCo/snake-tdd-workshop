module.exports = class Snake {

    constructor({ initialDirection, initialPosition } = {}) {
        this.direction = initialDirection
        this.position = initialPosition
        this.hasEaten = false
        this.hasCollision = false
    }

    getDirection() {
        return this.direction
    }

    setDirection(newDirection) {
        if (this.direction === SnakeDirections.LEFT && newDirection === SnakeDirections.RIGHT) return
        if (this.direction === SnakeDirections.RIGHT && newDirection === SnakeDirections.LEFT) return
        if (this.direction === SnakeDirections.UP && newDirection === SnakeDirections.DOWN) return
        if (this.direction === SnakeDirections.DOWN && newDirection === SnakeDirections.UP) return

        this.direction = newDirection
    }

    getPosition() {
        return this.position
    }

    getHead() {
        return this.position[0]
    }

    move() {
        const head = this.position[0];
        const x = head[0]
        const y = head[1]
        let newHead = []

        if (this.direction === SnakeDirections.LEFT) newHead = [x - 1, y]
        if (this.direction === SnakeDirections.RIGHT) newHead = [x + 1, y]
        if (this.direction === SnakeDirections.UP) newHead = [x, y - 1]
        if (this.direction === SnakeDirections.DOWN) newHead = [x, y + 1]

        this.checkBodyCollision(newHead)

        this.position.unshift(newHead)

        if (this.hasEaten) this.hasEaten = false
        else this.position.pop()
    }

    checkBodyCollision(newHead) {
        this.hasCollision = this.position.some(position => {
            return position[0] === newHead[0] && position[1] === newHead[1]
        })
    }

    isAlive() {
        return !this.hasCollision
    }

    eat() {
        this.hasEaten = true
    }
}

module.exports.SnakeDirections = SnakeDirections = {
    UP: Symbol(),
    DOWN: Symbol(),
    LEFT: Symbol(),
    RIGHT: Symbol()
}