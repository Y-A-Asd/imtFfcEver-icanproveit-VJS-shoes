export const wishlist = new Proxy([], {
    get: (target, prop) => {
        if (prop === 'add') {

            return (product) => {
                //every(), some()
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
        if (prop === 'getAll') {
            return target;
        }
        return target[prop];
    }
});

function saveWishlistToServer(wishlistData) {
    localStorage.setItem('wishlist', JSON.stringify(wishlistData));
}


function initializeWishlist() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        parsedWishlist.forEach(item => wishlist.push(item));
    }
}

initializeWishlist();