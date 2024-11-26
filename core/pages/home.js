import { El } from "../utils/el";
import { router } from "../routes/router";

export const homePage = (products) => {
    const brands = [...new Set(products.map((product) => product.brand))]; // Extract unique brands

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
                    }),
                ],
            }),
            El({
                element: "section",
                className: "brand-filters",
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
            El({
                element: "section",
                className: "product-list",
                children: products.map((product) =>
                    El({
                        element: "div",
                        className: "product-card",
                        children: [
                            El({
                                element: "img",
                                src: product.images,
                                alt: product.title,
                            }),
                            El({
                                element: "h3",
                                children: [product.title],
                            }),
                            El({
                                element: "p",
                                children: [`$${product.price}`],
                            }),
                        ],
                        eventListener: [
                            {
                                event: "click",
                                callback: () => router.navigate(`/product/${product.id}`),
                            },
                        ],
                    })
                ),
            }),
            El({
                element: "footer",
                className: "navigation-menu",
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
