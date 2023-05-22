class MultiEmit extends Phaser.Scene {
    constructor() {
        super({key: 'multiemitScene'})
    }

    preload() {
        this.load.path = './assets/'
        this.load.spritesheet('items', 'items.png', {
            frameWidth: 16,
            frameHeight: 16
        })
    }

    create() {
        // adapted from Phaser 3 example: https://labs.phaser.io/view.html?src=src/game%20objects/particle%20emitter/add%20emit%20zone.js
        const shape1 = new Phaser.Geom.Circle(0, 0, 160);
        const shape2 = new Phaser.Geom.Ellipse(0, 0, 500, 150);
        const shape3 = new Phaser.Geom.Rectangle(-150, -150, 300, 300);
        const shape4 = new Phaser.Geom.Line(-150, -150, 150, 150);
        const shape5 = new Phaser.Geom.Triangle.BuildEquilateral(0, -140, 300);

        const emitter = this.add.particles(400, 300, 'items', {
            frame: {
                frames: [2, 11]
            },
            lifespan: 750,
            quantity: 1,
            scale: { start: 2, end: 0.5 }
        });

        emitter.addEmitZone({ type: 'edge', source: shape1, quantity: 64, total: 64 });
        emitter.addEmitZone({ type: 'edge', source: shape2, quantity: 64, total: 64 });
        emitter.addEmitZone({ type: 'edge', source: shape3, quantity: 64, total: 64 });
        emitter.addEmitZone({ type: 'edge', source: shape4, quantity: 64, total: 64 });
        emitter.addEmitZone({ type: 'edge', source: shape5, quantity: 64, total: 64 });

        // update instruction text
        document.getElementById('description').innerHTML = '<strong>MultiEmit.js</strong><br>S: Next Scene<br>R: Restart Scene'

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