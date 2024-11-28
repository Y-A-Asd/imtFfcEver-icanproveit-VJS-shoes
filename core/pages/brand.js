import { El } from "../utils/el";
import { router } from "../routes/router";

export const brandPage = (brand, brandProducts) => {
  // const brandProducts = products.filter((product) => product.brand === brand);

  return El({
    element: "div",
    children: [
      El({
        element: "h2",
        children: [`Products by ${brand}`],
      }),
      El({
        element: "div",
        children: brandProducts.map((product) =>
          El({
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
          })
        ),
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
