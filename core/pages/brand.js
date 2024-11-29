import { El } from "../utils/el";
import { router } from "../routes/router";

export const brandPage = (brand, brandProducts) => {
  // const brandProducts = products.filter((product) => product.brand === brand);

  return El({
    element: "div",
    className: "bg-green-100 min-h-screen p-6",
    children: [
      El({
        element: "h2",
        children: [`Products by ${brand}`],
        className: "text-3xl font-bold text-green-700 text-center mb-6",
      }),

      El({
        element: "div",
        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6",
        children: brandProducts.map((product) =>
          El({
            element: "div",
            className: "bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-200",
            children: [
              El({
                element: "img",
                src: product.images,
                alt: product.title,
                className: "w-full h-48 object-cover",
              }),
              El({
                element: "h3",
                children: [product.title],
                className: "font-semibold text-xl text-green-600 p-4",
              }),
              El({
                element: "p",
                children: [`$${product.price}`],
                className: "text-gray-500 text-sm px-4 pb-4",
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
        className: "bg-green-600 text-white p-4 flex justify-around items-center mt-8 rounded-tl-lg rounded-tr-lg",
        children: [
          El({
            element: "button",
            className: "text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200",
            children: ["home"],
            eventListener: [
              { event: "click", callback: () => router.navigate("/home") },
            ],
          }),
          El({
            element: "button",
            className: "text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200",
            children: ["wishlist"],
            eventListener: [
              { event: "click", callback: () => router.navigate("/wishlist") },
            ],
          }),
          El({
            element: "button",
            className: "text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200",
            children: ["cart"],
            eventListener: [
              { event: "click", callback: () => router.navigate("/cart") },
            ],
          }),
        ],
      }),
    ],
  });
};