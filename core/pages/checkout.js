
import { El } from "../utils/el";
import { cart } from "../utils/cart";
import { router } from "../routes/router";

export const checkoutPage = async () => {
    const userId = localStorage.getItem("userId");

    const userResponse = await fetch(`http://localhost:5000/users/${userId}`);
    const userData = await userResponse.json();

    const { addresses = [] } = userData; //const addresses = userData.addresses || [];
    //NICE SYN

    const cartItems = cart.getAll();

    const summary = cartItems.reduce((total, item) => {
        total.totalCost += item.price * item.quantity;
        total.totalItems += item.quantity;
        return total;
    }, { totalCost: 0, totalItems: 0 });

    return El({
        element: "div",
        children: [
            El({
                element: "h1",
                children: ["order"],
            }),
            El({
                element: "div",
                children: [
                    El({
                        element: "h3",
                        children: ["addres"],
                    }),
                    El({
                        element: "div",
                        children: [
                            El({
                                element: "p",
                                children: [addresses.length > 0 ? addresses[0].address : "No address available"],
                            }),
                            El({
                                element: "button",
                                children: ["edit add"],
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: () => router.navigate("/checkout/addresses")
                                    },
                                ],
                            }),
                        ],
                    }),
                    El({
                        element: "h3",
                        children: ["cart"],
                    }),
                    El({
                        element: "ul",
                        children: cartItems.map(item => El({
                            element: "li",
                            children: [
                                El({element: "p", children: [`${item.title} - ${item.size} - ${item.color} - ${item.quantity} x ${item.price} = ${item.quantity * item.price}`]}),
                            ],
                        })),
                    }),
                    El({
                        element: "h3",
                        children: ["Shipping"],
                    }),
                    El({
                        element: "select",
                        children: [
                            El({element: "option", children: ["Standard Shipping"]}),
                            El({element: "option", children: ["Express Shipping"]}),
                        ],
                    }),
                    El({
                        element: "h3",
                        children: ["code"],
                    }),
                    El({
                        element: "input",
                        type: "text",
                        placeholder: "code",
                    }),
                    El({
                        element: "div",
                        children: [
                            El({
                                element: "p",
                                children: [`Subtotal: ${summary.totalCost} USD`],
                            }),
                            El({
                                element: "button",
                                children: ["payment"],
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: () => router.navigate("/checkout/payment")
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
