const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")

let ground, player, 
    bullets = []

const resize = () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
}

const init = () => {
    resize()
    ground = new Ground(innerHeight - 150)
    player = new Player(ground.altitude + 50)

    animate()
}

const clearScreen = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const animate = () => {
    clearScreen()
    ground.draw()
    player.draw()

    bullets.forEach(bullet => {
        bullet.update()
    })

    requestAnimationFrame(animate)
}

const handleMove = e => {
    switch(e.code) {
        case 'ArrowRight':
            player.moveRight()
            break;
        case 'ArrowLeft':
            player.moveLeft()
            break;
        case 'Space':
            player.shoot()
            break;
    }
}

class Ground {
    constructor(altitude) {
        this.altitude = altitude
    }

    draw() {
        ctx.fillStyle = "#8f8881"
        ctx.fillRect(0, this.altitude, innerWidth, innerHeight - this.altitude)
    }
}

class Player {
    constructor(altitude) {
        this.altitude = altitude
        this.leftOffset = 100
        this.width = 120
        this.height = 200
    }

    update() {

    }

    draw() {
        ctx.fillStyle = "#dbb288"
        ctx.fillRect(this.leftOffset, this.altitude - this.height, this.width, this.height)
    }

    moveRight() {
        this.leftOffset += 3
    }

    moveLeft() {
        this.leftOffset -= 3
    }

    shoot() {
        const bullet = new Bullet(this.leftOffset + this.width, this.altitude - this.height + 50)
        bullets.push(bullet)
    }
}

class Bullet {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 20
        this.height = 10
    }

    update() {
        const index = bullets.indexOf(this)
        if(this.x > innerWidth && index > -1) {
            bullets.splice(index, 1)
        }
        this.x += 5
        this.draw()
    }

    draw() {
        ctx.fillStyle = "#e6d59e"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

class Enemy {
    constructor() {
        
    }

    draw() {
        
    }
}

addEventListener('DOMContentLoaded', init)
addEventListener('resize', resize)
addEventListener('keydown', handleMove)