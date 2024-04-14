import { cart } from "../../data/cart.js";
import { getProductById } from "../../data/products.js";
import { getDeliveryOptionsById } from "../deliveryOptions.js";
import { formatePrice } from "../utils/priceUtils.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let deliveryPriceCents = 0;
    let totalPriceCents = 0;
    let taxPriceCents = 0;
    let orderTotalCents = 0;

    cart.forEach((cartItem) => {
        const product = getProductById(cartItem.productId);
        const deliveryOption = getDeliveryOptionsById(cartItem.deliveryOptionId);
        
        productPriceCents += product.priceCents * cartItem.quantity;
        deliveryPriceCents += deliveryOption.priceCents;

        totalPriceCents = productPriceCents + deliveryPriceCents;
        taxPriceCents = totalPriceCents * 0.1;

        orderTotalCents = totalPriceCents + taxPriceCents;

        document.querySelector('.js-payment-info').innerHTML = `
            <div class="payment-summary-title">Order Summary</div>
            <div class="payment-summary-row">
                <div>Items (${getCartTotalQuantity()}):</div>
                <div class="payment-summary-money">$${formatePrice(productPriceCents)}</div>
            </div>
            <div class="payment-summary-row">
                <div>Shipping & handling:</div>
                <div class="payment-summary-money">$${formatePrice(deliveryPriceCents)}</div>
            </div>
            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatePrice(totalPriceCents)}</div>
            </div>
            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatePrice(taxPriceCents)}</div>
            </div>
            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${formatePrice(orderTotalCents)}</div>
            </div>
        `;

    })
}

export function getCartTotalQuantity() {
    let cartQuantity = 0
    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
    return cartQuantity;
}

