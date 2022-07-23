function eggGen() {
    let num = Math.random();

    let xCoord, yCoord, eggDirection, eggAnimation, velocityX

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
        eggAnimation = 'rollingRight';

        velocityX = -25

        if (num < .75) {
            yCoord = 220;

        } else {
            yCoord = 390;
        }
    }

    let egg = gameState.eggs.create(xCoord, yCoord, eggDirection).setVelocity(velocityX, 50).setScale(.6);

    egg.anims.play(eggAnimation);
}