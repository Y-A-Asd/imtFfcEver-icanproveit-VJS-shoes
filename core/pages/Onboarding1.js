import { El } from "../utils/el";
import { router } from "../routes/router";

export const onboardingPage1 = () => {
  return El({
    element: "div",
    children: [
      El({
        element: "h2",
        children: [" kasd;lfj dslkfj dsldlafj sad;lkfjds;lfjew;oijf dslkdfds"],
      }),
      El({
        element: "p",
        children: ["sdafjhdskjlaf hdsa fhsakjldfh sadkjjf has"],
      }),
      El({
        element: "button",
        children: ["nextt"],
        eventListener: [
          {
            event: "click",
            callback: () => router.navigate("/onboarding2"),
          },
        ],
      }),
    ],
  });
};
