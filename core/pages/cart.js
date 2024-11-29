import {El} from "../utils/el";
import {cart} from "../utils/cart";
import {router} from "../routes/router.js";

export const cartPage = () => {
    const cartItems = cart.getAll;

    const updateQuantityInDOM = (item, newQuantity) => {
        const itemElement = document.querySelector(`#cart-item-${item.id}`);
        const quantityElement = itemElement.querySelector("#quantity");
        quantityElement.textContent = newQuantity;
    };

    const updateCheckoutButton = () => {
        const checkoutButton = document.getElementById("checkout-button");
        if (cartItems.length === 0) {
            checkoutButton.disabled = true;
            checkoutButton.style.opacity = "0.5";
        } else {
            checkoutButton.disabled = false;
            checkoutButton.style.opacity = "1";
        }
    };

    return El({
        element: "div",
        className: "bg-green-50 p-6 min-h-screen flex flex-col items-center",
        children: [
            El({
                element: "h2",
                children: ["Your Cart"],
                className: "text-3xl font-semibold text-gray-800 mb-6",
            }),

            El({
                element: "div",
                className: "w-full max-w-3xl",
                children: cartItems.length > 0
                    ? cartItems.map((item) =>
                        El({
                            element: "div",
                            id: `cart-item-${item.id}`,
                            className: "flex items-center justify-between border-b border-gray-200 py-4 mb-4",
                            children: [
                                El({
                                    element: "img",
                                    src: item.images,
                                    className: "w-20 h-20 object-cover rounded-md",
                                }),

                                El({
                                    element: "div",
                                    className: "ml-4 flex flex-col justify-between",
                                    children: [
                                        El({
                                            element: "p",
                                            children: [item.title],
                                            className: "text-lg font-semibold text-gray-700",
                                        }),
                                        El({
                                            element: "p",
                                            id: "quantity",
                                            children: [item.quantity],
                                            className: "text-sm text-gray-600 mt-2",
                                        }),
                                    ],
                                }),

                                El({
                                    element: "div",
                                    className: "flex items-center gap-2",
                                    children: [
                                        El({
                                            element: "button",
                                            children: ["-"],
                                            className:
                                                "w-4 h-4 flex items-center justify-center bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300",
                                            eventListener: [
                                                {
                                                    event: "click",
                                                    callback: () => {
                                                        const newQuantity = Math.max(1, item.quantity - 1);
                                                        cart.updateQuantity(item, newQuantity);
                                                        updateQuantityInDOM(item, newQuantity);
                                                    },
                                                },
                                            ],
                                        }),
                                        El({
                                            element: "button",
                                            children: ["+"],
                                            className:
                                                "w-4 h-4 flex items-center justify-center bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300",
                                            eventListener: [
                                                {
                                                    event: "click",
                                                    callback: () => {
                                                        const newQuantity = item.quantity + 1;
                                                        cart.updateQuantity(item, newQuantity);
                                                        updateQuantityInDOM(item, newQuantity);
                                                    },
                                                },
                                            ],
                                        }),
                                    ],
                                }),

                                El({
                                    element: "button",
                                    children: ["Remove"],
                                    className:
                                        "ml-4 text-sm text-red-600 hover:text-red-700 transition duration-300",
                                    eventListener: [
                                        {
                                            event: "click",
                                            callback: async () => {
                                                await cart.remove(item);
                                                alert(`${item.title} removed from cart!`);
                                                const itemElement = document.querySelector(
                                                    `#cart-item-${item.id}`
                                                );
                                                itemElement.remove();
                                                updateCheckoutButton();
                                            },
                                        },
                                    ],
                                }),
                            ],
                        })
                    )
                    : El({
                        element: "p",
                        children: ["Your cart is empty!"],
                        className: "text-xl font-semibold text-gray-500 text-center",
                    }),
            }),

            El({
                element: "button",
                id: "checkout-button",
                children: ["Proceed to Checkout"],
                disabled: cartItems.length === 0,
                style: cartItems.length === 0 ? "opacity: 0.5;" : "opacity: 1;",
                className:
                    "w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300 mt-6",
                eventListener: [
                    {
                        event: "click",
                        callback: () => {
                            if (cartItems.length === 0) {
                                alert("Your cart is empty! Add items before checking out.");
                                return;
                            }
                            alert("Proceeding to checkout...");
                            router.navigate("/checkout");
                        },
                    },
                ],
            }),
        ],
    });
};
