var snake: Snake.Snake;

window.onload = function () {
    let DEBUG = true;
    snake = new Snake.Snake(DEBUG);
    snake.start();
    snake.loop();
}