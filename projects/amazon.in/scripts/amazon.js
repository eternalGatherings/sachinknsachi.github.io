import {cart, addToCart} from '../data/cart.js'
import {products} from '../data/products.js';
import {formatePrice} from '../scripts/utils/priceUtils.js'

updateCartValue();

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">

            <div class="product-image-container">
                <img class="product-image" src="${product.image}" alt="">
            </div>

            <div class="product-name limit-text-to-2-lines">${product.name}</div>

            <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png" alt="">
                <span class="product-rating-count link-primary">${product.rating.count}</span>
            </div>

            <div class="product-price">$${formatePrice(product.priceCents)}</div>

            <div class="product-quantity-container">
                <select>
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div class="added-to-cart">
                <img class="added-to-cart-check" src="images/icons/checkmark.png" alt="">
                <label class="added-to-cart-text">Added</label>
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>

        </div>
    `;
});

window.document.querySelector('.product-grid').innerHTML = productsHTML;

function updateCartValue() {
    let cartQuantity = 0
        cart.forEach((item) => {
            cartQuantity += item.quantity;
        }
    );
    document.querySelector('.cart-count').textContent = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            let productId = button.dataset.productId
            addToCart(productId);
            updateCartValue();
        })
    }
);
