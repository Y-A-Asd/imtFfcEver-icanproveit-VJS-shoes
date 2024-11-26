import { El } from "../utils/el";
import { cart } from "../utils/cart";

export const cartPage = () => {
    const cartItems = cart;
    console.log(cart)

    return El({
        element: "div",
        children: [
            El({element: "h2", children: ["cart"]}),
            El({
                element: "div",
                children: cartItems.map((item) =>
                    El({
                        element: "div",
                        children: [
                            El({element: "img", src: item.image}),
                            El({element: "p", children: [item.title]}),
                            El({
                                element: "button",
                                children: ["Remove"],
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: () => {
                                            cart.remove(item);
                                            alert(`${item.title} removed from cart!`);
                                        },
                                    },
                                ],
                            }),
                            El({
                                element: "button",
                                children: ["-"],
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: () => {
                                            const quantity = Math.max(1, item.quantity - 1);
                                            cart.updateQuantity(item, quantity);
                                        },
                                    },
                                ],
                            }),
                            El({
                                element: "button",
                                children: ["+"],
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: () => {
                                            const quantity = item.quantity + 1;
                                            cart.updateQuantity(item, quantity);
                                        },
                                    },
                                ],
                            }),
                        ],
                    })
                ),
            }),
            El({
                element: "button",
                children: ["Checkout"],
                eventListener: [
                    {
                        event: "click",
                        callback: () => {
                            alert("checkout");
                        },
                    },
                ],
            }),
        ],
    });
};
