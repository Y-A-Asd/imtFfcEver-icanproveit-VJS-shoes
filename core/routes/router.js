import Navigo from "navigo";

import { loadingPage } from "../pages/Loading";
import { welcomePage } from "../pages/Welcome";
import { onboardingPage1 } from "../pages/Onboarding1";
import { onboardingPage2 } from "../pages/Onboarding2";
import { onboardingPage3 } from "../pages/Onboarding3";
import { loginPage } from "../pages/Login";
import { homePage } from "../pages/home.js";
import { brandPage } from "../pages/brand.js";
import { productDetailsPage } from "../pages/product_detail.js";
import { cartPage } from "../pages/cart.js";
import { wishlistPage } from "../pages/wishlist";
import {initializeWishlist} from "../utils/wishlist.js";
import {initializeCart} from "../utils/cart.js";

export const apiProxy = new Proxy(
    {},
    {
        get: (target, prop) => {
            return (params = "") => {
                const url = `http://localhost:5000/${prop}/${params}`;
                return fetch(url)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`Failed to fetch from ${url}`);
                        }
                        return response.json();
                    })
                    .catch((error) => {
                        console.error(`Error fetching ${url}:`, error);
                        return null;
                    });
            };
        },
    }
);

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
            router.navigate("/welcome");
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
            apiProxy.Products().then((products) => {
                changePage(homePage, products);
            });
        });
    })
    .on("/brand", (params) => {
        checkLoginAndNavigate("/brand", () => {
            console.log(params.params.brand);
            const brand = params.params.brand;
            apiProxy.Products().then((products) => {
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
            apiProxy.Products(productId).then((product) => {
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
    .on("/wishlist", async() => {
        await checkLoginAndNavigate("/wishlist", async () => {
            await initializeWishlist();
            changePage(wishlistPage);
        });
    })
    .resolve();
