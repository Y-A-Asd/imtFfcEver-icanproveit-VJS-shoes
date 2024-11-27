export const wishlist = new Proxy([], {
    get: (target, prop) => {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User is not logged in.");

        const updateWishlistOnServer = (wishlistData) => {
            return fetch(`http://localhost:5000/users/${userId}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({wishlist: wishlistData}),
            }).catch((error) => console.error("Error updating wishlist on server:", error));
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
    let initialized = false; // Ensures initialization runs only once
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User is not logged in.");

    const initPromise = fetch(`http://localhost:5000/users/${userId}`)
        .then((response) => response.json())
        .then((userData) => {
            userData.wishlist.forEach((item) => wishlist.push(item));
            initialized = true;
        })
        .catch((error) => console.error("Error fetching user wishlist:", error));

    return () => (initialized ? Promise.resolve() : initPromise);
})();

