import { El } from "../utils/el";
import { cart } from "../utils/cart";
import { wishlist } from "../utils/wishlist";
import { router } from "../routes/router";

export const productDetailsPage = (product) => {
    let selectedSize = null;
    let selectedColor = null;

    return El({
        element: "div",
        children: [
            El({ element: "img", src: product.images, alt: product.title }),
            El({ element: "h1", children: [product.title] }),
            El({ element: "p", children: [product.price || "null"] }),
            El({
                element: "div",
                children: [
                    El({ element: "h3", children: ["Sizes:"] }),
                    ...product.size.map((size) =>
                        El({
                            element: "button",
                            children: [size],
                            eventListener: [
                                {
                                    event: "click",
                                    callback: () => {
                                        selectedSize = size;
                                        alert(`Selected size: ${size}`);
                                    },
                                },
                            ],
                        })
                    ),
                ],
            }),
            El({
                element: "div",
                children: [
                    El({ element: "h3", children: ["Colors:"] }),
                    ...product.color.map((color) =>
                        El({
                            element: "button",
                            children: [color],
                            eventListener: [
                                {
                                    event: "click",
                                    callback: () => {
                                        selectedColor = color;
                                        alert(`Selected color: ${color}`);
                                    },
                                },
                            ],
                        })
                    ),
                ],
            }),
            El({
                element: "button",
                children: ["Add to Cart"],
                eventListener: [
                    {
                        event: "click",
                        callback: () => {
                            if (!selectedSize || !selectedColor) {
                                alert("select fucking size and color.");
                                return;
                            }

                            cart.add(product, selectedSize, selectedColor);
                            alert(
                                `${product.title} (size: ${selectedSize}, color: ${selectedColor}) added to cart ;)`
                            );
                        },
                    },
                ],
            }),
            El({
                element: "button",
                children: ["Add to Wishlist"],
                eventListener: [
                    {
                        event: "click",
                        callback: () => {
                            wishlist.add(product);
                            alert(`${product.title} added to wishlist`);
                        },
                    },
                ],
            }),
            El({
                element: "footer",
                children: [
                    El({
                        element: "button",
                        children: ["Home"],
                        eventListener: [
                            { event: "click", callback: () => router.navigate("/home") },
                        ],
                    }),
                    El({
                        element: "button",
                        children: ["Wishlist"],
                        eventListener: [
                            { event: "click", callback: () => router.navigate("/wishlist") },
                        ],
                    }),
                    El({
                        element: "button",
                        children: ["Popular"],
                        eventListener: [
                            { event: "click", callback: () => router.navigate("/popular") },
                        ],
                    }),
                ],
            }),
        ],
    });
};
