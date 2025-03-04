class GravityFlow extends Phaser.Scene {
    constructor() {
        super('gravityflowScene')
    }

    preload() {
        // load assets
        this.load.path = './assets/'
        this.load.image('cross', 'white_cross.png')
    }

    create() {
        // create a 💀 PARTICLE DEATH ZONES 💀
        this.movingDeathZone = new Phaser.Geom.Circle(0, 0, 100)
        this.staticdeathZone = new Phaser.Geom.Rectangle(100, 50, 100, 100)
        
        // init graphics to draw DEATH ZONES (in update)
        this.gfx = this.add.graphics()

        // set up particle emitter
        this.gravityEmitter = this.add.particles(centerX, centerY, 'cross', {
            angle: { min: 180, max: 360, }, // try adding steps: 1000 👍
            speed: { min: 10, max: 500, steps: 5000 },
            gravityY: -350,
            gravityX: -300,
            lifespan: 4000,
            quantity: 6,
            scale: { start: 0.1, end: 2 },
            tint: [ 0xffff00, 0xff0000, 0x00ff00, 0x00ffff, 0x0000ff ],
            deathZone: [ this.staticdeathZone, this.movingDeathZone ]
        })

        this.deathEmitter = this.add.particles(0, 0, 'cross', {
            speed: 50,
            scale: { start: 0.75, end: 0.1 },
            alpha: { start: 1, end: 0 },
            quantity: 250,
            lifespan: 750,
            frequency: -1,
            emitZone: { type: 'edge', source: this.movingDeathZone, quantity: 250 },
            tint: 0xFFFF00
        })

        // add mouse move listener for movable death zone
        this.input.on('pointermove', (pointer) => {
            this.movingDeathZone.x = pointer.x
            this.movingDeathZone.y = pointer.y
        })

        // add mouse input listener to invert death zone type and fire particles
        this.input.on('pointerdown', (pointer) => {
            // toggle moving death zone
            this.gravityEmitter.deathZones[1].killOnEnter ? this.gravityEmitter.deathZones[1].killOnEnter = false : this.gravityEmitter.deathZones[1].killOnEnter = true 
            // fire death particles from moving death zone
            this.deathEmitter.emitParticleAt(pointer.x, pointer.y)
        })

        // update instruction text
        document.getElementById('description').innerHTML = '<strong>GravityFlow.js:</strong><br>Mouse: Move to control 💀 PARTICLE DEATH ZONE 💀 | Click to invert<br>S: Next Scene<br>R: Restart Scene'

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S')
        this.reload = this.input.keyboard.addKey('R')
    }

    update() {
        // draw DEATH ZONE
        this.gfx.clear()
        this.gfx.lineStyle(1, 0xFFFF00, 2)
        this.gfx.strokeCircleShape(this.movingDeathZone)
        this.gfx.lineStyle(1, 0x00FF00, 2)
        this.gfx.strokeRectShape(this.staticdeathZone)

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart()
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("gravitywellsScene")
        }
    }
}