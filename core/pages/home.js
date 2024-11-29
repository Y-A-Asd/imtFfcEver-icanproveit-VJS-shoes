import { El } from "../utils/el";
import { router } from "../routes/router";

export const homePage = (initialProducts) => {
    const brands = [...new Set(initialProducts.map((product) => product.brand))];

    const productListContainer = El({
        element: "section",
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6",
        children: [],
    });

    function updateProductList(products) {
        productListContainer.innerHTML = "";
        if (products.length > 0) {
            products.forEach((product) => {
                const productCard = El({
                    element: "div",
                    className: "bg-white rounded-lg shadow-md overflow-hidden",
                    children: [
                        El({
                            element: "img",
                            src: product.images,
                            alt: product.title,
                            className: "w-full h-48 object-cover"
                        }),
                        El({
                            element: "h3",
                            children: [product.title],
                            className: "font-semibold text-lg p-4"
                        }),
                        El({
                            element: "p",
                            children: [`$${product.price}`],
                            className: "text-gray-500 text-sm px-4 pb-4"
                        }),
                    ],
                    eventListener: [
                        {
                            event: "click",
                            callback: () => router.navigate(`/product/${product.id}`),
                        },
                    ],
                });
                productListContainer.appendChild(productCard);
            });
        } else {
            productListContainer.appendChild(
                El({
                    element: "p",
                    children: ["محصولی یافت نشد"],
                    className: "text-center text-gray-600 p-6",
                })
            );
        }
    }

    updateProductList(initialProducts);

    function handleSearch(event) {
        const query = event.target.value.trim().toLowerCase();
        if (query.length > 0) {
            const filteredProducts = initialProducts.filter((product) =>
                product.title.toLowerCase().includes(query)
            );
            updateProductList(filteredProducts);
        } else {
            updateProductList(initialProducts);
        }
    }

    return El({
        element: "div",
        className: "home-page bg-gray-100 min-h-screen",
        children: [
            El({
                element: "header",
                className: "bg-green-600 p-4",
                children: [
                    El({
                        element: "input",
                        placeholder: "Search products...",
                        id: "search-bar",
                        className: "w-full p-3 rounded-lg border-none focus:outline-none text-gray-700",
                        eventListener: [
                            {
                                event: "input",
                                callback: handleSearch,
                            },
                        ],
                    }),
                ],
            }),

            El({
                element: "section",
                className: "bg-white p-4 flex overflow-x-auto space-x-4",
                children: brands.map((brand) =>
                    El({
                        element: "button",
                        className:
                            "bg-green-500 text-white py-1 px-3 rounded-lg text-xs hover:bg-green-600 transition duration-200",
                        children: [brand],
                        eventListener: [
                            {
                                event: "click",
                                callback: () => router.navigate(`/brand?brand=${brand}`),
                            },
                        ],
                    })
                ),
            }),

            productListContainer,

            El({
                element: "footer",
                className: "bg-green-600 text-white p-4 flex justify-around items-center",
                children: [
                    El({
                        element: "button",
                        className: "text-sm font-medium",
                        children: ["Home"],
                        eventListener: [
                            { event: "click", callback: () => router.navigate("/home") },
                        ],
                    }),
                    El({
                        element: "button",
                        className: "text-sm font-medium",
                        children: ["Wishlist"],
                        eventListener: [
                            { event: "click", callback: () => router.navigate("/wishlist") },
                        ],
                    }),
                    El({
                        element: "button",
                        className: "text-sm font-medium",
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
