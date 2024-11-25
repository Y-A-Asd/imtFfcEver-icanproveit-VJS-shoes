import { El } from "../utils/el";
import { router } from "../routes/router";


export const onboardingPage3 = () => {
  return El({
    element: "div",
    children: [
      El({
        element: "h2",
        children: ["hi"],
      }),
      El({
        element: "p",
        children: ["Log in to start"],
      }),
      El({
        element: "button",
        children: ["Login"],
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate("/login"),
          },
        ],
      }),
    ],
  });
};
