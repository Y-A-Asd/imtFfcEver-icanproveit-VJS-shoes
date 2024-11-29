import Navigo from "navigo";

import {loadingPage} from "../pages/Loading";
import {welcomePage} from "../pages/Welcome";
import {loginPage} from "../pages/Login";
import {homePage} from "../pages/home.js";
import {brandPage} from "../pages/brand.js";
import {productDetailsPage} from "../pages/product_detail.js";
import {cartPage} from "../pages/cart.js";
import {wishlistPage} from "../pages/wishlist";
import {initializeWishlist} from "../utils/wishlist.js";
import {initializeCart} from "../utils/cart.js";
import {checkoutPage} from "../pages/checkout.js";
import {addressPage} from "../pages/address.js";
import {paymentPage} from "../pages/payment.js";
import {apiProxy} from "../utils/api.js";
import {initializeAddresses} from "../utils/address.js";
import {initializeOrders} from "../utils/orders.js";
import {ordersPage} from "../pages/orders.js";
import {onboardingPage1, onboardingPage2, onboardingPage3} from "../pages/Onboarding1.js";

function changePage(page, ...data) {
    const root = document.querySelector("#all");
    root.innerHTML = "";
    root.appendChild(page(...data));
}

function checkLoginAndNavigate(route, callback) {
    if (localStorage.getItem("userLoggedIn") === "true") {
        callback();
    } else {
        router.navigate("/login");
    }
}

export const router = new Navigo("/");

router
    .on("/", () => {
        if (localStorage.getItem("hasVisited") === null) {
            localStorage.setItem("hasVisited", "true");
            router.navigate("/loading");
        } else {
            router.navigate("/login");
        }
    })
    .on("/loading", () => {
        changePage(loadingPage);
    })
    .on("/welcome", () => {
        console.log("Welcome route hit");
        changePage(welcomePage);
    })
    .on("/onboarding1", () => {
        changePage(onboardingPage1);
    })
    .on("/onboarding2", () => {
        changePage(onboardingPage2);
    })
    .on("/onboarding3", () => {
        changePage(onboardingPage3);
    })
    .on("/login", () => {
        if (localStorage.getItem("userLoggedIn") === "true") {
            router.navigate("/home");
        } else {
            changePage(loginPage);
        }
    })
    .on("/home", () => {
        checkLoginAndNavigate("/home", () => {
            apiProxy.Products().get().then((products) => {
                changePage(homePage, products);
            });
        });
    })
    .on("/brand", (params) => {
        checkLoginAndNavigate("/brand", () => {
            console.log(params.params.brand);
            const brand = params.params.brand;
            apiProxy.Products().get().then((products) => {
                if (products) {
                    const filteredProducts = products.filter((product) => product.brand === brand);
                    console.log(filteredProducts);
                    changePage(brandPage, brand, filteredProducts);
                }
            });
        });
    })
    .on("/product/:id", (params) => {
        checkLoginAndNavigate("/product/:id", () => {
            const productId = params.data.id;
            apiProxy.Products(productId).get().then((product) => {
                if (product) {
                    changePage(productDetailsPage, product);
                } else {
                    console.error("Product not found");
                    router.navigate("/home");
                }
            });
        });
    })
    .on("/cart", async () => {
        await checkLoginAndNavigate("/cart", async () => {
            await initializeCart()
            changePage(cartPage);
        });
    })
    .on("/checkout", async () => {
        await checkLoginAndNavigate("/checkout", async () => {
            await initializeCart()
            await initializeAddresses()
            changePage(checkoutPage);
        });
    })

    .on("/address", async () => {
        await checkLoginAndNavigate("/address", async () => {
            await initializeCart()
            await initializeAddresses()
            changePage(addressPage);
        });
    })
    .on("/wishlist", async () => {
        await checkLoginAndNavigate("/wishlist", async () => {
            await initializeWishlist();
            changePage(wishlistPage);
        });
    })
    .on("/payment", async () => {
        await checkLoginAndNavigate("/payment", async () => {
            await initializeCart()
            await initializeAddresses()
            await initializeOrders()
            changePage(paymentPage);
        });
    })
    .on("/orders", async () => {
        await checkLoginAndNavigate("/orders", async () => {
            await initializeOrders()
            changePage(ordersPage);
        });
    })
    .resolve();
