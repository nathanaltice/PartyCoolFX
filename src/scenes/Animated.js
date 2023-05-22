class Animated extends Phaser.Scene {
    constructor() {
        super({key: 'animatedScene'})
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('items', 'items.png', {
            frameWidth: 16,
            frameHeight: 16
        })
    }

    create() {
        // init graphics
        this.gfx = this.add.graphics();

        // create line for particle emitter source
        let line = new Phaser.Geom.Line(32, 32, 32, h);

        // creating spinning animation
        this.anims.create({
            key: 'spin',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('items', { start: 4, end: 7 }),
            repeat: -1,
            yoyo: true
        })

        this.add.particles(0, 0, 'items', {
            anim: 'spin',
            gravityX: 200,
            lifespan: 3000,
            scale: { start: 2, end: 2 },
            emitZone: { type: 'edge', source: line, quantity: 10, yoyo: true }
        })

        // update instruction text
        document.getElementById('description').innerHTML = '<strong>Animated.js</strong><br><em>Look upon the spinning gems and be moved</em><br>S: Next Scene<br>R: Restart Scene'

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
            this.scene.start("basicScene")
        }
    }
}