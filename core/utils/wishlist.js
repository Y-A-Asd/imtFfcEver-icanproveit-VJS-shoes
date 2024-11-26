export const wishlist = new Proxy([], {
    get: (target, prop) => {
        if (prop === 'add') {
            return (product) => {
                if (!target.some(item => item.id === product.id)) {
                    target.push(product);
                    saveWishlistToServer(target);
                }
            };
        }
        if (prop === 'remove') {
            return (product) => {
                const index = target.findIndex(item => item.id === product.id);
                if (index !== -1) {
                    target.splice(index, 1);
                    saveWishlistToServer(target);
                }
            };
        }
        return target[prop];
    }
});

function saveWishlistToServer(wishlistData) {
    localStorage.setItem('wishlist', JSON.stringify(wishlistData));
}
