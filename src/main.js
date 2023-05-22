// Nathan Altice
// Created: 5/16/20
// Updated: 5/21/23
// Particle Emitters & Effects
// Phaser 3 particle effects demos

// de-bong the JavaShrek ogre
'use strict'

// define game object
let config = {
    parent: 'phaser-game',
    type: Phaser.WEBGL, // using WEBGL to do some special FX
    width: 800,
    height: 600,
    // Note: physics are only used for emitter movement
    // Phaser particles use their own dedicated physics system
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    scene: [ Animated, Basic, MovingEmitter, GravityFlow, GravityWells, ArcadeCollide, ]
}

const game = new Phaser.Game(config)

// some globals
const centerX = game.config.width / 2
const centerY = game.config.height / 2
const w = game.config.width
const h = game.config.height

let cursors = null