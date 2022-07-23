const gameState = {

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
    scene: [FirstScene, Level1, Level2, Level3]
}

game = new Phaser.Game(config);