import { El } from "../utils/el";
import { router } from "../routes/router";
import { apiProxy } from "../utils/api.js";

const userAuthProxy = new Proxy({}, {
    get(target, prop) {
        if (prop === "authenticate") {
            return ({ email, password }) => {
                return apiProxy.users().get()
                    .then((users) => {
                        const user = users.find(
                            (u) => u.email === email && u.password === password
                        );

                        if (user) {
                            localStorage.setItem("userLoggedIn", "true");
                            localStorage.setItem("userId", user.id);
                            return { success: true, user };
                        } else {
                            return { success: false };
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching users:", error);
                        return { success: false, error };
                    });
            };
        }
    },
});
export const loginPage = () => {
    return El({
        element: "div",

        children: [
            El({
                element: "div",
                className:
                    "bg-white w-full h-screen max-w-md shadow-lg p-6 space-y-8 flex flex-col justify-center",
                children: [
                    El({
                        element: "div",
                        className:
                            "text-6xl font-extrabold text-green-600 text-center my-3",
                        children: ["F"],
                    }),

                    El({
                        element: "h2",
                        children: ["Welcome Back!"],
                        className:
                            "text-xl font-semibold text-gray-800 text-center mb-1",
                    }),
                    El({
                        element: "p",
                        children: [
                            "Login to your account to continue enjoying our services.",
                        ],
                        className: "text-xs text-gray-500 text-center mb-6",
                    }),

                    El({
                        element: "div",
                        className: "space-y-3",
                        children: [
                            El({
                                element: "input",
                                type: "text",
                                placeholder: "Email",
                                id: "email",
                                className:
                                    "w-full p-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 text-xs",
                                eventListener: [
                                    {
                                        event: "input",
                                        callback: updateButtonState,
                                    },
                                ],
                            }),

                            El({
                                element: "input",
                                type: "password",
                                placeholder: "Password",
                                id: "password",
                                className:
                                    "w-full p-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-300 text-xs",
                                eventListener: [
                                    {
                                        event: "input",
                                        callback: updateButtonState,
                                    },
                                ],
                            }),
                        ],
                    }),

                    El({
                        element: "button",
                        children: ["Login"],
                        id: "loginButton",
                        className:
                            "w-full py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300",
                        disabled: true,
                        eventListener: [
                            {
                                event: "click",
                                callback: () => {
                                    const email =
                                        document.getElementById("email").value;
                                    const password =
                                        document.getElementById("password")
                                            .value;

                                    userAuthProxy
                                        .authenticate({ email, password })
                                        .then((result) => {
                                            if (result.success) {
                                                router.navigate("/home");
                                            } else {
                                                alert("Invalid credentials!");
                                            }
                                        });
                                },
                            },
                        ],
                    }),
                ],
            }),
        ],
    });
};

function updateButtonState() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginButton = document.getElementById("loginButton");

    if (email && password) {
        loginButton.disabled = false;
        loginButton.classList.remove("bg-gray-400", "cursor-not-allowed");
        loginButton.classList.add("bg-green-600", "hover:bg-green-700");
    } else {
        loginButton.disabled = true;
        loginButton.classList.remove("bg-green-600", "hover:bg-green-700");
        loginButton.classList.add("bg-gray-400", "cursor-not-allowed");
    }
}
