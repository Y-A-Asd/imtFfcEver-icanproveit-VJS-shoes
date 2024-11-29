import { El } from "../utils/el";
import { wishlist,initializeWishlist } from "../utils/wishlist";

export const wishlistPage = () => {
    const wishlistItems = wishlist.getAll;

    return El({
        element: "div",
        className: "min-h-screen bg-green-50 py-6 px-4 sm:px-6 lg:px-8",
        children: [
            El({
                element: "h2",
                children: ["Wishlist"],
                className: "text-3xl font-semibold text-green-700 mb-6 text-center",
            }),

            El({
                element: "div",
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6",
                children: wishlistItems.length > 0
                    ? wishlistItems.map((item) =>
                          El({
                              element: "div",
                              id: `wishlist-item-${item.id}`,
                              className: "bg-white p-4 rounded-lg shadow-md flex flex-col items-center",
                              children: [
                                  El({
                                      element: "img",
                                      src: item.images,
                                      className: "w-full h-48 object-cover rounded-lg mb-4",
                                  }),
                                  El({
                                      element: "p",
                                      children: [item.title],
                                      className: "text-lg font-semibold text-gray-800 mb-2",
                                  }),
                                  El({
                                      element: "button",
                                      children: ["Remove"],
                                      className:
                                          "mt-auto py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300",
                                      eventListener: [
                                          {
                                              event: "click",
                                              callback: () => {
                                                  wishlist.remove(item);
                                                  alert(`${item.title} removed from wishlist!`);
                                                  const itemElement = document.querySelector(`#wishlist-item-${item.id}`);
                                                  itemElement.remove();
                                              },
                                          },
                                      ],
                                  }),
                              ],
                          })
                      )
                    : El({
                          element: "p",
                          children: ["Your wishlist is empty."],
                          className: "text-center text-gray-600 text-xl",
                      }),
            }),
        ],
    });
};

