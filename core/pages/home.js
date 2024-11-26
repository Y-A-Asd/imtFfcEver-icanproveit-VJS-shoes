import { El } from "../utils/el";
import { router } from "../routes/router";

export const homePage = (initialProducts) => {
    const brands = [...new Set(initialProducts.map((product) => product.brand))];

    const productListContainer = El({
        element: "section",
        children: [],
    });

    function updateProductList(products) {
        productListContainer.innerHTML = "";
        if (products.length > 0) {
            products.forEach((product) => {
                const productCard = El({
                    element: "div",
                    children: [
                        El({ element: "img", src: product.images, alt: product.title }),
                        El({ element: "h3", children: [product.title] }),
                        El({ element: "p", children: [`$${product.price}`] }),
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
        className: "home-page",
        children: [
            El({
                element: "header",
                children: [
                    El({
                        element: "input",
                        placeholder: "Search products...",
                        id: "search-bar",
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
                children: brands.map((brand) =>
                    El({
                        element: "button",
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
