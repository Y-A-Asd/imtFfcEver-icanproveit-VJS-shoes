import {El} from "../utils/el";
import {router} from "../routes/router";

export const loadingPage = () => {
    setTimeout(() => {
      router.navigate("/welcome");
    }, 10000);

    return El({
        element: "div",
        className: "flex flex-col items-center justify-center min-h-screen bg-gray-100",
        children: [
            El({
                element: "h1",
                className: "text-5xl font-extrabold text-green-600 mb-1 animate-pulse",
                children: ["FLATLIFE"],
            }),
            El({
                element: "div",
                children: ['made with ❤️ by Yousof.A.Asd '],
                className: "mb-4 text-gray-400 text-sm font-semibold tracking-wide",
            }),
            El({
                element: "div",
                className: "w-12 h-12 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin",
            }),
            El({
                element: "p",
                className: "mt-4 text-gray-600 text-sm",
                children: ["Loading... please wait"],
            }),
        ],
    });
};