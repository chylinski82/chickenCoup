function basketDownRight() {
    gameState.basket.destroy();       
    gameState.basket = gameState.baskets.create(600, 500, 'basket').setScale(.025);
    gameState.basket.rotation += 0.5;
}