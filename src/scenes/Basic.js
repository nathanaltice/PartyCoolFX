class Basic extends Phaser.Scene {
    constructor() {
        super('basicScene');

        // settings
        this.SPEED = 300;
        this.SPEEDMIN = 50;
        this.SPEEDMAX = 800;
    }

    preload() {
        // load assets
        this.load.path = './assets/';
        this.load.image('pixel', 'white_pixel.png');
        this.load.image('5x5', '5x5_white.png');
    }

    create() {
        // add particle emitter manager
        // .particles(texture, [, frame][, emitters])
        const particleManager = this.add.particles('5x5');
        // create an emitter
        let centerEmitter = particleManager.createEmitter();
        // give the emitter some properties
        centerEmitter.setPosition(centerX, centerY);
        centerEmitter.setSpeed(this.SPEED);

        // add mouse input listener so we can click to create new emitters
        // note that our particle manager handles *all* new emitters we want to create
        this.input.on('pointerdown', (pointer) => {
            particleManager.createEmitter().setPosition(pointer.x, pointer.y).setSpeed(Phaser.Math.Between(this.SPEEDMIN, this.SPEEDMAX)).setTint(Math.random() * 0xFFFFFF).setAlpha(Math.random());
        });

        // update instruction text (with delicious Vanilla JavaShrek)
        document.getElementById('description').innerHTML = '<strong>Basic.js:</strong> Click anywhere to add new emitter(s) -> \'S\': Next Scene, \'R\': Restart Scene';

        // enable scene switcher / reload keys
        this.swap = this.input.keyboard.addKey('S');
        this.reload = this.input.keyboard.addKey('R');
    }

    update() {
        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("emitterconfigScene");
        }
    }
}