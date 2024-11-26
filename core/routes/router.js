import Navigo from "navigo";

import {loadingPage} from "../pages/Loading";
import {welcomePage} from "../pages/Welcome";
import {onboardingPage1} from "../pages/Onboarding1";
import {onboardingPage2} from "../pages/Onboarding2";
import {onboardingPage3} from "../pages/Onboarding3";
import {loginPage} from "../pages/Login";
import {homePage} from "../pages/home.js";
import {brandPage} from "../pages/brand.js";
import {productDetailsPage} from "../pages/product_detail.js";

export const apiProxy = new Proxy(
    {}, // Target: An empty object
    {
        get: (target, prop) => {
            // Dynamically resolve API endpoints
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
        if (localStorage.getItem("userLoggedIn") === "true") {
            apiProxy.Products().then((products) => {
                changePage(homePage, products);
            });
        } else {
            router.navigate("/login");
        }
    })
    .on("/brand", (params) => {
        if (localStorage.getItem("userLoggedIn") === "true") {
            console.log(params.params.brand)
            const brand = params.params.brand;
            apiProxy.Products().then((products) => {
                if (products) {
                    const filteredProducts = products.filter((product) => product.brand === brand);
                    console.log(filteredProducts)
                    changePage(brandPage, brand, filteredProducts);
                }
            });
        } else {
            router.navigate("/login");
        }
    })
    .on("/product/:id", (params) => {
        if (localStorage.getItem("userLoggedIn") === "true") {
            const productId = params.data.id;
            // Use apiProxy to fetch a single product by ID
            apiProxy.Products(productId).then((product) => {
                if (product) {
                    changePage(productDetailsPage, product); // Pass the fetched product to productDetailsPage
                } else {
                    console.error("Product not found");
                    router.navigate("/home");
                }
            });
        } else {
            router.navigate("/login");
        }
    })
    .resolve();