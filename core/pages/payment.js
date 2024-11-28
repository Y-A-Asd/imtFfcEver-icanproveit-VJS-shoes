import { El } from "../utils/el";
import { router } from "../routes/router";
import { cart } from "../utils/cart";
import { orders } from "../utils/orders.js";

export const paymentPage = () => {
    let selectedPaymentMethod = null;

    // Retrieve the selected address from localStorage
    const selectedAddress = JSON.parse(localStorage.getItem("selectedAddress"));

    if (!selectedAddress) {
        alert("No address found. Please go back to the checkout page and select an address.");
        router.navigate("/checkout");
        return;
    }

    const createOrder = async () => {
        if (!selectedPaymentMethod) {
            alert("select payment");
            return;
        }

        const userCart = cart.getAll;
        if (userCart.length === 0) {
            alert("cart empty");
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
        children: [
            El({ element: "h1", children: ["Payment Methods"] }),
            El({
                element: "div",
                children: [
                    El({
                        element: "button",
                        children: ["Zarinpal"],
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
                element: "button",
                children: ["Confirm Payment"],
                eventListener: [
                    {
                        event: "click",
                        callback: createOrder,
                    },
                ],
            }),
        ],
    });
};
