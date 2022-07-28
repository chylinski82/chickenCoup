class Level extends Phaser.Scene {
    constructor(key) {
      super(key);
      this.levelKey = key;
      this.nextLevel = {
        'Level1': 'Level2',
        'Level2': 'Level3',
        'Level3': 'Level4',
        'Level4': 'Level5',
        'Level5': 'Level6',
        'Level6': 'Level7',
        'Level7': 'Level8',
        'Level8': 'Level9',
        'Level9': 'Level10',
        'Level10': 'Level11',
        'Level11': 'Level12'
      }
    }

    preload() {
        this.load.image('mummy', './images/mummy.png');
        this.load.image('daddy', './images/daddy.png');
        this.load.image('sarai', './images/Sarai.png');
        this.load.image('israel', './images/Israel_orange_crop.png');
        this.load.image('sahara', './images/Sahara.png');
        this.load.image('basket', './images/basket.png');
        this.load.image('heart', './images/heart.png');
        this.load.image('hen', './images/henLeft.png');
        this.load.image('coupRight', './images/coupRight.png');
        this.load.image('ground', './images/platform.png');
        this.load.image('brokenEgg', './images/brokenEgg.png');
        this.load.spritesheet('eggLeft', './images/eggLeftSpritesheet.png', { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet('eggRight', './images/eggRightSpritesheet.png', { frameWidth: 50, frameHeight: 50 });
        
    }

    create() {
        // ramps (chicken coops)

        const graphics = this.add.graphics();

        graphics.fillGradientStyle(0xffff99, 0xb3ffff, 0x009900, 0x99ff99,.5);
        graphics.fillRect(0, 0, 800, 600);

        graphics.lineStyle(15, 0x663300);

        graphics.beginPath();

        graphics.moveTo(0, 250);
        graphics.lineTo(80, 250);
        graphics.lineTo(180, 300);

        graphics.moveTo(0, 400);
        graphics.lineTo(80, 400);
        graphics.lineTo(180, 450);

        graphics.moveTo(800, 250);
        graphics.lineTo(720, 250);
        graphics.lineTo(620, 300);

        graphics.moveTo(800, 400);
        graphics.lineTo(720, 400);
        graphics.lineTo(620, 450);

        //graphics.closePath();
        graphics.strokePath();

        // physics

        gameState.grounds = this.physics.add.staticGroup();

        gameState.eggs = this.physics.add.group();

        gameState.baskets = this.physics.add.group();

        this.physics.add.collider(gameState.eggs, gameState.grounds, (egg) => { 
            egg.destroy();

            let x = egg.x;
            this.add.image(x, 560, 'brokenEgg').setScale(0.05);

            gameState.lives--;
          
            if (gameState.lives === 2) {
                gameState.heart3.destroy();
                this.cameras.main.shake(400, .01);
    
            }
            else if (gameState.lives === 1) {
                gameState.heart2.destroy();
                this.cameras.main.shake(400, .01);
    
            } else {
                gameState.heart1.destroy();
                this.cameras.main.shake(800, .025);
                /*this.cameras.main.fade(2000, 255, 0 , 0, false, function(camera, progress) {
                    if (progress > .8) {
                        
                    }
                });*/

                this.physics.pause();
                gameState.music.pause();

                this.add.text(180, 250, 'Game Over', { fontSize: '15px', fill: '#000000' });
                this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });

                this.input.on('pointerup', () =>{
                    gameState.score = 0;
                    gameState.levelScore = 0;
                    gameState.lives = 3;
                    gameState.level = 1;
                    this.scene.stop('Level');
                    this.scene.start('FirstScene');
                }); 
            }          
        });
    
        this.physics.add.overlap(gameState.eggs, gameState.baskets, function (egg) {
            egg.destroy();
    
            gameState.score++;

            gameState.levelScore++;
    
            gameState.scoreText.setText(`Score: ${gameState.score}`);
        })

        // adding first images to the scene

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
            frameRate: this.frameSpeed,
            repeat: -1
        });

        this.anims.create({
            key: 'rollingRight',
            frames: this.anims.generateFrameNumbers('eggRight', { start: 0, end: 4 }),
            frameRate: this.frameSpeed,
            repeat: -1
        });

        // adding keys and areas on the screen for clicking

        gameState.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        gameState.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        gameState.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        gameState.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        //const line1 = this.add.line(this.add.line(0, 0, 200, 260, 350, 300, 0xff0000, 1));

        let rectangle1 = this.add.rectangle(130, 260, 360, 120, 0xFFF070).setAlpha(.35).setInteractive();
        rectangle1.on('pointerdown', basketUpLeft);

        let rectangle2 = this.add.rectangle(670, 260, 360, 120, 0xff4000).setAlpha(.35).setInteractive();
        rectangle2.on('pointerdown', basketUpRight);

        let rectangle3 = this.add.rectangle(130, 410, 360, 120, 0x990099).setAlpha(.25).setInteractive();
        rectangle3.on('pointerdown', basketDownLeft);

        let rectangle4 = this.add.rectangle(670, 410, 360, 120, 0xFF6699).setAlpha(.35).setInteractive();
        rectangle4.on('pointerdown', basketDownRight);

        gameState.hen1 = this.add.image(47, 213, 'hen').setScale(0.05).setInteractive();
        gameState.hen1.on('pointerdown', basketUpLeft);

        gameState.hen2 = this.add.image(47, 363, 'hen').setScale(0.05).setInteractive();
        gameState.hen2.on('pointerdown', basketDownLeft);

        gameState.hen3 = this.add.image(753, 213, 'hen').setScale(0.05).setInteractive();
        gameState.hen3.on('pointerdown', basketUpRight);
        gameState.hen3.flipX = true;

        gameState.hen4 = this.add.image(753, 363, 'hen').setScale(0.05).setInteractive(); 
        gameState.hen4.on('pointerdown', basketDownRight);
        gameState.hen4.flipX = true;

        // calling egg generator

        const eggGenLoop = this.time.addEvent({
            delay: this.delay,

            callback: eggGen,

            callbackScope: this,

            loop: true,
        });

    }

    update() {
        if (!document.hasFocus()) {
            gameState.music.pause();
            
        }
        if (gameState.keyQ.isDown) {
            basketUpLeft();
    
        } else if (gameState.keyP.isDown) {
            basketUpRight();
    
        } else if (gameState.keyA.isDown) {
            basketDownLeft();
    
        } else if (gameState.keyL.isDown) {
            basketDownRight();
        }      
        
        gameState.eggs.getChildren().forEach(egg => {
            if (egg.x > 195 && egg.x < 605) {
                egg.setVelocity(0, this.velocityY * 3);
            }
            if (egg.y > 350 && (egg.x > 195 && egg.x < 605)) {

                // repeated code from eggs and grounds collider, so the eggs from upper platforms can crash
                egg.destroy();

                let x = egg.x;
                this.add.image(x, 560, 'brokenEgg').setScale(0.05);
    
                gameState.lives--;
              
                if (gameState.lives === 2) {
                    gameState.heart3.destroy();
                    this.cameras.main.shake(400, .01);
        
                }
                else if (gameState.lives === 1) {
                    gameState.heart2.destroy();
                    this.cameras.main.shake(400, .01);
        
                } else {
                    gameState.heart1.destroy();
                    this.cameras.main.shake(800, .025);
                    /*this.cameras.main.fade(2000, 255, 0 , 0, false, function(camera, progress) {
                        if (progress > .8) {
                            
                        }
                    });*/
    
                    this.physics.pause();
                    gameState.music.pause();
    
                    this.add.text(180, 250, 'Game Over', { fontSize: '15px', fill: '#000000' });
                    this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });
    
                    this.input.on('pointerup', () =>{
                        gameState.score = 0;
                        gameState.levelScore = 0;
                        gameState.lives = 3;
                        gameState.level = 1;
                        this.scene.stop('Level');
                        this.scene.start('FirstScene');
                    });     
                }   
            }
        })

        // next level

        if (gameState.levelScore % 30 === 0 && gameState.levelScore !== 0 && gameState.score < 331) {
            gameState.levelScore = 0;
            gameState.level++;
            this.scene.start(this.nextLevel[this.levelKey]);

        }
    }
}

