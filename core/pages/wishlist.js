import { El } from "../utils/el";
import { wishlist,initializeWishlist } from "../utils/wishlist";

export const wishlistPage = () => {
    const wishlistItems = wishlist.getAll;
    console.log(wishlistItems.length)
    return El({
        element: "div",
        children: [
            El({ element: "h2", children: ["Wishlist"] }),
            El({
                element: "div",
                children: wishlistItems.map((item) =>
                    El({
                        element: "div",
                        id: `wishlist-item-${item.id}`,
                        children: [
                            El({ element: "img", src: item.images }),
                            El({ element: "p", children: [item.title] }),
                            El({
                                element: "button",
                                children: ["Remove"],
                                eventListener: [
                                    {
                                        event: "click",
                                        callback:  () => {
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
                ),
            }),
        ],
    });
};
