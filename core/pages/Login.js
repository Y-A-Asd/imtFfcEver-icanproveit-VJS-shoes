import { El } from "../utils/el";
import { router } from "../routes/router";
import { apiProxy } from "../utils/api.js"

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
        className: "login-page",
        children: [
            El({
                element: "h2",
                children: ["Login"],
            }),
            El({
                element: "input",
                type: "text",
                placeholder: "Email",
                id: "email",
            }),
            El({
                element: "input",
                type: "password",
                placeholder: "Password",
                id: "password",
            }),
            El({
                element: "button",
                children: ["Login"],
                eventListener: [
                    {
                        event: "click",
                        callback: () => {
                            const email = document.getElementById("email").value;
                            const password = document.getElementById("password").value;

                            userAuthProxy.authenticate({ email, password }).then((result) => {
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
    });
};