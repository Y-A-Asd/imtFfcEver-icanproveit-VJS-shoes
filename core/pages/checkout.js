import {El} from "../utils/el";
import {cart} from "../utils/cart";
import {addresses} from "../utils/address.js";
import {router} from "../routes/router";

export const checkoutPage = () => {
    const cartItems = cart.getAll;

    const shippingMethods = [
        {id: "standard", name: "Standard Shipping", cost: 10, description: "Delivery in 5-7 business days."},
        {id: "express", name: "Express Shipping", cost: 20, description: "Delivery in 2-3 business days."},
        {id: "overnight", name: "Overnight Shipping", cost: 50, description: "Delivery by the next day."},
    ];

    const summary = cartItems.reduce((total, item) => {
        total.totalCost += item.price * item.quantity;
        total.totalItems += item.quantity;
        return total;
    }, {totalCost: 0, totalItems: 0});

    let selectedShippingMethod = shippingMethods[0];
    let shippingCost = selectedShippingMethod.cost;

    let selectedAddressIndex = addresses.getAll.length > 0 ? 0 : null;

    const saveSelectedAddress = () => {
        const selectedAddress = addresses.getAll[selectedAddressIndex];
        localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    };

    const updateTotalCost = () => {
        const totalCost = summary.totalCost + shippingCost;
        document.getElementById("total-cost").innerText = `Total: ${totalCost} USD`;
    };

    const updateAddressDisplay = () => {
        const addressDisplay = document.getElementById("selected-address");
        if (selectedAddressIndex !== null) {
            const selectedAddress = addresses.getAll[selectedAddressIndex];
            addressDisplay.innerText = `${selectedAddress}`;
        } else {
            addressDisplay.innerText = "No address selected.";
        }
    };

    return El({
        element: "div",
        className: "min-h-screen bg-green-50 py-6 px-4 sm:px-6 lg:px-8",
        children: [
            El({
                element: "h1",
                children: ["Checkout"],
                className: "text-3xl font-semibold text-green-700 mb-6 text-center",
            }),

            El({
                element: "section",
                className: "bg-white p-6 rounded-lg shadow-lg mb-6",
                children: [
                    El({
                        element: "h3",
                        children: ["Shipping Address"],
                        className: "text-xl font-semibold text-green-700 mb-4",
                    }),
                    El({
                        element: "div",
                        children: [
                            El({
                                element: "p",
                                id: "selected-address",
                                children: [
                                    selectedAddressIndex !== null
                                        ? `${addresses.getAll[selectedAddressIndex]}`
                                        : "No address selected.",
                                ],
                                className: "text-gray-700 mb-4",
                            }),
                            El({
                                element: "button",
                                children: ["Edit Address"],
                                className:
                                    "text-sm text-green-600 hover:text-green-800 mb-2 font-medium transition duration-300 block",
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: () => {
                                            const addressListContainer = document.getElementById("address-list");
                                            addressListContainer.style.display =
                                                addressListContainer.style.display === "none" ? "block" : "none";
                                        },
                                    },
                                ],
                            }),
                            El({
                                element: "button",
                                children: ["Add Address"],
                                className:
                                    "text-sm text-green-600 hover:text-green-800 mb-2 font-medium transition duration-300",
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: () => {
                                            router.navigate("/address");
                                        },
                                    },
                                ],
                            }),
                            El({
                                element: "div",
                                id: "address-list",
                                style: "display: none;",
                                children: addresses.getAll.map((address, index) =>
                                    El({
                                        element: "div",
                                        children: [
                                            El({
                                                element: "p",
                                                children: [`${address}`],
                                                className: "text-gray-700 mb-2",
                                            }),
                                            El({
                                                element: "button",
                                                children: ["Select"],
                                                className:
                                                    "text-sm text-green-600 hover:text-green-800 transition duration-300",
                                                eventListener: [
                                                    {
                                                        event: "click",
                                                        callback: () => {
                                                            selectedAddressIndex = index;
                                                            updateAddressDisplay();
                                                            saveSelectedAddress();
                                                            document.getElementById("address-list").style.display =
                                                                "none";
                                                        },
                                                    },
                                                ],
                                            }),
                                        ],
                                    })
                                ),
                            }),
                        ],
                    }),
                ],
            }),

            El({
                element: "section",
                className: "bg-white p-6 rounded-lg shadow-lg mb-6",
                children: [
                    El({
                        element: "h3",
                        children: ["Items in Cart"],
                        className: "text-xl font-semibold text-green-700 mb-4",
                    }),
                    El({
                        element: "ul",
                        className: "space-y-4",
                        children: cartItems.map((item) =>
                            El({
                                element: "li",
                                className: "text-gray-700",
                                children: [
                                    El({
                                        element: "p",
                                        children: [
                                            `${item.title} - ${item.size} - ${item.color} - ${item.quantity} x ${item.price} = ${item.quantity * item.price} USD`,
                                        ],
                                    }),
                                ],
                            })
                        ),
                    }),
                ],
            }),

            El({
                element: "section",
                className: "bg-white p-6 rounded-lg shadow-lg mb-6",
                children: [
                    El({
                        element: "h3",
                        children: ["Shipping Methods"],
                        className: "text-xl font-semibold text-green-700 mb-4",
                    }),
                    El({
                        element: "div",
                        children: shippingMethods.map((method) =>
                            El({
                                element: "label",
                                className: "block text-gray-700 mb-3",
                                children: [
                                    El({
                                        element: "input",
                                        type: "radio",
                                        name: "shipping",
                                        value: method.id,
                                        checked: method.id === selectedShippingMethod.id,
                                        className: "mr-2",
                                        eventListener: [
                                            {
                                                event: "change",
                                                callback: () => {
                                                    selectedShippingMethod = method;
                                                    shippingCost = method.cost;
                                                    updateTotalCost();
                                                },
                                            },
                                        ],
                                    }),
                                    `${method.name} (${method.cost} USD) - ${method.description}`,
                                ],
                            })
                        ),
                    }),
                ],
            }),

            El({
                element: "section",
                className: "bg-white p-6 rounded-lg shadow-lg mb-6",
                children: [
                    El({
                        element: "h3",
                        children: ["Order Summary"],
                        className: "text-xl font-semibold text-green-700 mb-4",
                    }),
                    El({
                        element: "div",
                        children: [
                            El({
                                element: "p",
                                id: "total-cost",
                                children: [`Total: ${summary.totalCost + shippingCost} USD`],
                                className: "text-lg font-semibold text-gray-700 mb-4",
                            }),
                            El({
                                element: "button",
                                children: ["Proceed to Payment"],
                                className:
                                    "w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300",
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: () => {
                                            if (selectedAddressIndex === null) {
                                                alert("Please select an address before proceeding.");
                                                return;
                                            }
                                            router.navigate("/payment");
                                        },
                                    },
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
};

