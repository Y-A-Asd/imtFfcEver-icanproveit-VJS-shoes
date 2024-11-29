import { El } from "../utils/el";
import { router } from "../routes/router";

export const onboardingPage = ({ step, title, description, nextPage }) => {
  return El({
    element: "div",
    className: "h-screen w-screen flex flex-col",
    children: [
      El({
        element: "div",
        className: "relative h-screen w-screen bg-cover bg-center text-white",
        style: "background-image: url('./core/covers/WallpaperDog-20534610 1.png');",
        children: [
          El({
            element: "div",
            className: "absolute inset-0 bg-black opacity-30",
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex-4 bg-white m-4 px-6 py-4 flex flex-col justify-end",
        children: [
          El({
            element: "div",
            className: "text-center",
            children: [
              El({
                element: "h2",
                children: [title],
                className: "text-xl font-bold mb-3 text-gray-800",
              }),
              El({
                element: "p",
                children: [description],
                className: "text-sm text-gray-600",
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex justify-center gap-2 mt-4",
            children: Array(3)
              .fill(null)
              .map((_, index) =>
                El({
                  element: "div",
                  className: `h-0.5 w-3 ${
                    index < step ? "bg-green-800" : "bg-gray-400"
                  } rounded-full`,
                })
              ),
          }),
          El({
            element: "button",
            children: ["Next"],
            className:
              "w-50 mt-4 bg-green-600 text-white py-1 rounded-lg text-center hover:bg-green-700 mx-5",
            eventListener: [
              {
                event: "click",
                callback: () => router.navigate(nextPage),
              },
            ],
          }),
        ],
      }),
    ],
  });
};

export const onboardingPage1 = () =>
  onboardingPage({
    step: 1,
    title: "Welcome to Our App",
    description: "Discover features to enhance your experience.",
    nextPage: "/onboarding2",
  });

export const onboardingPage2 = () =>
  onboardingPage({
    step: 2,
    title: "Stay Organized",
    description: "Keep track of your tasks and stay ahead.",
    nextPage: "/onboarding3",
  });

export const onboardingPage3 = () =>
  onboardingPage({
    step: 3,
    title: "Get Started",
    description: "Let’s dive into the app and explore its benefits.",
    nextPage: "/home",
  });