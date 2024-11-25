import { El } from "../utils/el";
import { router } from "../routes/router";

export const loginPage = () => {
    return El({
        element: "div",
        children: [
            El({
                element: "h2",
                children: ["Login"],
            }),
            El({
                element: "input",
                type: "text",
                placeholder: "email",
                id: "email",
            }),
            El({
                element: "input",
                type: "password",
                placeholder: "password",
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

                            fetch("http://localhost:5000/users")
                                .then((response) => {
                                    if (!response.ok) {
                                        throw new Error("Network response was not ok");
                                    }
                                    return response.json();
                                })
                                .then((users) => {
                                    const user = users.find(
                                        (u) => u.email === email && u.password === password
                                    );

                                    if (user) {
                                        localStorage.setItem("userLoggedIn", "true");
                                        localStorage.setItem("userId", user.id);
                                        router.navigate("/home");
                                    } else {
                                        alert("Invalid credentials!");
                                    }
                                })
                                .catch((error) => {
                                    console.error("Error fetching users:", error);
                                    alert("An error occurred. Please try again later.");
                                });
                        },
                    },
                ],
            }),
        ],
    });
};
