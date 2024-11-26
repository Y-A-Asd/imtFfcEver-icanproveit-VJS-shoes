
export const cart = new Proxy([], {
    get: (target, prop) => {
        if (prop === 'add') {
            return (product) => {
                target.push({ ...product, quantity: 1 });
                saveCartToServer(target);
            };
        }
        if (prop === 'remove') {
            return (product) => {
                const index = target.findIndex(item => item.id === product.id);
                if (index !== -1) {
                    target.splice(index, 1);
                    saveCartToServer(target);
                }
            };
        }
        if (prop === 'updateQuantity') {
            return (product, quantity) => {
                const index = target.findIndex(item => item.id === product.id);
                if (index !== -1) {
                    target[index].quantity = quantity;
                    saveCartToServer(target);
                }
            };
        }
        return target[prop];
    }
});

function saveCartToServer(cartData) {
    localStorage.setItem('cart', JSON.stringify(cartData));
}
