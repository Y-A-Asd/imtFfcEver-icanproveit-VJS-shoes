import {apiProxy} from "./api.js";

export const addresses = new Proxy([], {
    get: (target, prop) => {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User is not logged in.");

        const updateAddressesOnServer = (userId, addressesData) => {
            return apiProxy.users(userId).patch({addresses: addressesData});
        };

        if (prop === "add") {
            return async (address) => {
                target.push(address); // Add new address
                await updateAddressesOnServer(target); // Update server
            };
        }
        if (prop === "remove") {
            return async (addressIndex) => {
                target.splice(addressIndex, 1); // Remove address by index
                await updateAddressesOnServer(target); // Update server
            };
        }
        if (prop === "getAll") {
            return target; // Return all addresses
        }
        return target[prop];
    },
});

export const initializeAddresses = (() => {
    let initialized = false;
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("User is not logged in.");

    const initPromise = apiProxy.users(userId).get()
        .then((userData) => {
            if (userData.addresses) {
                userData.addresses.forEach((address) => addresses.push(address)); // Populate proxy
            }
            initialized = true;
        })
        .catch((error) => console.error("Error fetching user addresses:", error));

    return () => (initialized ? Promise.resolve() : initPromise);
})();
