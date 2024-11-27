import { El } from "../utils/el";
import { cart } from "../utils/cart";
import {router} from "../routes/router.js";

export const cartPage = () => {
    const cartItems = cart.getAll;

    const updateQuantityInDOM = (item, newQuantity) => {
        const itemElement = document.querySelector(`#cart-item-${item.id}`);
        const quantityElement = itemElement.querySelector("#quantity");
        quantityElement.textContent = newQuantity;
    };

    return El({
        element: "div",
        children: [
            El({ element: "h2", children: ["Cart"] }),
            El({
                element: "div",
                children: cartItems.map((item) =>
                    El({
                        element: "div",
                        id: `cart-item-${item.id}`,
                        children: [
                            El({ element: "img", src: item.images }),
                            El({ element: "p", children: [item.title] }),
                            El({ element: "p", id: "quantity", children: [item.quantity] }),
                            El({
                                element: "button",
                                children: ["Remove"],
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: async () => {
                                            cart.remove(item);
                                            alert(`${item.title} removed from cart!`);
                                            const itemElement = document.querySelector(`#cart-item-${item.id}`);
                                            itemElement.remove();
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
                                        callback:  () => {
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
                                eventListener: [
                                    {
                                        event: "click",
                                        callback:  () => {
                                            const newQuantity = item.quantity + 1;
                                            cart.updateQuantity(item, newQuantity);
                                            updateQuantityInDOM(item, newQuantity);
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
                            alert("Proceeding to checkout...");
                            router.navigate("/checkout");
                        },
                    },
                ],
            }),
        ],
    });
};
