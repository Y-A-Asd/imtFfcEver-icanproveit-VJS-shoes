import { El } from "../utils/el";
import { router } from "../routes/router";

export const welcomePage = () => {
  return El({
    element: "div",
    className: "relative h-screen w-screen bg-cover bg-center text-white",
    style: "background-image: url('./core/covers/WallpaperDog-20534610 1.png');",
    children: [
      El({
        element: "div",
        className: "absolute inset-0 bg-black opacity-50",
      }),
      El({
        element: "div",
        className: "relative flex flex-col items-center justify-center h-full",
        children: [
          El({
            element: "h2",
            children: ["Welcome to the Adventure!"],
            className: "text-2xl font-bold text-center mb-4 tracking-wide",
          }),
          El({
            element: "p",
            children: ["Discover amazing features that make your journey exciting and memorable."],
            className: "text-md text-center mb-8 max-w-md",
          }),
          El({
            element: "button",
            children: ["Next"],
            className:
              "px-2 py-1 bg-green-600 rounded-lg text-white font-medium text-sm hover:bg-green-700 transition",
            eventListener: [
              {
                event: "click",
                callback: () => router.navigate("/onboarding1"),
              },
            ],
          }),
        ],
      }),
    ],
  });
};
