// import { apiProxy } from './api.js';
//
// const createDataHandler = (dataType) => {
//     const dataProxy = new Proxy([], {
//         get: (target, prop) => {
//             const userId = localStorage.getItem("userId");
//             if (!userId) throw new Error("User is not logged in.");
//
//             const updateDataOnServer = (data) => {
//                 return apiProxy.users(userId).patch({ [dataType]: data });
//             };
//
//             if (prop === "add") {
//                 return async (item, additionalParams = {}) => {
//                     const existingItem = target.find(
//                         (targetItem) =>
//                             targetItem.id === item.id &&
//                             (additionalParams.size
//                                 ? targetItem.size === additionalParams.size
//                                 : true) &&
//                             (additionalParams.color
//                                 ? targetItem.color === additionalParams.color
//                                 : true)
//                     );
//
//                     if (existingItem) {
//                         if (additionalParams.quantity) {
//                             existingItem.quantity += additionalParams.quantity;
//                         }
//                     } else {
//                         target.push({ ...item, ...additionalParams });
//                     }
//
//                     await updateDataOnServer(target);
//                 };
//             }
//             if (prop === "remove") {
//                 return async (item, additionalParams = {}) => {
//                     const index = target.findIndex(
//                         (targetItem) =>
//                             targetItem.id === item.id &&
//                             (additionalParams.size
//                                 ? targetItem.size === additionalParams.size
//                                 : true) &&
//                             (additionalParams.color
//                                 ? targetItem.color === additionalParams.color
//                                 : true)
//                     );
//
//                     if (index !== -1) {
//                         target.splice(index, 1);
//                         await updateDataOnServer(target);
//                     }
//                 };
//             }
//             if (prop === "updateQuantity") {
//                 return async (item, quantity) => {
//                     const index = target.findIndex(
//                         (targetItem) =>
//                             targetItem.id === item.id &&
//                             targetItem.size === item.size &&
//                             targetItem.color === item.color
//                     );
//                     if (index !== -1) {
//                         target[index].quantity = quantity;
//                         await updateDataOnServer(target);
//                     }
//                 };
//             }
//             if (prop === "getAll") {
//                 return target;
//             }
//             return target[prop];
//         },
//     });
//
//     const initializeData = (() => {
//         let initialized = false;
//         const userId = localStorage.getItem("userId");
//         if (!userId) throw new Error("User is not logged in.");
//
//         const initPromise = apiProxy.users(userId).get()
//             .then((userData) => {
//                 if (userData[dataType]) {
//                     userData[dataType].forEach((item) => dataProxy.push(item));
//                 }
//                 initialized = true;
//             })
//             .catch((error) => console.error(`Error fetching user ${dataType}:`, error));
//
//         return () => (initialized ? Promise.resolve() : initPromise);
//     })();
//
//     return { dataProxy, initializeData };
// };
//
// export const { dataProxy: wishlist, initializeData: initializeWishlist } = createDataHandler("wishlist");
// export const { dataProxy: cart, initializeData: initializeCart } = createDataHandler("cart");
// export const { dataProxy: addresses, initializeData: initializeAddresses } = createDataHandler("addresses");
