import {apiProxy} from "./api.js";

export const wishlist = new Proxy([], {
    get: (target, prop) => {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User is not logged in.");

        const updateWishlistOnServer = (wishlistData) => {
            return apiProxy.users(userId).patch({wishlist: wishlistData});
        };

        if (prop === "add") {
            return async (product) => {
                if (!target.some((item) => item.id === product.id)) {
                    target.push(product);
                    await updateWishlistOnServer(target);
                }
            };
        }
        if (prop === "remove") {
            return async (product) => {
                const index = target.findIndex((item) => item.id === product.id);
                if (index !== -1) {
                    target.splice(index, 1);
                    await updateWishlistOnServer(target);
                }
            };
        }
        if (prop === "getAll") {
            console.log(target)
            return target;
        }
        return target[prop];
    },
});

export const initializeWishlist = (() => {
    let initialized = false;
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User is not logged in.");

    const initPromise = apiProxy.users(userId).get()
        .then((userData) => {
            userData.wishlist.forEach((item) => wishlist.push(item));
            initialized = true;
        })
        .catch((error) => console.error("Error fetching user wishlist:", error));

    return () => (initialized ? Promise.resolve() : initPromise);
})();//IIFE Immediately Invoked Function Expression ;)
//NICE :-)

