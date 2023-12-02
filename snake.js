class Snake {
  constructor({ x, y, size }) {
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 0;
    this.bodySize = size;
    this.body = [];

    this.body[0] = {
      x,
      y,
    };
    this.body[1] = {
      x: this.x += this.speedX * this.bodySize,
      y: this.y += this.speedY * this.bodySize,
    };
  }

  draw(context) {
    // for (let i = 0; i < this.body.length; i++) {
    //     const body = this.body[i];
    //     context.fillStyle = 'green';
    //     context.fillRect(body.x, body.y, this.bodySize, this.bodySize);
    // }
    for (let i = 0; i < this.body.length; i++) {
      let isHead = i == this.body.length - 1;
      let isTail = i == 0;

      let currentX = this.body[i].x;
      let currentY = this.body[i].y;

      let nextX = this.body[i + 1]?.x;
      let nextY = this.body[i + 1]?.y;

      let prevX = isTail ? currentX : this.body[i - 1].x;
      let prevY = isTail ? currentY : this.body[i - 1].y;

      let sx;
      let sy;

      if (isHead) {
        if (this.speedX < 0) {
          sx = 3;
          sy = 1;
        } else if (this.speedX > 0) {
          sx = 4;
          sy = 0;
        } else if (this.speedY < 0) {
          sx = 3;
          sy = 0;
        } else if (this.speedY > 0) {
          sx = 4;
          sy = 1;
        }
      } else if (!isHead && !isTail) {
        // for snake body

        if (currentX == nextX && prevX == currentX && currentY > nextY) {
          // up
          sx = 2;
          sy = 1;
        } else if (currentX == nextX && prevX == currentX && currentY < nextY) {
          // down
          sx = 2;
          sy = 1;
        } else if (currentX < nextX && currentX > prevX && currentY == nextY) {
          // right
          sx = 1;
          sy = 0;
        } else if (currentX > nextX && currentX < prevX && currentY == nextY) {
          // left
          sx = 1;
          sy = 0;
        } else if (currentX == nextX && currentX > prevX && currentY > nextY) {
          sx = 2;
          sy = 2;
        } else if (currentX == nextX && currentX > prevX && currentY < nextY) {
          sx = 2;
          sy = 0;
        } else if (currentX == nextX && currentX < prevX && currentY > nextY) {
          sx = 0;
          sy = 1;
        } else if (currentX == nextX && currentX < prevX && currentY < nextY) {
          sx = 0;
          sy = 0;
        } else if (
          currentX < nextX &&
          currentX == prevX &&
          currentY > prevY &&
          currentY == nextY
        ) {
          sx = 0;
          sy = 1;
        } else if (
          currentX < nextX &&
          currentX == prevX &&
          currentY < prevY &&
          currentY == nextY
        ) {
          sx = 0;
          sy = 0;
        } else if (
          currentX > nextX &&
          currentX == prevX &&
          currentY > prevY &&
          currentY == nextY
        ) {
          sx = 2;
          sy = 2;
        } else if (
          currentX > nextX &&
          currentX == prevX &&
          currentY < prevY &&
          currentY == nextY
        ) {
          sx = 2;
          sy = 0;
        }
      } else if (isTail) {
        if (currentX == nextX && currentY > nextY) {
          sx = 3;
          sy = 2;
        } else if (currentX == nextX && currentY < nextY) {
          sx = 4;
          sy = 3;
        } else if (currentX < nextX && currentY == nextY) {
          sx = 4;
          sy = 2;
        } else if (currentX > nextX && currentY == nextY) {
          sx = 3;
          sy = 3;
        }
      }

      context.drawImage(
        spriteImage,
        sx * 64,
        sy * 64,
        64,
        64,
        currentX,
        currentY,
        this.bodySize,
        this.bodySize
      );
    }
  }

  update() {
    let head = { ...this.body[this.body.length - 1] };

    this.body.shift();
    head.x += this.speedX * this.bodySize;
    head.y += this.speedY * this.bodySize;

    this.body.push(head);
  }

  setDirection(x, y) {
    this.speedX = x;
    this.speedY = y;
  }

  eat(food) {
    let head = this.body[this.body.length - 1];
    if (handleCollisions(head, food)) {
      return true;
    }

    return false;
  }

  grow() {
    let head = this.body[this.body.length - 1];
    this.body.push({
      x: head.x + this.speedX,
      y: head.y + this.speedY,
    });
  }

  endGame() {
    let head = this.body[this.body.length - 1];

    if (
      head.x > canvas.width - this.bodySize ||
      head.x < 0 ||
      head.y > canvas.height - this.bodySize ||
      head.y < 0
    ) {
      return true;
    }

    if (this.body.length > 3) {
      for (let i = 0; i < this.body.length-2; i++) {
        const bodyPart = this.body[i];
        
        if (bodyPart.x == head.x && bodyPart.y==head.y) {
          return true;
        }
        
      }
    }

    return false;
  }

  reset(){
    let x = randomInt(10, 20);
    let y = randomInt(10, 20);

    this.speedX = 1;
    this.speedY = 0;
    
    this.body = [];

    this.body[0] = {
      x,
      y,
    };
    this.body[1] = {
      x: x += this.speedX * this.bodySize,
      y: y += this.speedY * this.bodySize,
    };
  }
}
