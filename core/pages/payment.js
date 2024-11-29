import { El } from "../utils/el";
import { router } from "../routes/router";
import { cart } from "../utils/cart";
import { orders } from "../utils/orders.js";

export const paymentPage = () => {
    let selectedPaymentMethod = null;

    const selectedAddress = JSON.parse(localStorage.getItem("selectedAddress"));

    if (!selectedAddress) {
        alert("No address found. Please go back to the checkout page and select an address.");
        router.navigate("/checkout");
        return;
    }

    const createOrder = async () => {
        if (!selectedPaymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        const userCart = cart.getAll;
        if (userCart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const order = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: [...userCart],
            address: selectedAddress,
            paymentMethod: selectedPaymentMethod,
            status: "pending",
        };

        await orders.add(order);

        userCart.forEach(async (item) => await cart.remove(item));

        alert("Order created successfully!");
        router.navigate("/orders");
    };

    return El({
        element: "div",
        className: "min-h-screen bg-green-50 py-6 px-4 sm:px-6 lg:px-8",
        children: [
            El({
                element: "h1",
                children: ["Payment Methods"],
                className: "text-3xl font-semibold text-green-700 mb-8 text-center",
            }),

            El({
                element: "div",
                className: "space-y-4 flex flex-col items-center",
                children: [
                    El({
                        element: "button",
                        children: ["Zarinpal"],
                        className:
                            "w-full py-2 px-6 bg-yellow-600 text-sm  text-white font-semibold rounded-lg hover:bg-yellow-700 transition duration-300",
                        eventListener: [
                            {
                                event: "click",
                                callback: () => {
                                    selectedPaymentMethod = "Zarinpal";
                                    alert("Selected: Zarinpal");
                                },
                            },
                        ],
                    }),
                    El({
                        element: "button",
                        children: ["PayPal"],
                        className:
                            "w-full py-2 px-6 bg-blue-600  text-sm text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300",
                        eventListener: [
                            {
                                event: "click",
                                callback: () => {
                                    selectedPaymentMethod = "PayPal";
                                    alert("Selected: PayPal");
                                },
                            },
                        ],
                    }),
                    El({
                        element: "button",
                        children: ["Cash on Delivery"],
                        className:
                            "w-full py-2 px-6 text-sm bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300",
                        eventListener: [
                            {
                                event: "click",
                                callback: () => {
                                    selectedPaymentMethod = "Cash on Delivery";
                                    alert("Selected: Cash on Delivery");
                                },
                            },
                        ],
                    }),
                ],
            }),

            El({
                element: "div",
                className: "mt-6 flex justify-center",
                children: [
                    El({
                        element: "button",
                        children: ["Confirm Payment"],
                        className:
                            "py-2 px-8 bg-green-600 text-white text-md font-semibold rounded-lg hover:bg-green-700 transition duration-300",
                        eventListener: [
                            {
                                event: "click",
                                callback: createOrder,
                            },
                        ],
                    }),
                ],
            }),
        ],
    });
};

