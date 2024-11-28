import { El } from "../utils/el";
import { cart } from "../utils/cart";
import { router } from "../routes/router.js";

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
            checkoutButton.style.opacity = "0.5"; // Optional: visually indicate it's disabled
        } else {
            checkoutButton.disabled = false;
            checkoutButton.style.opacity = "1";
        }
    };

    return El({
        element: "div",
        children: [
            El({ element: "h2", children: ["Cart"] }),
            El({
                element: "div",
                children: cartItems.length > 0
                    ? cartItems.map((item) =>
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
                                                  await cart.remove(item);
                                                  alert(`${item.title} removed from cart!`);
                                                  const itemElement = document.querySelector(
                                                      `#cart-item-${item.id}`
                                                  );
                                                  itemElement.remove();
                                                  updateCheckoutButton(); // Update button state
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
                                              callback: () => {
                                                  const newQuantity = item.quantity + 1;
                                                  cart.updateQuantity(item, newQuantity);
                                                  updateQuantityInDOM(item, newQuantity);
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
                      }),
            }),
            El({
                element: "button",
                id: "checkout-button",
                children: ["Checkout"],
                disabled: cartItems.length === 0, // Disable if no items
                style: cartItems.length === 0 ? "opacity: 0.5;" : "opacity: 1;", // Optional
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
