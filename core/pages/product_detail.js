import { El } from "../utils/el";
import { cart } from "../utils/cart";
import { wishlist } from "../utils/wishlist";
import { router } from "../routes/router";

export const productDetailsPage = (product) => {
    return El({
        element: "div",
        children: [
            El({element: "img", src: product.images, alt: product.title}),
            El({element: "h1", children: [product.title]}),
            El({element: "p", children: [product.description || "null"]}),
            El({
                element: "div",
                children: [
                    El({element: "h3", children: ["sizes:"]}),
                    ...product.size.map((size) => El({element: "span", children: [size]})),
                ],
            }),
            El({
                element: "div",
                children: [
                    El({element: "h3", children: ["colors:"]}),
                    ...product.color.map((color) => El({element: "span", children: [color]})),
                ],
            }),
            El({
                element: "button",
                children: ["add to cart"],
                eventListener: [
                    {
                        event: "click",
                        callback: () => {
                            cart.add(product);
                            alert(`${product.title} added to cart!`);
                        },
                    },
                ],
            }),
            El({
                element: "button",
                children: ["Add to wishlist"],
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
                            {event: "click", callback: () => router.navigate("/home")},
                        ],
                    }),
                    El({
                        element: "button",
                        children: ["Wishlist"],
                        eventListener: [
                            {event: "click", callback: () => router.navigate("/wishlist")},
                        ],
                    }),
                    El({
                        element: "button",
                        children: ["Popular"],
                        eventListener: [
                            {event: "click", callback: () => router.navigate("/popular")},
                        ],
                    }),
                ],
            }),
        ],
    });
};