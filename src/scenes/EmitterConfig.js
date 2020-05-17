class EmitterConfig extends Phaser.Scene {
    constructor() {
        super('emitterconfigScene');

        // settings
        this.SPEED = 300;
        this.SPEEDMIN = 50;
        this.SPEEDMAX = 800;
        this.DUMMYSPEED = 5;
    }

    preload() {
        // load assets
        this.load.path = './assets/';
        this.load.image('cross', 'white_cross.png');
    }

    create() {
        // add particle emitter manager
        // .particles(texture, [, frame][, emitters])
        this.particleManager = this.add.particles('cross');
        // create an emitter
        this.movingEmitter = this.particleManager.createEmitter({
            x: centerX,
            y: centerY,
            speed: 50,
            scale: { start: 0.1, end: 1 },
            alpha: { start: 1, end: 0 },
            // higher steps value = more time to go btwn min/max
            lifespan: { min: 10, max: 7000, steps: 1000 }
        });

        // create dummy sprite to control emitter position
        this.dummy = this.add.sprite(centerX, centerY);

        // update instruction text (with delicious Vanilla JavaShrek)
        document.getElementById('description').innerHTML = '<strong>EmitterConfig.js:</strong> Use arrows to move emitter // \'S\': Next Scene, \'R\': Restart Scene';

        // keyboard input
        cursors = this.input.keyboard.createCursorKeys();

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');
    }

    update() {
        // control dummy sprite
        if(cursors.down.isDown) {
            this.dummy.y += this.DUMMYSPEED;
        }
        if(cursors.up.isDown) {
            this.dummy.y -= this.DUMMYSPEED;
        }
        if(cursors.right.isDown) {
            this.dummy.x += this.DUMMYSPEED;
        }
        if(cursors.left.isDown) {
            this.dummy.x -= this.DUMMYSPEED;
        }
        // update emitter position
        this.movingEmitter.setPosition(this.dummy.x, this.dummy.y);

        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            //this.scene.start("tiledPlatformScene");
        }
    }
}