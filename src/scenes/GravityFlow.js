class GravityFlow extends Phaser.Scene {
    constructor() {
        super('gravityflowScene');

        // settings
        this.SPEED = 300;
        this.SPEEDMIN = 50;
        this.SPEEDMAX = 800;
    }

    preload() {
        // load assets
        this.load.path = './assets/';
        this.load.image('cross', 'white_cross.png');
    }

    create() {
        // create a 💀 PARTICLE DEATH ZONE 💀
        this.deathZone = new Phaser.Geom.Circle(0, 0, 50);
        // init graphics to draw DEATH ZONE
        this.gfx = this.add.graphics();

        // set up particle emitter
        this.particleManager = this.add.particles('cross');
        this.gravityEmitter = this.particleManager.createEmitter({
            x: centerX,
            y: centerY,
            angle: { min: 180, max: 360 }, // try steps: 1000
            speed: { min: 10, max: 500, steps: 5000 },
            gravityY: 350,
            lifespan: 4000,
            quantity: 6,
            scale: { start: 0.1, end: 2 },
            tint: [ 0xffff00, 0xff0000, 0x00ff00, 0x00ffff, 0x0000ff ],
            deathZone: { type: 'onEnter', source: this.deathZone }
        });

        // add mouse input listener for movable death zone
        this.input.on('pointermove', (pointer) => {
            this.deathZone.x = pointer.x;
            this.deathZone.y = pointer.y;
        });

        // update instruction text (with delicious Vanilla JavaShrek)
        document.getElementById('description').innerHTML = '<strong>EmitterConfig.js:</strong> Move mouse to control 💀 PARTICLE DEATH ZONE 💀 // \'S\': Next Scene, \'R\': Restart Scene';

        // keyboard input
        cursors = this.input.keyboard.createCursorKeys();

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');
    }

    update() {
        // draw DEATH ZONE
        this.gfx.clear();
        this.gfx.lineStyle(1, 0xFACADE, 1);
        this.gfx.strokeCircleShape(this.deathZone);

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            //this.scene.start("tiledPlatformScene");
        }
    }
}