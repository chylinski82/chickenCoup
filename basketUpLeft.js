function basketUpLeft() {
    gameState.basket.destroy();       
    gameState.basket = gameState.baskets.create(220, 320, 'basket').setScale(.025);
    gameState.basket.rotation -= 0.5;
}