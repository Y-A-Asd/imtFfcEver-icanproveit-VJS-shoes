import { El } from "../utils/el";
import { router } from "../routes/router";

export const loadingPage = () => {
  setTimeout(() => {
    router.navigate("/onboarding1"); // Navigate to onboarding page after 3 seconds
  }, 3000); // Show for 3 seconds

  return El({
    element: "div",
    children: [
      El({
        element: "p",
        children: ["Loading... please wait"],
      }),
    ],
  });
};