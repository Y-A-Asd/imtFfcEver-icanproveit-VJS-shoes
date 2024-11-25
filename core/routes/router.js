import Navigo from "navigo";

import {loadingPage} from "../pages/Loading";
import {welcomePage} from "../pages/Welcome";
import {onboardingPage1} from "../pages/Onboarding1";
import {onboardingPage2} from "../pages/Onboarding2";
import {onboardingPage3} from "../pages/Onboarding3";
import {loginPage} from "../pages/Login";


function changePage(page) {
    const root = document.querySelector('#all');
    root.innerHTML = ""; // Clear existing content
    root.appendChild(page());
}

export const router = new Navigo("/");
// Add new routes
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
        changePage(loadingPage); // Loading page for a few seconds
    })
    .on("/welcome", () => {
        console.log("Welcome route hit");
        changePage(welcomePage); // Show the welcome page
    })
    .on("/onboarding1", () => {
        changePage(onboardingPage1); // Show onboarding page 1
    })
    .on("/onboarding2", () => {
        changePage(onboardingPage2); // Show onboarding page 2
    })
    .on("/onboarding3", () => {
        changePage(onboardingPage3); // Show onboarding page 3
    })
    .on("/login", () => {
        changePage(loginPage);  // Add the login page route
    })
    .on("/home", () => {
        if (localStorage.getItem("userLoggedIn") === "true") {
            changePage(HomePage);  // Navigate to Home if logged in
        } else {
            router.navigate("/login");  // Redirect to login if not logged in
        }
    });
;
