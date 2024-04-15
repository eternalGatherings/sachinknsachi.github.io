class Cart {
    cartItem;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItem =  JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '1'
            },
            {
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity: 2,
                deliveryOptionId: '2'
            },
            {
                productId: '3fdfe8d6-9a15-4979-b459-585b0d0545b9',
                quantity: 1,
                deliveryOptionId: '1'
            }
        ];
    }

    getCartItemById(productId) {
        let matchingItem;
        this.cartItem.forEach((item) => {
            if (item.productId == productId)
                matchingItem = item;
        })
        return matchingItem;
    }

    saveCartToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
    }

    addToCart(productId) {
        let matchingItem = this.getCartItemById(productId);
    
        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.cartItem.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            });
        }
    
        this.saveCartToStorage();
    }

    removeFromCart(productId) {
        this.cartItem = this.cartItem.filter(item => item.productId !== productId);
        this.saveCartToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        this.getCartItemById(productId).deliveryOptionId = deliveryOptionId;
        this.saveCartToStorage();
    }

}

