class Level1 extends Phaser.Scene {
	constructor(){
		super({ key: 'Level1' })
	}

    preload() {
        this.load.image('bg', './images/sky.png');
        this.load.image('mummy', '/images/mummy.png');
        this.load.image('daddy', './images/daddy.png');
        this.load.image('sarai', './images/Sarai.png');
        this.load.image('israel', './images/Israel_orange_crop.png');
        this.load.image('sahara', './images/Sahara.png');
        this.load.image('basket', './images/basket.png');
        this.load.image('heart', './images/heart.png');
        this.load.image('coupLeft', './images/coupLeft.png');
        this.load.image('coupRight', './images/coupRight.png');
        this.load.image('ground', 'images/platform.png');
        this.load.image('brokenEgg', 'images/brokenEgg.png');
        this.load.spritesheet('eggLeft', 'images/eggLeftSpritesheet.png', { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet('eggRight', 'images/eggRightSpritesheet.png', { frameWidth: 50, frameHeight: 50 });
        
    }

    create() {
        // main

        gameState.score = 0;

        gameState.lives = 3;

        gameState.level = 1;

        // physics

        gameState.grounds = this.physics.add.staticGroup();

        gameState.eggs = this.physics.add.group();

        gameState.baskets = this.physics.add.group();

        this.physics.add.collider(gameState.eggs, gameState.grounds, (egg) => {

            let x = egg.x;
            egg.destroy();
    
            this.add.image(x, 560, 'brokenEgg').setScale(0.05);
          
            if (gameState.lives === 3) {
                gameState.heart3.destroy();
                gameState.lives--;
    
            }
            else if (gameState.lives === 2) {
                gameState.heart2.destroy();
                gameState.lives--;
    
            } else {
                gameState.heart1.destroy();
                gameState.lives--;
    
                this.physics.pause();
                gameState.music.pause();
    
                this.add.text(180, 250, 'Game Over', { fontSize: '15px', fill: '#000000' });
                this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });
    
                this.input.on('pointerup', () =>{
                    gameState.score = 0;
                    this.scene.stop('Level1');
                    this.scene.start('FirstScene');
                });
    
            }
        });
    
        this.physics.add.overlap(gameState.eggs, gameState.baskets, function (egg) {
            egg.destroy();
    
            gameState.score++;
    
            gameState.scoreText.setText(`Score: ${gameState.score}`);
        })

        // adding first images to the scene

        gameState.background = this.add.image(0, 0, 'bg').setOrigin(0, 0);

        gameState.ground = gameState.grounds.create(400, 568, 'ground').setScale(2);

        gameState.scoreText = this.add.text(550, 50, `Score: ${gameState.score}`, { fontSize: '30px', fill: '#000000' });

        gameState.levelText = this.add.text(50, 550, `Level: ${gameState.level}`, { fontSize: '30px', fill: '#FFFFFF' });
        
        gameState.basket = gameState.baskets.create(220, 350, 'basket').setScale(.025);
        gameState.basket.rotation -= 0.5;

        gameState.heart1 = this.add.image(100, 60, 'heart').setScale(.04);
        gameState.heart2 = this.add.image(160, 60, 'heart').setScale(.04);
        gameState.heart3 = this.add.image(220, 60, 'heart').setScale(.04);

        // displaying character

        if (gameState.characterIndex === 2) {
            gameState.character = this.add.sprite(380, 400, gameState.charactersArray[gameState.characterIndex]).setScale(.45).setInteractive();
        } else {
            gameState.character = this.add.sprite(380, 400, gameState.charactersArray[gameState.characterIndex]).setScale(.35).setInteractive(); 
        }

        // egg animations

        this.anims.create({
            key: 'rollingLeft',
            frames: this.anims.generateFrameNumbers('eggLeft', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'rollingRight',
            frames: this.anims.generateFrameNumbers('eggRight', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        // adding keys and areas on the screen for clicking

        gameState.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        gameState.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        gameState.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        gameState.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        let rectangle1 = this.add.rectangle(230, 360, 180, 60, 0xFFF070).setAlpha(.35).setInteractive();
        rectangle1.on('pointerdown', basketUpLeft);

        let rectangle2 = this.add.rectangle(570, 360, 180, 60, 0xff4000).setAlpha(.35).setInteractive();
        rectangle2.on('pointerdown', basketUpRight);

        let rectangle3 = this.add.rectangle(210, 510, 180, 60, 0x990099).setAlpha(.25).setInteractive();
        rectangle3.on('pointerdown', basketDownLeft);

        let rectangle4 = this.add.rectangle(590, 510, 180, 60, 0xFF6699).setAlpha(.35).setInteractive();
        rectangle4.on('pointerdown', basketDownRight);

        gameState.coupLeft1 = this.add.image(50, 170, 'coupLeft').setScale(0.45).setInteractive();
        gameState.coupLeft1.on('pointerdown', basketUpLeft);

        gameState.coupLeft2 = this.add.image(50, 340, 'coupLeft').setScale(0.45).setInteractive();
        gameState.coupLeft2.on('pointerdown', basketDownLeft);

        gameState.coupRight1 = this.add.image(750, 170, 'coupRight').setScale(0.45).setInteractive();
        gameState.coupRight1.on('pointerdown', basketUpRight);

        gameState.coupRight2 = this.add.image(750, 340, 'coupRight').setScale(0.45).setInteractive(); 
        gameState.coupRight2.on('pointerdown', basketDownRight);

        // calling egg generator

        const eggGenLoop = this.time.addEvent({
            delay: 1500,

            callback: eggGen,

            callbackScope: this,

            loop: true,
        });

    }

    update() {
        if (gameState.keyQ.isDown) {
            basketUpLeft();
    
        } else if (gameState.keyP.isDown) {
            basketUpRight();
    
        } else if (gameState.keyA.isDown) {
            basketDownLeft();
    
        } else if (gameState.keyL.isDown) {
            basketDownRight();
        }      

        // next level

        if (gameState.score === 20) {
            gameState.level++;
            this.scene.stop('Level1');
            this.scene.start('Level2');

        }
    }
}