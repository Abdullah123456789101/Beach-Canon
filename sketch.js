let ball;
let angle;
let speed;
let gravity = 9.81;
let startX = 100, startY = 400;
let launched = false;
let launchTime;

function setup() {
    createCanvas(800, 500);
    angle = PI / 4; // 45 degrees
    speed = 50; // Initial speed in pixels per second
    ball = new Ball(startX, startY);
}

function draw() {
    background(220);
    
    // Draw the cannon
    push();
    translate(startX, startY);
    rotate(-angle);
    rect(0, -10, 40, 20);
    pop();
    
    // Launch and update ball motion
    if (launched) {
        let t = (millis() - launchTime) / 1000; // Time in seconds
        ball.update(t);
    }
    
    ball.display();
    
    // Show UI text
    fill(0);
    textSize(16);
    text(`Angle: ${(angle * 180 / PI).toFixed(1)}°`, 20, 20);
    text(`Speed: ${speed} px/s`, 20, 40);
    text("Press SPACE to launch", 20, 60);
}

function keyPressed() {
    if (key === ' ') {
        launched = true;
        launchTime = millis();
        ball.launch(speed, angle);
    }
}

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
    }
    
    launch(speed, angle) {
        this.vx = speed * cos(angle);
        this.vy = -speed * sin(angle);
    }
    
    update(t) {
        this.x = startX + this.vx * t;
        this.y = startY + this.vy * t + 0.5 * gravity * t * t;
    }
    
    display() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, 20, 20);
    }
}
