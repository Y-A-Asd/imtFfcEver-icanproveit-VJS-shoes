export const productDetailsPage = (product) => {
  return El({
    element: "div",
    children: [
      El({ element: "img", src: product.images, className: "product-img w-full", alt: product.title }),
      El({ element: "h1", children: [product.title] }),
      El({ element: "p", children: [product.description || "null"] }),
      El({
        element: "div",
        className: "sizes",
        children: [
          El({ element: "h3", children: ["sizes:"] }),
          ...product.size.map((size) => El({ element: "span", children: [size]})),
        ],
      }),
      El({
        element: "div",
        className: "colors",
        children: [
          El({ element: "h3", children: ["Colors:"] }),
          ...product.color.map((color) => El({ element: "span", children: [color]})),
        ],
      }),
      El({
        element: "button",
        children: ["Add to Cart"],
        eventListener: [
          {
            event: "click",
            callback: () => alert(`${product.title} added to cart!`),
          },
        ],
      }),
      El({
        element: "button",
        children: ["Like"],
        eventListener: [
          {
            event: "click",
            callback: () => alert(`${product.title} added to wishlist!`),
          },
        ],
      }),
    ],
  });
};
