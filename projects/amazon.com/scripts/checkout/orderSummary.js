import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { getProductById } from '../../data/products.js';
import { formatePrice } from '../../scripts/utils/priceUtils.js'
import { deliveryOptions, getDeliveryOptionsById } from '../../scripts/deliveryOptions.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { renderPaymentSummary } from './paymentSummery.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

const today = dayjs();

export function renderOrderSummary() {
    
    let orderSummaryHtml = '';

    cart.forEach((cartItem) => {
        let productId = cartItem.productId;
        let deliveryOptionId = cartItem.deliveryOptionId;

        let matchingProduct = getProductById(productId);
        let deliveryOption = getDeliveryOptionsById(deliveryOptionId);

        orderSummaryHtml += `
            <div class="order-summary js-cart-item-container-${productId}">
                <div class="delivery-date">
                    Delivery date: ${today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D')}
                </div>
                <div class="shipping-and-order-details">
                    <div class="product-image">
                        <img src="../${matchingProduct.image}" alt="">
                    </div>
                    <div class="product-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            ${matchingProduct.getPrice()}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">Update</span>
                            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">Delete</span>
                        </div>
                    </div>
                    <div class="shipping-details">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(productId, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    function deliveryOptionsHTML(productId, cartItem) {

        let deliveryOptionsHTML = '';

        deliveryOptions.forEach((deliveryOption) => {

            let deliveryPrice = deliveryOption.priceCents == 0 ? 'FREE' : `$${formatePrice(deliveryOption.priceCents)} -`;
            let isChecked = deliveryOption.id == cartItem.deliveryOptionId ? 'checked' : '';

            deliveryOptionsHTML += 
                `<div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${deliveryOption.id}">
                    <input class="delivery-option-input" type="radio" name="${productId}-delivery-option" ${isChecked}>
                    <div>
                        <div class="delivery-option-date">${today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D')}</div>
                        <div class="delivery-option-price">${deliveryPrice} Shipping</div>
                    </div>
                </div>`;
        });

        return deliveryOptionsHTML;
    }

    document.querySelector('.js-order-summary').innerHTML = orderSummaryHtml;

    document.querySelectorAll('.js-delete-link')
        .forEach((deleteLink) => {
            deleteLink.addEventListener('click', () => {
                let productId = deleteLink.dataset.productId;
                removeFromCart(productId);
                document.querySelector(`.js-cart-item-container-${productId}`).remove();
                renderPaymentSummary();
                renderCheckoutHeader();
            })
        });

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                updateDeliveryOption(element.dataset.productId, element.dataset.deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            })
        });
}
