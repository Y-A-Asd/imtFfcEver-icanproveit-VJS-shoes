import { El } from "../utils/el";
import { router } from "../routes/router";

export const addressPage = async () => {
    const userId = localStorage.getItem("userId");

    const userResponse = await fetch(`http://localhost:5000/users/${userId}`);
    const userData = await userResponse.json();

    const { addresses = [] } = userData; //const addresses = userData.addresses || [];
    //NICE SYN


    const addAddress = async (newAddress) => {
        const response = await fetch(`http://localhost:5000/users/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ addresses: [...addresses, newAddress] }),
        });

        if (response.ok) {
            alert("Address added successfully!");
            router.navigate("/checkout");
        }
    };

    const addAddressForm = El({
        element: "form",
        children: [
            El({
                element: "label",
                children: ["address:"]
            }),
            El({
                element: "input",
                type: "text",
                placeholder: "city & street",
            }),
            El({
                element: "button",
                children: ["add"],
                eventListener: [
                    {
                        event: "click",
                        callback: (e) => {
                            e.preventDefault();
                            const newAddress = document.querySelector("input").value;
                            addAddress(newAddress);
                        }
                    }
                ],
            }),
        ],
    });

    return El({
        element: "div",
        children: [
            El({element: "h1", children: ["Your Addresses"]}),
            El({
                element: "ul",
                children: addresses.map(address => El({
                    element: "li",
                    children: [
                        El({ element: "p", children: [address] }),
                        El({
                            element: "button",
                            children: ["Edit"],
                            eventListener: [
                                { event: "click", callback: () => alert("Editing functionality") },
                            ],
                        }),
                    ],
                })),
            }),
            addAddressForm,
        ],
    });
};
