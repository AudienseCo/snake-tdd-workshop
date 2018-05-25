const should = require('should');
const Snake = require('../src/model/Snake')
const Board = require('../src/model/Board')
const SnakeDirections = Snake.SnakeDirections

describe('Snake', () => { 
  context('when moving right', () => {
    const initialDirection = SnakeDirections.RIGHT
    it('moving to right does nothing', () => {
      const snake = new Snake({ initialDirection});
      should(snake.getDirection()).be.eql(SnakeDirections.RIGHT)
    })

    it('cannot move to left', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.LEFT);
      should(snake.getDirection()).be.eql(SnakeDirections.RIGHT)
    })

    it('can move to up', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.UP);
      should(snake.getDirection()).be.eql(SnakeDirections.UP)
    })
    it('can move to down', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.DOWN);
      should(snake.getDirection()).be.eql(SnakeDirections.DOWN)
    })
  })

  context('when moving left', () => {
    const initialDirection = SnakeDirections.LEFT

    it('moving to left does nothing', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.LEFT);
      should(snake.getDirection()).be.eql(SnakeDirections.LEFT)
    })

    it('cannot move to right', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.RIGHT);
      should(snake.getDirection()).be.eql(SnakeDirections.LEFT)
    })

    it('can move to up', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.UP);
      should(snake.getDirection()).be.eql(SnakeDirections.UP)
    })

    it('can move to down', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.DOWN);
      should(snake.getDirection()).be.eql(SnakeDirections.DOWN)
    })

  })

  context('when moving up', () => {
    const initialDirection = SnakeDirections.UP
    
    it('moving to up does nothing', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.UP);
      should(snake.getDirection()).be.eql(SnakeDirections.UP)
    })
    it('cannot move to down', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.DOWN);
      should(snake.getDirection()).be.eql(SnakeDirections.UP)
    })

    it('can move to left', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.LEFT);
      should(snake.getDirection()).be.eql(SnakeDirections.LEFT)
    })

    it('can move to right', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.RIGHT);
      should(snake.getDirection()).be.eql(SnakeDirections.RIGHT)
    })
  })

  context('when moving down', () => {
    const initialDirection = SnakeDirections.DOWN
    
    it('moving to down does nothing', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.DOWN);
      should(snake.getDirection()).be.eql(SnakeDirections.DOWN)
    })

    it('cannot move to up', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.UP);
      should(snake.getDirection()).be.eql(SnakeDirections.DOWN)
    })

    it('can move to left', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.LEFT);
      should(snake.getDirection()).be.eql(SnakeDirections.LEFT)
    })
    it('can move to right', () => {
      const snake = new Snake({ initialDirection });
      snake.setDirection(SnakeDirections.RIGHT);
      should(snake.getDirection()).be.eql(SnakeDirections.RIGHT)
    })
  })

  context('movement', () => {
    it('moves a point to right', () => {
      const initialPosition = [[2,1], [1,1]]
      const snake = new Snake({ 
        initialDirection: SnakeDirections.RIGHT,
        initialPosition
      });
      snake.move()
      should(snake.getPosition()).be.eql([[3,1], [2,1]])
    })

    it('moves a point to left', () => {
      const initialPosition = [[2, 1], [3, 1]]
      const snake = new Snake({
        initialDirection: SnakeDirections.LEFT,
        initialPosition
      });
      snake.move()
      should(snake.getPosition()).be.eql([[1, 1], [2, 1]])
    })

    it('moves a point to up', () => {
      const initialPosition = [[1, 2], [1, 3]]
      const snake = new Snake({
        initialDirection: SnakeDirections.UP,
        initialPosition
      });
      snake.move()
      should(snake.getPosition()).be.eql([[1, 1], [1, 2]])
    })

    it('moves a point to down', () => {
      const initialPosition = [[1, 2], [1, 1]]
      const snake = new Snake({
        initialDirection: SnakeDirections.DOWN,
        initialPosition
      });
      snake.move()
      should(snake.getPosition()).be.eql([[1, 3], [1, 2]])
    })
  })

  it('should stop the game when the head collides with the body', () => {
    const initialPosition = [[2, 2], [3, 2], [3, 1], [2, 1]]
    const snake = new Snake({
      initialDirection: SnakeDirections.UP,
      initialPosition
    });

    snake.move()

    should(snake.isAlive()).be.false();
  })

  it('increases the size when eats', () => {
    const initialPosition = [[2, 1], [1, 1]]
    const snake = new Snake({
      initialDirection: SnakeDirections.RIGHT,
      initialPosition
    });
    snake.eat()
    snake.move()
    should(snake.getPosition()).be.eql([[3, 1], [2, 1], [1, 1]])
  })
})

describe('Board', () => {

  const fakeSnake = (methods) => {
    const snake = new Snake({initialPosition: [[0,0]], initialDirection: SnakeDirections.RIGHT})
    snake.move = methods.move
    snake.eat = methods.eat
    if (methods.isAlive) snake.isAlive = methods.isAlive
    return snake
  }

  context('collisions', () => {

    it('detects collisions with the upper border', () => {
      const snake = fakeSnake({ move: function() { 
        this.position = [[0,-1]] 
      }})
      const width = 50
      const height = 50
      const board = new Board({ width, height, snake })
      board.update()
      should(board.hasCollision()).be.true()
    })

    it('detects collisions with the bottom border', () => {
      const width = 50
      const height = 50
      const snake = fakeSnake({
        move: function () {
          this.position = [[0, height]]
        }
      })
      const board = new Board({ width, height, snake })
      board.update()
      should(board.hasCollision()).be.true()
    })

    it('detects collisions with the right border', () => {
      const width = 50
      const height = 50
      const snake = fakeSnake({
        move: function () {
          this.position = [[width, 0]]
        }
      })
      const board = new Board({ width, height, snake })
      board.update()
      should(board.hasCollision()).be.true()
    })

    it('detects collisions with the left border', () => {
      const width = 50
      const height = 50
      const snake = fakeSnake({
        move: function () {
          this.position = [[-1, 0]]
        }
      })
      const board = new Board({ width, height, snake })
      board.update()
      should(board.hasCollision()).be.true()
    })
  })

  it('places an apple out of the snake\'s body', () => {
    const width = 2
    const height = 1
    const snake = fakeSnake({
      move: function () {
        this.position = [[0,0]]
      }
    })
    const board = new Board({ width, height, snake })
    board.update()
    should(board.getApplePosition()).be.eql([1,0])
  })

  it('detects when the snake eats', () => {
    const width = 2
    const height = 1
    let called = false
    const snake = fakeSnake({
      move: function () {
        this.position = [[1, 0]]
      },
      eat: function() {
        called = true
      }
    })
    const board = new Board({ width, height, snake })
    board.placeApple()
    board.update()
    should(called).be.true()

  })

  it('places a new apple when the snake eats', () => {
    const width = 2
    const height = 1
    let called = false
    const snake = fakeSnake({
      move: function () {
        this.position = [[1, 0]]
      },
      eat: function () {
        called = true
      }
    })
    const board = new Board({ width, height, snake })
    board.placeApple()
    board.update()
    should(board.getApplePosition()).be.eql([0, 0])
  })

  it('should not move if the snake is dead', () => {
    const width = 2
    const height = 1
    let called = false
    const snake = fakeSnake({
      move: function () {
        called = true
      },
      isAlive: function () {
        return false
      }
    })
    const board = new Board({ width, height, snake })
    board.update()
    should(called).be.false()
  })
})