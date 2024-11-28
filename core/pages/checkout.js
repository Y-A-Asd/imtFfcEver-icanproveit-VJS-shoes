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
        children: [
            El({
                element: "h1",
                children: ["checkout"],
            }),
            El({
                element: "div",
                children: [
                    // Address Section
                    El({
                        element: "h3",
                        children: ["sddress"],
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
                            }),
                            El({
                                element: "button",
                                children: ["edit address"],
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
                                children: ["add address"],
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: () => {
                                            router.navigate("/address")
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
                                            }),
                                            El({
                                                element: "button",
                                                children: ["select"],
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
                    // Cart Items Section
                    El({
                        element: "h3",
                        children: ["items"],
                    }),
                    El({
                        element: "ul",
                        children: cartItems.map((item) =>
                            El({
                                element: "li",
                                children: [
                                    El({
                                        element: "p",
                                        children: [
                                            `${item.title} - ${item.size} - ${item.color} - ${item.quantity} x ${item.price} = ${item.quantity * item.price}`,
                                        ],
                                    }),
                                ],
                            })
                        ),
                    }),
                    // Shipping Methods Section
                    El({
                        element: "h3",
                        children: ["methods"],
                    }),
                    El({
                        element: "div",
                        children: shippingMethods.map((method) =>
                            El({
                                element: "label",
                                children: [
                                    El({
                                        element: "input",
                                        type: "radio",
                                        name: "shipping",
                                        value: method.id,
                                        checked: method.id === selectedShippingMethod.id,
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
                    // Summary Section
                    El({
                        element: "h3",
                        children: ["order "],
                    }),
                    El({
                        element: "div",
                        children: [
                            El({
                                element: "p",
                                id: "total-cost",
                                children: [`total: ${summary.totalCost + shippingCost} $ ;-)`],
                            }),
                            El({
                                element: "button",
                                children: ["payment"],
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: () => {
                                            if (selectedAddressIndex === null) {
                                                alert("select an address before");
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
