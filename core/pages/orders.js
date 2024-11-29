import {El} from "../utils/el";
import {orders} from "../utils/orders";

export const ordersPage = () => {
    let filterStatus = "all";

    const updateOrderList = () => {
        const orderListContainer = document.getElementById("order-list");
        const filteredOrders =
            filterStatus === "all"
                ? orders.getAll
                : orders.getAll.filter((order) => order.status === filterStatus);

        orderListContainer.innerHTML = "";

        if (filteredOrders.length > 0) {
            filteredOrders.forEach((order) => {
                const orderElement = El({
                    element: "div",
                    className:
                        "bg-white shadow-md rounded-lg p-6 mb-4 border-l-4 border-green-500",
                    children: [
                        El({ element: "p", className: "text-lg font-semibold", children: [`Order ID: ${order.id}`] }),
                        El({ element: "p", children: [`Date: ${new Date(order.date).toLocaleString()}`] }),
                        El({
                            element: "p",
                            className: "text-sm text-gray-600",
                            children: [`Status: ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`],
                        }),
                        El({
                            element: "p",
                            className: "text-sm text-gray-600",
                            children: [`Payment Method: ${order.paymentMethod}`],
                        }),
                        El({
                            element: "p",
                            className: "mt-2 font-semibold",
                            children: ["Items:"],
                        }),
                        El({
                            element: "ul",
                            className: "list-disc pl-5",
                            children: order.items.map((item) =>
                                El({
                                    element: "li",
                                    className: "text-sm text-gray-700",
                                    children: [
                                        `${item.title} - ${item.size} - ${item.color} - ${item.quantity} x ${item.price} = ${
                                            item.quantity * item.price
                                        } USD`,
                                    ],
                                })
                            ),
                        }),
                        El({ element: "p", className: "mt-4 text-sm text-gray-600", children: [`Address: ${order.address}`] }),
                        El({ element: "hr", className: "my-4" }),
                    ],
                });

                orderListContainer.appendChild(orderElement);
            });
        } else {
            orderListContainer.innerHTML = `<p class="text-center text-gray-500">No orders found.</p>`;
        }
    };

    const setFilterStatus = (status) => {
        filterStatus = status;
        updateOrderList();
    };

    return El({
        element: "div",
        className: "min-h-screen bg-green-50 py-8 px-6 sm:px-8 lg:px-10",
        children: [
            El({
                element: "h1",
                className: "text-3xl font-semibold text-center text-green-700 mb-8",
                children: ["Orders"],
            }),

            El({
                element: "div",
                className: "flex justify-center space-x-4 mb-8",
                children: [
                    El({
                        element: "button",
                        className:
                            "py-2 px-6 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300",
                        children: ["All"],
                        eventListener: [
                            {
                                event: "click",
                                callback: () => setFilterStatus("all"),
                            },
                        ],
                    }),
                    El({
                        element: "button",
                        className:
                            "py-2 px-6 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300",
                        children: ["Pending"],
                        eventListener: [
                            {
                                event: "click",
                                callback: () => setFilterStatus("pending"),
                            },
                        ],
                    }),
                    El({
                        element: "button",
                        className:
                            "py-2 px-6 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-300",
                        children: ["Done"],
                        eventListener: [
                            {
                                event: "click",
                                callback: () => setFilterStatus("done"),
                            },
                        ],
                    }),
                ],
            }),

            El({
                element: "div",
                id: "order-list",
                children: [],
            }),
        ],
    });
};
