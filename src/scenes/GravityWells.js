// to-do: four emitters, one at each corner
// mouse click to create gravity wells

class GravityWells extends Phaser.Scene {
    constructor() {
        super('gravitywellsScene')
    }

    // preload() {
    //     // load assets
    //     this.load.path = './assets/'
    //     this.load.image('cross', 'white_cross.png')
    // }

    create() {
        // init graphics
        this.gfx = this.add.graphics()

        // create line for particle emitter source
        let line = new Phaser.Geom.Line(0, 0, w, 0)

        // set up particle emitter
        //this.particleManager = this.add.particles('cross')
        this.lineEmitter = this.add.particles(0, 0, 'cross', {
            gravityY: 200,
            lifespan: 5000,
            scale: { start: 1, end: 0.1 },
            tint: [ 0xffff00, 0xff0000, 0x00ff00, 0x00ffff, 0x0000ff ],
            emitZone: { 
                type: 'edge', // also try 'random' for rain-like effect 🌈
                source: line, 
                quantity: 100, 
                yoyo: true,
            }
        })

        // add mouse input listener to create gravity well(s)
        this.input.on('pointerdown', (pointer) => {
            // create gravity well
            // "The force applied is inversely proportional to the square of the distance from the particle to the point, in accordance with Newton's law of gravity."
            this.lineEmitter.createGravityWell({
                x: pointer.x,
                y: pointer.y,
                power: 3,       // strength of gravitational force (larger = stronger)
                epsilon: 100,   // min. distance for which gravitational force is calculated
                gravity: 100    // gravitational force of this well (creates "whipping" effect) [also try negatives!]
            })
            // draw visual representation of well
            this.gfx.lineStyle(1, 0xFFFF00, 1)
            let circle = new Phaser.Geom.Circle(pointer.x, pointer.y, 5)
            this.gfx.strokeCircleShape(circle)
        })

        // update instruction text
        document.getElementById('description').innerHTML = '<strong>GravityWells.js</strong><br>Mouse: Click  to create gravity well<br>S: Next Scene<br>R: Restart Scene'

        // keyboard input
        cursors = this.input.keyboard.createCursorKeys()

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
            this.scene.start("arcadeCollideScene")
        }
    }
}