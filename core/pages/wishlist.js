import { El } from "../utils/el";
import { wishlist } from "../utils/wishlist";
import {router} from "../routes/router.js";

export const wishlistPage = () => {
    const wishlistItems = wishlist.getAll;

    return El({
        element: "div",
        children: [
            El({element: "h2", children: ["wishlist"]}),
            El({
                element: "div",
                children: wishlistItems.map((item) =>
                    El({
                        element: "div",
                        children: [
                            El({element: "img", src: item.images}),
                            El({element: "p", children: [item.title]}),
                            El({
                                element: "button",
                                children: ["remove"],
                                eventListener: [
                                    {
                                        event: "click",
                                        callback: () => {
                                            wishlist.remove(item);
                                            alert(`${item.title} removed`);
                                            router.navigate('/wishlist')
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
