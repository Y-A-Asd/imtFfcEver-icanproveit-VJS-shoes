import { El } from "../utils/el";
import { router } from "../routes/router";

export const onboardingPage2 = () => {
  return El({
    element: "div",
    className: "onboarding-page flex flex-col items-center justify-center h-screen bg-gray-200",
    children: [
      El({
        element: "h2",
        className: "text-2xl font-semibold",
        children: ["Browse by Category"],
      }),
      El({
        element: "p",
        children: ["dfss dgf dsg dfsgdfg sdfgdfg "],
      }),
      El({
        element: "button",
        children: ["mext"],
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate("/onboarding3"),
          },
        ],
      }),
    ],
  });
};
