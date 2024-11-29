import {apiProxy} from "./api.js";

export const cart = new Proxy([], {
    get: (target, prop) => {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User is not logged in.");

        const updateCartOnServer = (cartData) => {
            return apiProxy.users(userId).patch({cart: cartData})
        };

        if (prop === "add") {
            return async (product, size, color) => {
                // Find item with same id, size, and color
                const existingProduct = target.find(
                    (item) => item.id === product.id && item.size === size && item.color === color
                );

                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    target.push({...product, size, color, quantity: 1});
                }

                await updateCartOnServer(target);
            };
        }
        if (prop === "remove") {
            return async (product) => {
                const index = target.findIndex(
                    (item) =>
                        item.id === product.id &&
                        item.size === product.size &&
                        item.color === product.color
                );
                if (index !== -1) {
                    target.splice(index, 1);
                    await updateCartOnServer(target);
                }
            };
        }
        if (prop === "updateQuantity") {
            return async (product, quantity) => {
                const index = target.findIndex(
                    (item) =>
                        item.id === product.id &&
                        item.size === product.size &&
                        item.color === product.color
                );
                if (index !== -1) {
                    target[index].quantity = quantity;
                    await updateCartOnServer(target);
                }
            };
        }
        if (prop === "getAll") {
            return target;
        }
        return target[prop];
    },
});


export const initializeCart = (() => {
    let initialized = false;
    let userId = null
    try{

        userId = localStorage.getItem("userId");
        console.log(userId)
        if (!userId){
            return () => Promise.resolve()
        }
    }catch (e) {
        console.log(e)
        return () => Promise.resolve()
    }

    const initPromise = apiProxy.users(userId).get()
        .then((userData) => {
            userData.cart.forEach((item) => cart.push(item));
            initialized = true;
        })
        .catch((error) => console.error("Error fetching user cart:", error));


    return () => (initialized ? Promise.resolve() : initPromise);
})();//IIFE Immediately Invoked Function Expression ;)
//NICE :-)