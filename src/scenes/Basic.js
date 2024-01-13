class Basic extends Phaser.Scene {
    constructor() {
        super('basicScene')
    }

    init() {
        this.SPEED = 300
        this.SPEEDMIN = 50
        this.SPEEDMAX = 800
    }

    preload() {
        // load assets
        this.load.path = './assets/'
        this.load.image('pixel', 'white_pixel.png')
        this.load.image('5x5', '5x5_white.png')
    }

    create() {
        // create 'minimum viable' particle emitter
        this.add.particles(centerX, centerY, '5x5', { speed: this.SPEED })

        // add mouse input listener so we can click to create new emitters
        this.input.on('pointerdown', (pointer) => {
            this.add.particles(pointer.x, pointer.y, '5x5', {
                speed: Phaser.Math.Between(this.SPEEDMIN, this.SPEEDMAX),
                tint: Math.random() * 0xFFFFFF,
                alpha: Phaser.Math.FloatBetween(0.25, 1)
            })
        })

        // update instruction text (with delicious Vanilla JavaShrek)
        document.getElementById('description').innerHTML = '<strong>Basic.js:</strong><br>Click: Add new emitter(s)<br>S: Next Scene<br>R: Restart Scene'

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S')
        this.reload = this.input.keyboard.addKey('R')
    }

    update() {
        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart()
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("movingemitterScene")
        }
    }
}