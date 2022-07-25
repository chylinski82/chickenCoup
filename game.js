const gameState = {
    score: 0,

    levelScore: 0,

    lives: 3,

    level: 1
}

config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          enableBody: true,
        }
    },
    scene: [FirstScene, Level1, Level2, Level3, Level4, Level5, Level6, Level7]
}

game = new Phaser.Game(config);