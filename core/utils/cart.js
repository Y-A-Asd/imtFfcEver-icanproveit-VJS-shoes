export const cart = new Proxy([], {
    get: (target, prop) => {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User is not logged in.");

        const updateCartOnServer = (cartData) => {
            return fetch(`http://localhost:5000/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart: cartData }),
            }).catch((error) => console.error("Error updating cart on server:", error));
        };

        if (prop === "add") {
            return async (product) => {
                const existingProduct = target.find((item) => item.id === product.id);

                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    target.push({ ...product, quantity: 1 });
                }

                await updateCartOnServer(target);
            };
        }
        if (prop === "remove") {
            return async (product) => {
                const index = target.findIndex((item) => item.id === product.id);
                if (index !== -1) {
                    target.splice(index, 1);
                    await updateCartOnServer(target);
                }
            };
        }
        if (prop === "updateQuantity") {
            return async (product, quantity) => {
                const index = target.findIndex((item) => item.id === product.id);
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
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User is not logged in.");

    const initPromise = fetch(`http://localhost:5000/users/${userId}`)
        .then((response) => response.json())
        .then((userData) => {
            userData.cart.forEach((item) => cart.push(item));
            initialized = true;
        })
        .catch((error) => console.error("Error fetching user cart:", error));

    return () => (initialized ? Promise.resolve() : initPromise);
})();