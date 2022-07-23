function basketDownLeft() {
    gameState.basket.destroy();       
    gameState.basket = gameState.baskets.create(200, 500, 'basket').setScale(.025);
    gameState.basket.rotation -= 0.5;
}