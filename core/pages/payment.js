import { El } from "../utils/el";
import { router } from "../routes/router";

export const paymentPage = async () => {
    return El({
        element: "div",
        children: [
            El({element: "h1", children: ["oayment methods"]}),
            El({
                element: "div",
                children: [
                    El({
                        element: "button",
                        children: ["zarinpal"],
                        eventListener: [
                            { event: "click", callback: () => alert("zarinpal") },
                        ],
                    }),
                    El({
                        element: "button",
                        children: ["PayPal"],
                        eventListener: [
                            { event: "click", callback: () => alert("paypal") },
                        ],
                    }),
                    El({
                        element: "button",
                        children: ["cash"],
                        eventListener: [
                            { event: "click", callback: () => alert("تسویه توسط پیک") },
                        ],
                    }),
                ],
            }),
            El({
                element: "button",
                children: ["Confirm Payment"],
                eventListener: [
                    {
                        event: "click",
                        callback: () => {
                            alert("done :)");
                            router.navigate("/order-confirmation");
                        }
                    },
                ],
            }),
        ],
    });
};
