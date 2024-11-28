import {apiProxy} from "./api.js";

export const orders = new Proxy([], {
    get: (target, prop) => {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User is not logged in.");

        const updateOrdersOnServer = (ordersData) => {
            return apiProxy.users(userId).patch({orders: ordersData});
        };

        if (prop === "add") {
            return async (orders) => {
                target.push(orders);
                await updateOrdersOnServer(target);
            };
        }
        if (prop === "getAll") {
            return target; // Return all addresses
        }
        return target[prop];
    },
});

export const initializeOrders = (() => {
    let initialized = false;
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User is not logged in.");

    const initPromise = apiProxy.users(userId).get()
        .then((userData) => {
            if (userData.orders) {
                userData.orders.forEach((order) => orders.push(order));
            }
            initialized = true;
        })
        .catch((error) => console.error("Error fetching user addresses:", error));

    return () => (initialized ? Promise.resolve() : initPromise);
})();//IIFE Immediately Invoked Function Expression ;)
