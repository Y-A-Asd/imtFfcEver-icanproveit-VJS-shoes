import { El } from "../utils/el";
import { router } from "../routes/router";

export const welcomePage = () => {
  return El({
    element: "div",
    children: [
      El({
        element: "h1",
        children: ["Welcome to the Shoe Shop!"],
      }),
      El({
        element: "button",
        children: ["Start Shopping"],
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate("/onboarding1"),
          },
        ],
      }),
    ],
  });
};