class Level1 extends Level {
    constructor() {
        super('Level1')
        this.delay = 1500;
        this.velocityX = 100;
        this.velocityY = 50;
        this.frameSpeed = 5;
    }
}

class Level2 extends Level {
    constructor() {
        super('Level2')
        this.delay = 1200;
        this.velocityX = 100;
        this.velocityY = 50;
        this.frameSpeed = 7;
    }
}

class Level3 extends Level {
    constructor() {
        super('Level3')
        this.delay = 900;
        this.velocityX = 100;
        this.velocityY = 50;
        this.frameSpeed = 7;
    }
}

class Level4 extends Level {
    constructor() {
        super('Level4')
        this.delay = 750;
        this.velocityX = 100;
        this.velocityY = 50;
        this.frameSpeed = 7;
    }
}

class Level5 extends Level {
    constructor() {
        super('Level5')
        this.delay = 600;
        this.velocityX = 100;
        this.velocityY = 50;
        this.frameSpeed = 7;
    }
}

class Level6 extends Level {
    constructor() {
        super('Level6')
        this.delay = 750;
        this.velocityX = 120;
        this.velocityY = 60;
        this.frameSpeed = 10;
    }
}

class Level7 extends Level {
    constructor() {
        super('Level7')
        this.delay = 600;
        this.velocityX = 120;
        this.velocityY = 60;
        this.frameSpeed = 10;
    }
}

class Level8 extends Level {
    constructor() {
        super('Level8')
        this.delay = 600;
        this.velocityX = 130;
        this.velocityY = 65;
        this.frameSpeed = 12;
    }
}

class Level9 extends Level {
    constructor() {
        super('Level9')
        this.delay = 500;
        this.velocityX = 130;
        this.velocityY = 65;
        this.frameSpeed = 12;
    }
}

class Level10 extends Level {
    constructor() {
        super('Level10')
        this.delay = 400;
        this.velocityX = 130;
        this.velocityY = 65;
        this.frameSpeed = 12;
    }
}

class Level11 extends Level {
    constructor() {
        super('Level11')
        this.delay = 350;
        this.velocityX = 130;
        this.velocityY = 65;
        this.frameSpeed = 13;
    }
}

class Level12 extends Level {
    constructor() {
        super('Level12')
        this.delay = 320;
        this.velocityX = 130;
        this.velocityY = 65;
        this.frameSpeed = 14;
    }
}