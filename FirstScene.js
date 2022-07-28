class FirstScene extends Phaser.Scene {
	constructor(){
		super({ key: 'FirstScene' })
	}

    preload() {
        this.load.image('mummy', './images/mummy.png');
        this.load.image('daddy', './images/daddy.png');
        this.load.image('sarai', './images/Sarai.png');
        this.load.image('israel', './images/Israel_orange_crop.png');
        this.load.image('sahara', './images/Sahara.png');
        this.load.image('arrow-left', './images/arrow-left.png');
        this.load.image('arrow-right', './images/arrow-right.png');
        this.load.image('ground', 'images/platform.png');
        this.load.audio('theme', 'audio/theme.mp3');
        
    }

    create() {
        // background, extra layer

        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0xffff99, 0xb3ffff, 0x009900, 0x99ff99,.5);
        graphics.fillRect(0, 0, 800, 600);

        // audio
        gameState.music = this.sound.add('theme');
        gameState.music.play();
        gameState.music.loop = true; 

        // main

        gameState.characterSelected = false;

        function chosingCharacter() {
            gameState.character.on('pointerup', () => {
                startText.destroy();
                arrowLeft.destroy();
                arrowRight.destroy();
                gameState.characterSelected = true;

            });
        }

        const startText = this.add.text(260, 100, 'Choose character', { fontSize: '30px', fill: '#000000' });

        gameState.grounds = this.physics.add.staticGroup();

        gameState.ground = gameState.grounds.create(400, 568, 'ground').setScale(2);

        gameState.charactersArray = ['mummy', 'daddy', 'sarai', 'israel', 'sahara'];
        
        gameState.character = this.add.sprite(380, 400, 'mummy').setScale(.35).setInteractive();

        chosingCharacter();
        
        gameState.characterIndex = 0;

        // arrowLeft and arrowRight for selection of character
        
        const arrowLeft = this.add.image(250, 400, 'arrow-left').setScale(.2).setInteractive();

        arrowLeft.on('pointerup', () => {
            gameState.character.destroy();
            if (gameState.characterIndex > 0) {
                gameState.characterIndex--;
            } else {
                gameState.characterIndex = 4;
            }
            // changes character after clicking on either arrow

            if (gameState.characterIndex === 2) {
                // Sarai character needs a different scale

                gameState.character = this.add.sprite(380, 400, gameState.charactersArray[gameState.characterIndex]).setScale(.5).setInteractive();
            } else {
                gameState.character = this.add.sprite(380, 400, gameState.charactersArray[gameState.characterIndex]).setScale(.35).setInteractive(); 
            }

            chosingCharacter();
        });
        
        const arrowRight = this.add.image(550, 400, 'arrow-right').setScale(.2).setInteractive();

        arrowRight.on('pointerup', () => {
            gameState.character.destroy();

            if (gameState.characterIndex < 4) {
                gameState.characterIndex++;
            } else {
                gameState.characterIndex = 0;
            }

            if (gameState.characterIndex === 2) {
                gameState.character = this.add.sprite(380, 400, gameState.charactersArray[gameState.characterIndex]).setScale(.45).setInteractive();
            } else {
                gameState.character = this.add.sprite(380, 400, gameState.charactersArray[gameState.characterIndex]).setScale(.35).setInteractive(); 
            }

            chosingCharacter();

        });
    }

    update() {
        if (!document.hasFocus()) {
            gameState.music.pause();

        }
        if (document.hasFocus()) {
            gameState.music.resume();

        }
        if (gameState.characterSelected) {
            this.scene.stop('FirstScene');
            this.scene.start('Level1');
            
        }
    }
}