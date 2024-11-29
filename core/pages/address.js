import {El} from "../utils/el";
import {router} from "../routes/router";
import {apiProxy} from "../utils/api.js";
import {addresses} from "../utils/address.js";
import {initializeAddresses} from "../utils/address.js";

export const addressPage = () => {
    const userId = localStorage.getItem("userId");

    const updateAddressList = () => {
        console.log('updated');
        const addressListContainer = document.querySelector("#address-list");

        addressListContainer.innerHTML = "";

        const updatedAddressList = addresses.getAll.map((address, index) =>
            El({
                element: "li",
                className: "bg-white p-4 rounded-lg shadow-lg mb-4 flex justify-between items-center",
                children: [
                    El({element: "p", children: [`${address}`], className: "text-gray-800"}),
                    El({
                        element: "div",
                        className: "space-x-4",
                        children: [
                            El({
                                element: "button",
                                children: ["Edit"],
                                className: "text-blue-600 hover:text-blue-800",
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: async () => {
                                            const newAddress = prompt("Edit address:", address);
                                            if (newAddress) {
                                                await editAddress(index, newAddress);
                                            }
                                        },
                                    },
                                ],
                            }),
                            El({
                                element: "button",
                                children: ["Delete"],
                                className: "text-red-600 hover:text-red-800",
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: async () => {
                                            if (confirm("Are you sure you want to delete this address?")) {
                                                await deleteAddress(index);
                                            }
                                        },
                                    },
                                ],
                            }),
                        ],
                    }),
                ],
            })
        );

        if (updatedAddressList.length > 0) {
            updatedAddressList.forEach((item) => addressListContainer.appendChild(item));
        } else {
            addressListContainer.appendChild(
                El({element: "p", children: ["No addresses found."]})
            );
        }
    };

    const addAddress = async (newAddress) => {
        const currentAddresses = addresses.getAll;
        addresses.add(newAddress);
        updateAddressList();
    };

    const deleteAddress = async (addressIndex) => {
        const currentAddresses = addresses.getAll;
        addresses.remove(addressIndex);
        updateAddressList();
    };

    const editAddress = async (addressIndex, newAddress) => {
        const currentAddresses = addresses.getAll;
        addresses.remove(addressIndex);
        addresses.add(newAddress);
        updateAddressList();
    };

    const addAddressForm = El({
        element: "form",
        className: "bg-white p-6 rounded-lg shadow-lg mb-6",
        children: [
            El({
                element: "label",
                children: ["New Address:"],
                className: "block text-gray-800 font-medium mb-2",
            }),
            El({
                element: "input",
                type: "text",
                id: "new-address",
                placeholder: "Enter city & street",
                className: "w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500",
            }),
            El({
                element: "button",
                children: ["Add Address"],
                className: "w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300",
                eventListener: [
                    {
                        event: "click",
                        callback: async (e) => {
                            e.preventDefault();
                            const newAddress = document.querySelector("#new-address").value;
                            if (newAddress) {
                                await addAddress(newAddress);
                            } else {
                                alert("Please enter an address.");
                            }
                        }
                    }
                ],
            }),
            El({
                element: "button",
                children: ["Back to Checkout"],
                className: "w-full py-3 mt-4 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition duration-300",
                eventListener: [
                    {
                        event: "click",
                        callback: (e) => {
                            e.preventDefault();
                            router.navigate("/checkout");
                        }
                    }
                ],
            }),
        ],
    });

    const addressListContainer = El({
        element: "ul",
        id: "address-list",
        className: "space-y-4",
        children: [],
    });

    let page = El({
        element: "div",
        className: "bg-green-50 min-h-screen p-6",
        children: [
            El({
                element: "h1",
                children: ["Your Addresses"],
                className: "text-2xl font-bold text-green-700 text-center mb-6",
            }),
            addressListContainer,
            addAddressForm,
        ],
    });

    setTimeout(() => updateAddressList(), 0);

    return page;
};
