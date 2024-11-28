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
                    className: "order-item",
                    children: [
                        El({element: "p", children: [`Order ID: ${order.id}`]}),
                        El({element: "p", children: [`Date: ${new Date(order.date).toLocaleString()}`]}),
                        El({
                            element: "p",
                            children: [`Status: ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`],
                        }),
                        El({
                            element: "p",
                            children: [`Payment Method: ${order.paymentMethod}`],
                        }),
                        El({
                            element: "p",
                            children: ["Items:"],
                        }),
                        El({
                            element: "ul",
                            children: order.items.map((item) =>
                                El({
                                    element: "li",
                                    children: [
                                        `${item.title} - ${item.size} - ${item.color} - ${item.quantity} x ${item.price} = ${
                                            item.quantity * item.price
                                        } USD`,
                                    ],
                                })
                            ),
                        }),
                        El({element: "p", children: [`Address: ${order.address}`]}),
                        El({element: "hr"}),
                    ],
                });

                orderListContainer.appendChild(orderElement);
            });
        } else {
            orderListContainer.innerHTML = `<p>No orders found.</p>`;
        }
    };

    const setFilterStatus = (status) => {
        filterStatus = status;
        updateOrderList();
    };

    return El({
        element: "div",
        children: [
            El({element: "h1", children: ["Orders"]}),
            El({
                element: "div",
                className: "filter-section",
                children: [
                    El({
                        element: "button",
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
