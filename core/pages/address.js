import {El} from "../utils/el";
import {router} from "../routes/router";
import {apiProxy} from "../utils/api.js";
import {addresses} from "../utils/address.js";
import {initializeAddresses} from "../utils/address.js"; // Import addresses proxy

export const addressPage = () => {
    const userId = localStorage.getItem("userId");

    const updateAddressList = () => {
        console.log('updated')
        const addressListContainer = document.querySelector("#address-list");

        addressListContainer.innerHTML = "";

        const updatedAddressList = addresses.getAll.map((address, index) =>
            El({
                element: "li",
                children: [
                    El({element: "p", children: [`${address}`]}),
                    El({
                        element: "button",
                        children: ["Edit"],
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
        const currentAddresses = addresses.getAll

        // const updatedAddresses = [...currentAddresses, newAddress];
        addresses.add(newAddress)
        // const response = await apiProxy.users(userId).patch({addresses: updatedAddresses})

        // if (response) {
        //     alert("Address added successfully!")
        //     await initializeAddresses()
        updateAddressList()
        // }
    };

    const deleteAddress = async (addressIndex) => {
        const currentAddresses = addresses.getAll;

        // const updatedAddresses = currentAddresses.filter((_, index) => index !== addressIndex);
        addresses.remove(addressIndex)
        // const response = await apiProxy.users(userId).patch({addresses: updatedAddresses});

        // if (response) {
        //     alert("Address deleted successfully!");
        //     await initializeAddresses()
        updateAddressList()
        //
        // }
    };

    const editAddress = async (addressIndex, newAddress) => {
        const currentAddresses = addresses.getAll;
        addresses.remove(addressIndex)
        addresses.add(newAddress)
        // const updatedAddresses = currentAddresses.map((address, index) =>
        //     index === addressIndex ? {...address, newAddress} : address
        // );
        //
        // const response = await apiProxy.users(userId).patch({addresses: updatedAddresses});
        //
        // if (response) {
        //     alert("Address updated successfully!");
        //     await initializeAddresses()
        updateAddressList()
        // }
    };

    const addAddressForm = El({
        element: "form",
        children: [
            El({
                element: "label",
                children: ["New Address:"]
            }),
            El({
                element: "input",
                type: "text",
                id: "new-address",
                placeholder: "City & Street",
            }),
            El({
                element: "button",
                children: ["Add Address"],
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
                children: ["back to chekcout"],
                eventListener: [
                    {
                        event: "click",
                        callback: (e) => {
                            e.preventDefault();
                            router.navigate("/checkout")
                        }
                    }
                ],
            }),
        ],
    });
    const addressListContainer = El({
        element: "ul",
        id: "address-list",
        children: [],
    });


    let page = El({
        element: "div",
        children: [
            El({element: "h1", children: ["Your Addresses"]}),
            addressListContainer,
            addAddressForm,
        ],
    });
    setTimeout(() => updateAddressList(), 0);
    return page
};