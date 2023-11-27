// Partially adapted from Phaser 3 example 'death zone from arcade body.js'
// https://github.com/samme/phaser3-examples/blob/particles/public/src/game%20objects/particle%20emitter/death%20zone%20from%20arcade%20body.js
// Also adapted from: https://www.html5gamedevs.com/topic/37325-collision-between-sprites-and-particles/

class ArcadeCollide extends Phaser.Scene {
    constructor() {
        super('arcadeCollideScene')
    }

    create() {
        // create death zone source
        let bouncingBlockBody = {
            // contains(x, y) "Check to see if the Polygon contains the given x/y coordinates"
            // https://newdocs.phaser.io/docs/3.70.0/focus/Phaser.Geom.Polygon-contains
            contains: (x, y) => {
                // hitTest(x, y) "Tests if the coordinates are within this Body"
                // https://newdocs.phaser.io/docs/3.70.0/Phaser.Physics.Arcade.Body#hitTest
                let blockHit = block.body.hitTest(x, y)
                if (blockHit) {
                    collisionExplosion(x, y)
                }
                return blockHit
            }
        }

        // primary particle emitter
        this.add.particles(centerX, 200, '5x5', {
            speed: 300,
            gravityY: 400,
            lifespan: 4000,
            blendMode: 'ADD',
            deathZone: { 
                type: 'onEnter', 
                // custom source, see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/particles/#death-zone
                source: bouncingBlockBody 
            }
        })

        // particle/block collision explosion
        let collisionExplosion = (x, y) => {
            //console.log(`collisionExplosion at: ${x}, ${y}`)
            this.add.particles(x, y, '5x5', {
                tint: { start: 0xff0000, end: 0xffff00 },
                scale: { start: 0.75, end: 0.25 },
                speed: 50,
                lifespan: 2500,
                maxParticles: 10,
                blendMode: 'ADD'
            })
        }

        // create block sprite
        let block = this.physics.add.sprite(centerX, centerY, '5x5')
        block.setScale(5).setTint(0xFF0000)
        
        block.setGravity(0, 200)
        block.setVelocity(100, 200)
        block.setBounce(1, 1)
        block.setCollideWorldBounds(true)

        // update instruction text
        document.getElementById('description').innerHTML = '<strong>ArcadeCollide.js</strong><br>Just ~vibe~ with the collisions<br>S: Next Scene<br>R: Restart Scene'

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
            this.scene.start("animatedScene")
        }
    }
}