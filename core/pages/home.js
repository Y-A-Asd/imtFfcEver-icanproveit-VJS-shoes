import { El } from "../utils/el";
import { router } from "../routes/router";

export const homePage = (products) => {
  const brands = [...new Set(products.map((product) => product.brand))];

  return El({
    element: "div",
    className: "home-page",
    children: [
      El({
        element: "div",
      }),
      El({
        element: "input",
        placeholder: "search",
      }),
      El({
        element: "div",
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
        element: "div",
        children: products.map((product) =>
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
        element: "div",
        children: [
          El({ element: "button", children: ["home"], eventListener: [{ event: "click", callback: () => router.navigate("/") }] }),
          El({ element: "button", children: ["wishlist"], eventListener: [{ event: "click", callback: () => router.navigate("/wishlist") }] }),
          El({ element: "button", children: ["populare"], eventListener: [{ event: "click", callback: () => router.navigate("/popular") }] }),
        ],
      }),
    ],
  });
};
