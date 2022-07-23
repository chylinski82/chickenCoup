function basketUpRight() {
    gameState.basket.destroy();       
    gameState.basket = gameState.baskets.create(580, 350, 'basket').setScale(.025);
    gameState.basket.rotation += 0.5;
}
