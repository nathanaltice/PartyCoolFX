class MovingEmitter extends Phaser.Scene {
    constructor() {
        super('movingemitterScene')
    }

    preload() {
        // load assets
        this.load.path = './assets/'
        this.load.image('cross', 'white_cross.png')
    }

    create() {
        // settings
        this.SPEED = 300
        this.SPEEDMIN = 50
        this.SPEEDMAX = 800
        this.DUMMYSPEED = 200

        // create dummy sprite for emitter to follow
        // note: add '5x5' as third parameter in line below if you want to see the dummy sprite
        this.dummy = this.physics.add.sprite(centerX, centerY, )
        this.dummy.body.setCollideWorldBounds(true)

        // create an emitter
        this.movingEmitter = this.add.particles(0, 0, 'cross', {
            speed: 50,
            scale: { start: 0.1, end: 1 },
            alpha: { start: 1, end: 0 },
            // higher steps value = more time to go btwn min/max
            lifespan: { min: 10, max: 7000, steps: 1000 }
        })
        // note: setting the emitter's initial position to 0, 0 seems critical to get .startFollow to work
        this.movingEmitter.startFollow(this.dummy, 0, 0, false)

        // update instruction text
        document.getElementById('description').innerHTML = '<strong>MovingEmitter.js</strong><br>Arrow keys: Move emitter<br>S: Next Scene<br>R: Restart Scene'

        // keyboard input
        cursors = this.input.keyboard.createCursorKeys()

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S')
        this.reload = this.input.keyboard.addKey('R')
    }

    update() {
        // control dummy sprite
        this.dummy.body.setVelocity(0)

        if(cursors.down.isDown) {
            this.dummy.body.setVelocityY(this.DUMMYSPEED)
        }
        if(cursors.up.isDown) {
            this.dummy.body.setVelocityY(-this.DUMMYSPEED)
        }
        if(cursors.right.isDown) {
            this.dummy.body.setVelocityX(this.DUMMYSPEED)
        }
        if(cursors.left.isDown) {
            this.dummy.body.setVelocityX(-this.DUMMYSPEED)
        }

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart()
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("gravityflowScene")
        }
    }
}