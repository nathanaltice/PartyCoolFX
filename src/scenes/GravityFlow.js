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
        // create a 💀 PARTICLE DEATH ZONE 💀
        this.deathZone = new Phaser.Geom.Circle(0, 0, 100)
        
        // init graphics to draw DEATH ZONE (in update)
        this.gfx = this.add.graphics()

        // set up particle emitter
        this.gravityEmitter = this.add.particles(centerX, centerY, 'cross', {
            angle: { min: 180, max: 360, }, // try adding steps: 1000 👍
            speed: { min: 10, max: 500, steps: 5000 },
            gravityY: 350,
            lifespan: 4000,
            quantity: 6,
            scale: { start: 0.1, end: 2 },
            tint: [ 0xffff00, 0xff0000, 0x00ff00, 0x00ffff, 0x0000ff ],
            deathZone: { type: 'onEnter', source: this.deathZone }
        })

        this.deathEmitter = this.add.particles(0, 0, 'cross', {
            speed: 50,
            scale: { start: 0.75, end: 0.1 },
            alpha: { start: 1, end: 0 },
            quantity: 250,
            lifespan: 750,
            frequency: -1,
            emitZone: { type: 'edge', source: this.deathZone, quantity: 250 },
            tint: 0xFFFF00
        })

        // add mouse move listener for movable death zone
        this.input.on('pointermove', (pointer) => {
            this.deathZone.x = pointer.x
            this.deathZone.y = pointer.y
        })
        // add mouse input listener to invert death zone type and fire particles
        this.input.on('pointerdown', (pointer) => {
            // toggle death zone
            this.gravityEmitter.deathZones[0].killOnEnter ? this.gravityEmitter.deathZones[0].killOnEnter = false : this.gravityEmitter.deathZones[0].killOnEnter = true 
            // fire death particles
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
        this.gfx.lineStyle(1, 0xFFFF00, 1)
        this.gfx.strokeCircleShape(this.deathZone)

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart()
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("gravitywellsScene")
        }
    }
}