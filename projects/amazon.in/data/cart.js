export let cart;

loadFromStorage();

export function loadFromStorage() {
    // cart =  JSON.parse(localStorage.getItem('cart')) || [
    //     {
    //         productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    //         quantity: 1,
    //         deliveryOptionId: '1'
    //     },
    //     {
    //         productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
    //         quantity: 2,
    //         deliveryOptionId: '2'
    //     },
    //     {
    //         productId: '3fdfe8d6-9a15-4979-b459-585b0d0545b9',
    //         quantity: 1,
    //         deliveryOptionId: '1'
    //     }
    // ];

    cart =  JSON.parse(localStorage.getItem('cart')) || [];
}

export function getCartItemById(productId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (cartItem.productId == productId)
            matchingItem = cartItem;
    })
    return matchingItem;
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem = getCartItemById(productId);

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    saveCartToStorage();
}

export function removeFromCart(productId) {
    cart = cart.filter(cartItem => cartItem.productId !== productId);
    saveCartToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    getCartItemById(productId).deliveryOptionId = deliveryOptionId;
    saveCartToStorage();
}
