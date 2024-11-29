import {apiProxy} from "./api.js";

export const addresses = new Proxy([], {
    get: (target, prop) => {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User is not logged in.");

        const updateAddressesOnServer = (addressesData) => {
            return apiProxy.users(userId).patch({addresses: addressesData});
        };

        if (prop === "add") {
            return async (address) => {
                target.push(address);
                await updateAddressesOnServer(target);
            };
        }
        if (prop === "remove") {
            return async (addressIndex) => {
                target.splice(addressIndex, 1);
                await updateAddressesOnServer(target);
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
            if (userData.addresses) {
                userData.addresses.forEach((address) => addresses.push(address));
            }
            initialized = true;
        })
        .catch((error) => console.error("Error fetching user addresses:", error));

    return () => (initialized ? Promise.resolve() : initPromise);
})();//IIFE Immediately Invoked Function Expression ;)
