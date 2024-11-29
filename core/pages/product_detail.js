import { El } from "../utils/el";
import { cart } from "../utils/cart";
import { wishlist } from "../utils/wishlist";
import { router } from "../routes/router";

export const productDetailsPage = (product) => {
    let selectedSize = null;
    let selectedColor = null;

    return El({
        element: "div",
        className: "bg-green-50 p-6 min-h-screen flex flex-col items-center",
        children: [
            El({
                element: "img",
                src: product.images,
                alt: product.title,
                className: "w-full max-w-lg object-cover rounded-lg shadow-md mb-6",
            }),

            El({
                element: "h1",
                children: [product.title],
                className: "text-3xl font-semibold text-gray-800 mb-4 text-center",
            }),

            El({
                element: "p",
                children: [product.price || "$0"],
                className: "text-xl font-medium text-green-600 mb-6",
            }),

            El({
                element: "div",
                className: "mb-6",
                children: [
                    El({ element: "h3", children: ["Select Size"], className: "text-lg font-semibold text-gray-800 mb-2" }),
                    El({
                        element: "div",
                        className: "flex gap-4 flex-wrap",
                        children: product.size.map((size) =>
                            El({
                                element: "button",
                                children: [size],
                                className: "px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition duration-300",
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
                    }),
                ],
            }),

            El({
                element: "div",
                className: "mb-6",
                children: [
                    El({ element: "h3", children: ["Select Color"], className: "text-lg font-semibold text-gray-800 mb-2" }),
                    El({
                        element: "div",
                        className: "flex gap-4 flex-wrap",
                        children: product.color.map((color) =>
                            El({
                                element: "button",
                                children: [color],
                                className: `px-4 py-2 border rounded-md ${color === "black" ? "bg-gray-800 text-white" : "bg-white border-gray-400 text-gray-800"} hover:border-green-600 hover:bg-green-600 hover:text-white transition duration-300`,
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
                    }),
                ],
            }),

            El({
                element: "button",
                children: ["Add to Cart"],
                className: "w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300 mb-4",
                eventListener: [
                    {
                        event: "click",
                        callback: () => {
                            if (!selectedSize || !selectedColor) {
                                alert("Please select a size and color.");
                                return;
                            }

                            cart.add(product, selectedSize, selectedColor);
                            alert(`${product.title} (Size: ${selectedSize}, Color: ${selectedColor}) added to cart`);
                        },
                    },
                ],
            }),

            El({
                element: "button",
                children: ["Add to Wishlist"],
                className: "w-full py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition duration-300 mb-6",
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
                className: "w-full flex justify-around mt-4",
                children: [
                    El({
                        element: "button",
                        children: ["Home"],
                        className: "text-green-600 hover:text-green-700 font-medium",
                        eventListener: [
                            { event: "click", callback: () => router.navigate("/home") },
                        ],
                    }),
                    El({
                        element: "button",
                        children: ["Wishlist"],
                        className: "text-green-600 hover:text-green-700 font-medium",
                        eventListener: [
                            { event: "click", callback: () => router.navigate("/wishlist") },
                        ],
                    }),
                    El({
                        element: "button",
                        children: ["cartt"],
                        className: "text-green-600 hover:text-green-700 font-medium",
                        eventListener: [
                            { event: "click", callback: () => router.navigate("/cart") },
                        ],
                    }),
                ],
            }),
        ],
    });
};

