const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 580,
    scene: {
          preload,
          create,
          update
    },
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          //enableBody: true,
        }
    },
}

const gameState = {
    
}

function chosingCharacter () {
    character.on('pointerup', () => {
        startText.destroy();
        arrowLeft.destroy();
        arrowRight.destroy();
        scoreText.destroy();
        heart1.destroy();
        heart2.destroy();
        heart3.destroy();
        coupLeft1.destroy();
        coupLeft2.destroy();
        coupRight1.destroy();
        coupRight2.destroy();
        startEggGen = true;
    })
}

// basket control functions

function basketUpLeft() {
    basket.destroy();       
    basket = baskets.create(220, 350, 'basket').setScale(.025);
    basket.rotation -= 0.5;
}

function basketUpRight() {
    basket.destroy();       
    basket = baskets.create(580, 350, 'basket').setScale(.025);
    basket.rotation += 0.5;
}

function basketDownLeft() {
    basket.destroy();       
    basket = baskets.create(200, 500, 'basket').setScale(.025);
    basket.rotation -= 0.5;
}

function basketDownRight() {
    basket.destroy();       
    basket = baskets.create(600, 500, 'basket').setScale(.025);
    basket.rotation += 0.5;
}

//                      P R E L O A D   ////////////////////////////

function preload () {
    this.load.image('bg', './images/sky.png');
    this.load.image('mummy', './images/mummy.png');
    this.load.image('daddy', './images/daddy.png');
    this.load.image('sarai', './images/Sarai.png');
    this.load.image('israel', './images/Israel_orange_crop.png');
    this.load.image('sahara', './images/Sahara.png');
    this.load.image('arrow-left', './images/arrow-left.png');
    this.load.image('arrow-right', './images/arrow-right.png');
    this.load.image('basket', './images/basket.png');
    this.load.image('heart', './images/heart.png');
    this.load.image('coupLeft', './images/coupLeft.png');
    this.load.image('coupRight', './images/coupRight.png');
    this.load.image('ground', 'images/platform.png');
    this.load.image('brokenEgg', 'images/brokenEgg.png');
    this.load.spritesheet('eggLeft', 'images/eggLeftSpritesheet.png', { frameWidth: 50, frameHeight: 50 });
    this.load.spritesheet('eggRight', 'images/eggRightSpritesheet.png', { frameWidth: 50, frameHeight: 50 });
}

//                      C R E A T E   /////////////////////////////

function create () {
    gameState.background = this.add.image(0, 0, 'bg').setOrigin(0, 0);

    startText = this.add.text(260, 100, 'Choose character', { fontSize: '30px', fill: '#000000' });

    gameState.score = 0;

    gameState.lives = 3;

    gameState.eggDelay = 2000;
    
    charactersArray = ['mummy', 'daddy', 'sarai', 'israel', 'sahara'];
    
    character = this.add.sprite(380, 400, 'mummy').setScale(.35).setInteractive();

    chosingCharacter();

    characterIndex = 0;

    // arrowLeft and arrowRight for selection of character
    
    arrowLeft = this.add.image(250, 400, 'arrow-left').setScale(.2).setInteractive();

    arrowLeft.on('pointerup', () => {
        character.destroy();
        if (characterIndex > 0) {
            characterIndex--;
        } else {
            characterIndex = 4;
        }
        // changes character after clicking on either arrow

        if (characterIndex === 2) {
            // Sarai character needs a different scale

            character = this.add.sprite(380, 400, charactersArray[characterIndex]).setScale(.5).setInteractive();
        } else {
            character = this.add.sprite(380, 400, charactersArray[characterIndex]).setScale(.35).setInteractive(); 
        }
        chosingCharacter();
    });
    
    arrowRight = this.add.image(550, 400, 'arrow-right').setScale(.2).setInteractive();

    arrowRight.on('pointerup', () => {
        character.destroy();
        if (characterIndex < 4) {
            characterIndex++;
        } else {
            characterIndex = 0;
        }
        if (characterIndex === 2) {
            character = this.add.sprite(380, 400, charactersArray[characterIndex]).setScale(.45).setInteractive();
        } else {
            character = this.add.sprite(380, 400, charactersArray[characterIndex]).setScale(.35).setInteractive(); 
        }
        chosingCharacter();     
    });
    
    startEggGen = false;

    //  puts following elements "outside" of the screen

    basket = this.add.image(-250, -300, 'basket').setScale(.03);

    scoreText = this.add.text(-300, 100, `Score: ${gameState.score}`, { fontSize: '30px', fill: '#000000' });

    coupLeft1 = this.add.image(-50, -170, 'coupLeft').setScale(0.45);
    coupLeft2 = this.add.image(-50, -340, 'coupLeft').setScale(0.45);
    coupRight1 = this.add.image(-750, -170, 'coupRight').setScale(0.45);
    coupRight2 = this.add.image(-750, -340, 'coupRight').setScale(0.45);

    heart1 = this.add.image(-250, 100, 'heart').setScale(.04);
    heart2 = this.add.image(-250, 100, 'heart').setScale(.04);
    heart3 = this.add.image(-250, 100, 'heart').setScale(.04);

    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

    //  physics

    grounds = this.physics.add.staticGroup();

    eggs = this.physics.add.group();

    ground = grounds.create(400, 568, 'ground').setScale(2);

    baskets = this.physics.add.group();

    this.physics.add.collider(eggs, grounds, (egg) => {

        x = egg.x;
        egg.destroy();

        this.add.image(x, 560, 'brokenEgg').setScale(0.05);
      
        if (gameState.lives === 3) {
            heart3.destroy();
            gameState.lives--;

        }
        else if (gameState.lives === 2) {
            heart2.destroy();
            gameState.lives--;

        } else {
            heart1.destroy();

            this.physics.pause();

            this.add.text(180, 250, 'Game Over', { fontSize: '15px', fill: '#000000' });
            this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });

            this.input.on('pointerup', () =>{
                gameState.score = 0;
                  this.scene.restart();
            });

        }
    });

    this.physics.add.overlap(eggs, baskets, function (egg) {
        egg.destroy();

        gameState.score++;

        scoreText.setText(`Score: ${gameState.score}`);
    })

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

}

