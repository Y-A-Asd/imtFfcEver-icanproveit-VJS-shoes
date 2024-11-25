import './style.css'

import {router} from "./core/routes/router.js";

const isLoggedIn = localStorage.getItem("userLoggedIn");
if (isLoggedIn) {
    router.navigate("/home");
} else {
    router.navigate("/login");
}

router.resolve();