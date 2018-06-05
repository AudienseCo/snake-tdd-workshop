import { SnakeDirections } from './model/Snake'
import Snake from './model/Snake'
import Board from './model/Board'

const VELOCITY = 35
const canvas = document.getElementById('snake-game')
const ctx = canvas.getContext('2d');
const width = 30
const height = 30
const blockSize = canvas.width / width
const snake = new Snake({ initialPosition: [[1, 1], [0, 1]], initialDirection: SnakeDirections.RIGHT })
const board = new Board({ snake, width, height })

document.addEventListener('keydown', (e) => {
    switch(event.keyCode) {
        case 37: return snake.setDirection(SnakeDirections.LEFT)
        case 39: return snake.setDirection(SnakeDirections.RIGHT)
        case 38: return snake.setDirection(SnakeDirections.UP)
        case 40: return snake.setDirection(SnakeDirections.DOWN)
    }
})


function startGame() {
    let lastDraw = Date.now()
    
    function gameLoop() {
        const now = Date.now();
        const delta = now - lastDraw;

        if (delta > VELOCITY && !board.hasCollision()) {
            board.update()            
            draw()
            lastDraw = now
        }
        requestAnimationFrame(gameLoop)
        
    }
    requestAnimationFrame(gameLoop)
}

const drawBlock = (color, x, y) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize)
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const [head, ...tail] = snake.getPosition()
    const apple = board.getApplePosition()

    drawBlock('green', apple[0] * blockSize, apple[1] * blockSize)
    drawBlock('red', head[0] * blockSize, head[1] * blockSize)
    tail.forEach(point => {
        drawBlock('green', point[0] * blockSize, point[1] * blockSize)        
    })
}

startGame()