//                      U P D A T E  ///////////////////////////////////

function update () {

    if (startEggGen === true) {
        startEggGen = false;

        scoreText = this.add.text(550, 50, `Score: ${gameState.score}`, { fontSize: '30px', fill: '#000000' });

        heart1 = this.add.image(100, 60, 'heart').setScale(.04);
        heart2 = this.add.image(160, 60, 'heart').setScale(.04);
        heart3 = this.add.image(220, 60, 'heart').setScale(.04);

        coupLeft1 = this.add.image(50, 170, 'coupLeft').setScale(0.45).setInteractive();
        coupLeft1.on('pointerdown', basketUpLeft);

        coupLeft2 = this.add.image(50, 340, 'coupLeft').setScale(0.45).setInteractive();
        coupLeft2.on('pointerdown', basketDownLeft);

        coupRight1 = this.add.image(750, 170, 'coupRight').setScale(0.45).setInteractive();
        coupRight1.on('pointerdown', basketUpRight);

        coupRight2 = this.add.image(750, 340, 'coupRight').setScale(0.45).setInteractive(); 
        coupRight2.on('pointerdown', basketDownRight);

        function eggGen(time) {
            num = Math.random();
        
            if (num < .5) {
                xCoord = 150;

                eggDirection = 'eggLeft';
                eggAnimation = 'rollingLeft'

                velocityX = 25;
                
                if (num < .25) {
                    yCoord = 220;
        
                } else {
                    yCoord = 390;
                }
            } else {
                xCoord = 650;

                eggDirection = 'eggRight';
                eggAnimation = 'rollingRight'

                velocityX = -25
        
                if (num < .75) {
                    yCoord = 220;
        
                } else {
                    yCoord = 390;
                }
            }

            egg = eggs.create(xCoord, yCoord, eggDirection).setVelocity(velocityX, 50).setScale(.6);

            egg.anims.play(eggAnimation);

        }
        const eggGenLoop = this.time.addEvent({
            delay: gameState.eggDelay,
 
            callback: eggGen,
    
            callbackScope: this,
    
            loop: true,
        });
        
        // adding areas on the screen for clicking

        let rectangle1 = this.add.rectangle(230, 360, 180, 60, 0xFFF070).setAlpha(.35).setInteractive();
        rectangle1.on('pointerdown', basketUpLeft);

        let rectangle2 = this.add.rectangle(570, 360, 180, 60, 0xff4000).setAlpha(.35).setInteractive();
        rectangle2.on('pointerdown', basketUpRight);

        let rectangle3 = this.add.rectangle(210, 510, 180, 60, 0x990099).setAlpha(.25).setInteractive();
        rectangle3.on('pointerdown', basketDownLeft);

        let rectangle4 = this.add.rectangle(590, 510, 180, 60, 0xFF6699).setAlpha(.35).setInteractive();
        rectangle4.on('pointerdown', basketDownRight);

    }    
    if (keyQ.isDown) {
        basketUpLeft();

    } else if (keyP.isDown) {
        basketUpRight();

    } else if (keyA.isDown) {
        basketDownLeft();

    } else if (keyL.isDown) {
        basketDownRight();
    }
   
   
    /*const eggGenLoop = this.time.addEvent({
        delay: gameState.eggDelay - (gameState.score * 100),

        callback: eggGen,

        callbackScope: this,

        loop: true,
    });*/
}
const game = new Phaser.Game(config);
