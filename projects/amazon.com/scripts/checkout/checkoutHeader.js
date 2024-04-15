import { cart } from '../../data/cart.js';

export function renderCheckoutHeader() {
    let cartQuantity = 0
        cart.forEach((item) => {
            cartQuantity += item.quantity;
        }
    );
    document.querySelector('.return-to-home-link').textContent = cartQuantity + ' items';
}